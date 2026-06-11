#!/usr/bin/env bash
# scripts/verify-migration.sh
#
# Non-destructive verification of pb_migrations/1700000000_init.js.
#
# Strategy:
#   1. Spin up a fresh PocketBase instance in a throwaway data dir
#      (created via mktemp — never touches the user's pb_data/).
#   2. PB auto-applies pb_migrations/ on first serve, which creates the
#      9 user-defined collections.
#   3. Create a temporary superuser inside the throwaway dir, then dump
#      the live schema via the admin REST API.
#   4. Normalize both the live schema and the source-of-truth
#      pb_schema.json, then diff them.
#
# A non-empty diff is a fidelity bug.
#
# IMPORTANT: This script NEVER reads or writes the user's pb_data/.

set -euo pipefail

# --- Resolve project root and cd into it -----------------------------------
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

PB="./pocketbase"
TEST_PORT=8091
TEST_DIR=""
PB_PID=""
PB_LOG=""

TEST_ADMIN_EMAIL="verify@test.local"
TEST_ADMIN_PASSWORD="verify-test-password-CHANGE-ME"

# --- Cleanup on exit (always) -----------------------------------------------
# Set KEEP=1 to preserve TEST_DIR for post-mortem debugging.
cleanup() {
	if [ -n "$PB_PID" ] && kill -0 "$PB_PID" 2>/dev/null; then
		kill "$PB_PID" 2>/dev/null || true
		wait "$PB_PID" 2>/dev/null || true
	fi
	if [ -n "$TEST_DIR" ] && [ -d "$TEST_DIR" ] && [ "${KEEP:-0}" != "1" ]; then
		rm -rf "$TEST_DIR"
	fi
}
trap cleanup EXIT

# --- Pre-flight checks -----------------------------------------------------
if [ ! -x "$PB" ]; then
	echo "ERROR: pocketbase binary not found at $PB (run: bun run setup)" >&2
	exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
	echo "ERROR: jq is required but not installed" >&2
	exit 1
fi
if ! command -v curl >/dev/null 2>&1; then
	echo "ERROR: curl is required but not installed" >&2
	exit 1
fi
if [ ! -f "./pb_migrations/1700000000_init.js" ]; then
	echo "ERROR: pb_migrations/1700000000_init.js not found" >&2
	exit 1
fi
if [ ! -f "./pb_schema.json" ]; then
	echo "ERROR: pb_schema.json not found" >&2
	exit 1
fi

# --- Create throwaway data dir ---------------------------------------------
TEST_DIR=$(mktemp -d -t pb-verify-XXXXXX)
PB_LOG="$TEST_DIR/pb.log"
echo "==> Throwaway data dir: $TEST_DIR"

# --- Start PocketBase in the throwaway dir ---------------------------------
echo "==> Starting PocketBase on 127.0.0.1:$TEST_PORT (logs: $PB_LOG)"
"$PB" serve --http=127.0.0.1:"$TEST_PORT" --dir="$TEST_DIR" --migrationsDir=./pb_migrations \
	>"$PB_LOG" 2>&1 &
PB_PID=$!

# --- Wait for PB to be ready (up to 30s) -----------------------------------
READY=false
for _ in $(seq 1 30); do
	if curl -s "http://127.0.0.1:$TEST_PORT/api/health" >/dev/null 2>&1; then
		READY=true
		break
	fi
	sleep 1
done
if [ "$READY" != "true" ]; then
	echo "ERROR: PocketBase did not become ready within 30s" >&2
	echo "--- PB log tail ---" >&2
	tail -n 50 "$PB_LOG" >&2 || true
	exit 1
fi
echo "==> PocketBase is healthy"

# --- Sanity check: were the 9 user collections created by the migration? ---
# /api/collections requires admin auth, so we need the superuser + token first.
# (See: "Create a temporary superuser" and "Authenticate" below.)
#
# Instead of counting pre-auth, we proceed straight to superuser creation,
# then validate the post-auth count.

# --- Create a temporary superuser inside the throwaway dir -----------------
echo "==> Creating temporary superuser in throwaway dir"
if ! "$PB" superuser create "$TEST_ADMIN_EMAIL" "$TEST_ADMIN_PASSWORD" --dir="$TEST_DIR" \
	>>"$PB_LOG" 2>&1; then
	echo "ERROR: superuser create failed" >&2
	echo "--- PB log tail ---" >&2
	tail -n 80 "$PB_LOG" >&2 || true
	exit 1
fi

# --- Authenticate as the superuser ----------------------------------------
echo "==> Authenticating as superuser"
AUTH_RESP=$(curl -s -X POST "http://127.0.0.1:$TEST_PORT/api/collections/_superusers/auth-with-password" \
	-H "Content-Type: application/json" \
	-d "$(jq -nc --arg id "$TEST_ADMIN_EMAIL" --arg pw "$TEST_ADMIN_PASSWORD" \
		'{identity:$id, password:$pw}')")
