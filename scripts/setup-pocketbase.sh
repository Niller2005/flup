#!/usr/bin/env bash
# scripts/setup-pocketbase.sh
#
# Downloads the PocketBase v0.39.3 server binary for the current platform,
# verifies its SHA256 against the published checksums, and makes it executable.
#
# Safe to run repeatedly: it only writes the binary to the project root.
# It does NOT touch any existing pb_data/ directory.

set -euo pipefail

POCKETBASE_VERSION="0.39.3"

# --- Detect OS ----------------------------------------------------------------
UNAME_S=$(uname -s | tr '[:upper:]' '[:lower:]')
case "$UNAME_S" in
	linux) OS="linux" ;;
	darwin) OS="darwin" ;;
	*)
		echo "Error: unsupported OS '$UNAME_S' (only linux and darwin are supported)" >&2
		exit 1
		;;
esac

# --- Detect architecture ------------------------------------------------------
UNAME_M=$(uname -m)
case "$UNAME_M" in
	x86_64) ARCH="amd64" ;;
	aarch64 | arm64) ARCH="arm64" ;;
	*)
		echo "Error: unsupported architecture '$UNAME_M' (only x86_64 and arm64 are supported)" >&2
		exit 1
		;;
esac

ARCHIVE="pocketbase_${POCKETBASE_VERSION}_${OS}_${ARCH}.zip"
URL="https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/${ARCHIVE}"
CHECKSUMS_URL="https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/checksums.txt"

echo "→ Detected platform: ${OS}/${ARCH}"
echo "→ Target version:    v${POCKETBASE_VERSION}"
echo "→ Archive:           ${ARCHIVE}"

# --- Download archive ---------------------------------------------------------
echo "→ Downloading archive…"
curl -fL --retry 3 -o "$ARCHIVE" "$URL"

# --- Download checksums to a temp dir -----------------------------------------
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

echo "→ Downloading checksums…"
curl -fL --retry 3 -o "${TMPDIR}/checksums.txt" "$CHECKSUMS_URL"

# --- Verify SHA256 ------------------------------------------------------------
echo "→ Verifying SHA256 checksum…"
EXPECTED_LINE=$(grep -F "  ${ARCHIVE}" "${TMPDIR}/checksums.txt" || true)
if [ -z "$EXPECTED_LINE" ]; then
	echo "Warning: no checksum entry for ${ARCHIVE} found in checksums file — skipping verification" >&2
else
	if command -v sha256sum >/dev/null 2>&1; then
		printf '%s\n' "$EXPECTED_LINE" | sha256sum -c -
	else
		# macOS fallback (ships `shasum`, not GNU `sha256sum`)
		printf '%s\n' "$EXPECTED_LINE" | shasum -a 256 -c
	fi
	echo "✓ Checksum verified"
fi

# --- Extract ------------------------------------------------------------------
echo "→ Extracting…"
unzip -o "$ARCHIVE" -d .

# --- Cleanup ------------------------------------------------------------------
rm -f CHANGELOG.md
rm -f "$ARCHIVE"
chmod +x ./pocketbase

echo ""
echo "✓ PocketBase v${POCKETBASE_VERSION} installed at ./pocketbase"
echo ""
echo "Next steps:"
echo "  • Start the dev server (points at ./pb_data):   bun run dev:pb"
echo "  • Or run a clean isolated dev:                  bun run dev:pb:isolated"
echo "  • Or run both together:                         bun run dev"