TOKEN=$(echo "$AUTH_RESP" | jq -r .token 2>/dev/null || echo "")
if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
	echo "ERROR: Failed to get admin token" >&2
	echo "Auth response: $AUTH_RESP" >&2
	echo "--- PB log tail ---" >&2
	tail -n 40 "$PB_LOG" >&2 || true
	exit 1
fi
echo "==> Got admin token"

# --- Sanity check: were the 9 user collections created by the migration? ---
RAW_DUMP=$(curl -s -H "Authorization: $TOKEN" "http://127.0.0.1:$TEST_PORT/api/collections")
RAW_COUNT_BEFORE=$(echo "$RAW_DUMP" | jq '[.items[]? // .[] | select(.system != true)] | length')
if [ "$RAW_COUNT_BEFORE" -lt 9 ]; then
	echo "ERROR: Migration did not create 9 user collections (found $RAW_COUNT_BEFORE)" >&2
	echo "Raw dump: $RAW_DUMP" >&2
	echo "--- PB log tail ---" >&2
	tail -n 80 "$PB_LOG" >&2 || true
	exit 1
fi
echo "==> Migration created $RAW_COUNT_BEFORE user collections"

# --- Dump the live schema as JSON -----------------------------------------
CURRENT_SCHEMA="$TEST_DIR/current-schema.json"
# The /api/collections endpoint returns a paginated envelope {items, page, ...}
# (or the raw array if no envelope is present). Normalize to a plain array.
curl -s -H "Authorization: $TOKEN" "http://127.0.0.1:$TEST_PORT/api/collections" \
	| jq 'if type == "object" and has("items") then .items else . end' \
	> "$CURRENT_SCHEMA"
CURRENT_COUNT=$(jq 'length' "$CURRENT_SCHEMA")
echo "==> Dumped $CURRENT_COUNT total collections to $CURRENT_SCHEMA"

# --- Normalizer (jq) ------------------------------------------------------
# Produces a canonical, sorted JSON representation of the user collections.
# - Drops PocketBase-generated ids (collection and field) since they are
#   random per-instance and not part of the schema semantics.
# - Drops system collections (system: true).
# - Resolves relation collectionId -> target collection name so the diff is
#   independent of the per-instance collection ids.
# - Parses index SQL into a [table, col1, col2, ...] structure (drops the
#   random index-name suffix; the optional WHERE clause is also dropped
#   since both sides are normalized identically).
# - Sorts collections, fields, indexes, and mimeTypes for determinism.
NORMALIZER='
  # Build a map: collectionId -> collectionName (only for system:false)
  ( [ .[] | select(.system != true) ]
    | reduce .[] as $c ({}; .[$c.id] = $c.name) ) as $id_map
  | [ .[] | select(.system != true) ]
  | map(
      {
        name: .name,
        type: .type,
        listRule: .listRule,
        viewRule: .viewRule,
        createRule: .createRule,
        updateRule: .updateRule,
        deleteRule: .deleteRule,
        # Auth-only options (null for base collections).
        # Token options strip the auto-generated `secret` field (random
        # per-instance). oauth2 strips the auto-generated `providers` array.
        authRule:        (if .type == "auth" then .authRule        else null end),
        manageRule:      (if .type == "auth" then .manageRule      else null end),
        authAlert:       (if .type == "auth" then .authAlert       else null end),
        oauth2:          (if .type == "auth" then (.oauth2 // {}) | del(.providers, .secret) else null end),
        passwordAuth:    (if .type == "auth" then .passwordAuth    else null end),
        mfa:             (if .type == "auth" then .mfa             else null end),
        otp:             (if .type == "auth" then .otp             else null end),
        authToken:       (if .type == "auth" then (.authToken       // {} | del(.secret)) else null end),
        passwordResetToken:    (if .type == "auth" then (.passwordResetToken    // {} | del(.secret)) else null end),
        emailChangeToken:      (if .type == "auth" then (.emailChangeToken      // {} | del(.secret)) else null end),
        verificationToken:     (if .type == "auth" then (.verificationToken     // {} | del(.secret)) else null end),
        fileToken:             (if .type == "auth" then (.fileToken             // {} | del(.secret)) else null end),
        verificationTemplate:  (if .type == "auth" then .verificationTemplate  else null end),
        resetPasswordTemplate: (if .type == "auth" then .resetPasswordTemplate else null end),
        confirmEmailChangeTemplate: (if .type == "auth" then .confirmEmailChangeTemplate else null end),
        # Indexes parsed into {table, columns}
        indexes: (
          (.indexes // [])
          | map(
              # Format: CREATE [UNIQUE] INDEX `name` ON `table` (`col1`, `col2`) [WHERE ...]
              ( split("ON `") | .[1] | split("` (") | .[0] ) as $table
              | ( split("` (") | .[1] | split(")")   | .[0]
                  | split(", ") | map(gsub("^`|`$"; "")) ) as $cols
              | { table: $table, columns: $cols }
            )
          | sort
        ),
        # Fields with semantic properties only
        fields: (
          .fields
          | map({
              name:                .name,
              type:                .type,
              required:            .required,
              system:              .system,
              pattern:             .pattern,
              max:                 .max,
              min:                 .min,
              maxSelect:           .maxSelect,
              maxSize:             .maxSize,
              onlyInt:             .onlyInt,
              minSelect:           .minSelect,
              mimeTypes:           ((.mimeTypes // []) | sort),
              protected:           .protected,
              thumbs:              .thumbs,
              autogeneratePattern: .autogeneratePattern,
              presentable:         .presentable,
              hidden:              .hidden,
              onCreate:            .onCreate,
              onUpdate:            .onUpdate,
              cascadeDelete:       .cascadeDelete,
              # For relation fields, replace id with target collection name
              collectionId:        (
                if .type == "relation"
                then ($id_map[.collectionId] // .collectionId)
                else null
                end
              ),
              exceptDomains:       .exceptDomains,
              onlyDomains:         .onlyDomains,
              cost:                .cost
            })
          | sort_by(.name)
        )
      }
    )
  | sort_by(.name)
'

NORMALIZED_CURRENT="$TEST_DIR/normalized-current.json"
NORMALIZED_SOURCE="$TEST_DIR/normalized-source.json"

jq "$NORMALIZER" "$CURRENT_SCHEMA" > "$NORMALIZED_CURRENT"
jq "$NORMALIZER" "./pb_schema.json" > "$NORMALIZED_SOURCE"

# --- Diff ------------------------------------------------------------------
echo "==> Diffing normalized schemas"
DIFF_FILE="$TEST_DIR/diff.txt"
if diff -u "$NORMALIZED_SOURCE" "$NORMALIZED_CURRENT" > "$DIFF_FILE"; then
	echo ""
	echo "✅ Migration fidelity check PASSED (empty diff)"
	echo "   Source:  pb_schema.json  (9 user collections)"
	echo "   Current: $CURRENT_SCHEMA  ($CURRENT_COUNT total collections in PB)"
	FINAL_EXIT=0
else
	echo ""
	echo "❌ Migration fidelity check FAILED (non-empty diff)"
	echo "   See $DIFF_FILE for the full diff."
	echo "   Source:  $NORMALIZED_SOURCE"
	echo "   Current: $NORMALIZED_CURRENT"
	echo ""
	echo "--- Diff (first 200 lines) ---"
	head -n 200 "$DIFF_FILE"
	FINAL_EXIT=1
fi

# --- Idempotency probe (advisory, does not affect FINAL_EXIT) --------------
# Restart PB on the same data dir. The migration is already recorded in
# _migrations, so PB will skip it — but if our helper were accidentally
# non-idempotent, we would see duplicated or altered schema. We re-dump
# and confirm the schema is still 14 collections with no errors.
echo ""
echo "==> Idempotency probe: restarting PB on the same data dir"
"$PB" serve --http=127.0.0.1:"$TEST_PORT" --dir="$TEST_DIR" --migrationsDir=./pb_migrations \
	>>"$PB_LOG" 2>&1 &
PB_PID=$!
for _ in $(seq 1 15); do
	curl -s "http://127.0.0.1:$TEST_PORT/api/health" >/dev/null 2>&1 && break
	sleep 1
done
if curl -s "http://127.0.0.1:$TEST_PORT/api/health" >/dev/null 2>&1; then
	# Authenticate again (the superuser is preserved across restarts)
	AUTH_RESP2=$(curl -s -X POST "http://127.0.0.1:$TEST_PORT/api/collections/_superusers/auth-with-password" \
		-H "Content-Type: application/json" \
		-d "$(jq -nc --arg id "$TEST_ADMIN_EMAIL" --arg pw "$TEST_ADMIN_PASSWORD" \
			'{identity:$id, password:$pw}')")
	TOKEN2=$(echo "$AUTH_RESP2" | jq -r .token 2>/dev/null || echo "")
	if [ -n "$TOKEN2" ] && [ "$TOKEN2" != "null" ]; then
		SECOND_COUNT=$(curl -s -H "Authorization: $TOKEN2" "http://127.0.0.1:$TEST_PORT/api/collections" \
			| jq 'if type == "object" and has("items") then .items else . end | length')
		if [ "$SECOND_COUNT" = "$CURRENT_COUNT" ]; then
			echo "✅ Idempotency: re-ran cleanly with $SECOND_COUNT collections"
		else
			echo "❌ Idempotency: collection count changed ($CURRENT_COUNT → $SECOND_COUNT)"
			FINAL_EXIT=1
		fi
	else
		echo "⚠️  Idempotency: could not re-authenticate (skipping)"
	fi
else
	echo "⚠️  Idempotency: PB did not restart cleanly (skipping)"
fi

exit "$FINAL_EXIT"
