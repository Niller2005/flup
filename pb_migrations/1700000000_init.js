/// <reference path="../pb_data/types.d.ts" />

// =============================================================================
// flup.app — PocketBase initial schema migration
// -----------------------------------------------------------------------------
// Source of truth: pb_schema.json
//
// This migration recreates the 9 user-defined collections (users + 8 base
// collections). The 5 system collections (_superusers, _authOrigins,
// _externalAuths, _mfas, _otps) are intentionally NOT recreated here — they
// are auto-created by PocketBase on first `serve` with values matching the
// source schema.
//
// The migration is IDEMPOTENT: it creates collections that don't exist, and
// reconciles the configurable properties (rules, auth options, fields,
// indexes) of collections that do exist. Running it on top of a pre-existing
// pb_data/ directory produces the same end state as a fresh install.
//
// Ordering rationale:
//   - `users` is first because every other table may indirectly depend on it.
//   - `logs` is created BEFORE `emotes` because `emotes.field` is a relation
//     pointing at the `logs` collection; we look up the runtime collection
//     id via `app.findCollectionByNameOrId("logs").id`.
// =============================================================================


/// Idempotency helper ---------------------------------------------------------
/// Creates a collection if it does not exist; if it does exist, updates the
/// existing instance's configurable properties so the result matches the
/// provided config (idempotent — re-running produces the same state).
///
/// Why "update on existing" rather than pure "check-then-create":
/// PocketBase auto-creates the `users` auth collection on first `serve` with
/// hard-coded defaults (e.g. authAlert.enabled=true, oauth2.enabled=false,
/// mfa.duration=600, authToken.duration=432000, etc.). A pure skip-on-existing
/// would leave those defaults in place and diverge from the source schema.
/// We therefore write the desired values into the existing collection object
/// before saving it. New user-facing fields (e.g. name, avatar) are appended
/// without disturbing the system fields PocketBase owns.
///
/// Note: PocketBase's JSVM binding for `app.findCollectionByNameOrId` THROWS
/// `sql: no rows in result set` (the Go `sql.ErrNoRows` error) when the
/// collection does not exist, instead of returning `null`. We swallow that
/// specific error to preserve the usual "returns null if missing" contract.
function upsertCollection(app, config, name) {
    let existing = null;
    try {
        existing = app.findCollectionByNameOrId(name);
    } catch (e) {
        // Collection does not exist — fall through to create it.
    }

    if (!existing) {
        const collection = new Collection(config);
        app.save(collection);
        return collection;
    }

    // Collection already exists — update its configurable properties.
    console.log(`[init] Collection '${name}' already exists; reconciling options.`);

    // Rules (apply to both auth and base collections)
    existing.listRule = config.listRule;
    existing.viewRule = config.viewRule;
    existing.createRule = config.createRule;
    existing.updateRule = config.updateRule;
    existing.deleteRule = config.deleteRule;

    // Indexes
    existing.indexes = config.indexes || [];

    // Auth-specific options
    if (config.type === "auth") {
        existing.authRule = config.authRule;
        existing.manageRule = config.manageRule;
        existing.authAlert = config.authAlert;
        existing.oauth2 = config.oauth2;
        existing.passwordAuth = config.passwordAuth;
        existing.mfa = config.mfa;
        existing.otp = config.otp;
        existing.authToken = config.authToken;
        existing.passwordResetToken = config.passwordResetToken;
        existing.emailChangeToken = config.emailChangeToken;
        existing.verificationToken = config.verificationToken;
        existing.fileToken = config.fileToken;
        existing.verificationTemplate = config.verificationTemplate;
        existing.resetPasswordTemplate = config.resetPasswordTemplate;
        existing.confirmEmailChangeTemplate = config.confirmEmailChangeTemplate;

        // Append any user-defined fields that are not already present.
        // We deliberately do not touch system fields (id, password, tokenKey,
        // email, emailVisibility, verified) — those are owned by PocketBase.
        const existingFieldNames = existing.fields.map((f) => f.name);
        for (const field of (config.fields || [])) {
            if (!existingFieldNames.includes(field.name)) {
                existing.fields.push(field);
            }
        }
    } else {
        // Base collection: replace the field list with the desired one.
        // PocketBase will re-add the system `id` field automatically.
        existing.fields = config.fields || [];
    }

    app.save(existing);
    return existing;
}


migrate(
    // =========================================================================
    // up — create all collections
    // =========================================================================
    (app) => {
        // ---------------------------------------------------------------------
        // 1. users (auth)
        // ---------------------------------------------------------------------
        // All user-facing fields (name, avatar) + auto-date stamps.
        // System fields (id, password, tokenKey, email, emailVisibility,
        // verified) are auto-injected by PocketBase and intentionally omitted.
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "auth",
            name: "users",
            listRule: "id = @request.auth.id",
            viewRule: "id = @request.auth.id",
            createRule: "",
            updateRule: "id = @request.auth.id",
            deleteRule: "id = @request.auth.id",
            manageRule: null,
            authRule: "",
            authAlert: {
                enabled: false,
                emailTemplate: {
                    subject: "Login from a new location",
                    body: "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location:</p>\n<p><em>{ALERT_INFO}</em></p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>If this was you, you may disregard this email.</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
                },
            },
            oauth2: {
                mappedFields: {
                    id: "",
                    name: "name",
                    username: "",
                    avatarURL: "avatar",
                },
                enabled: true,
            },
            passwordAuth: {
                enabled: true,
                identityFields: ["email"],
            },
            mfa: {
                enabled: false,
                duration: 1800,
                rule: "",
            },
            otp: {
                enabled: false,
                duration: 180,
                length: 8,
                emailTemplate: {
                    subject: "OTP for {APP_NAME}",
                    body: "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
                },
            },
            authToken: { duration: 604800 },
            passwordResetToken: { duration: 1800 },
            emailChangeToken: { duration: 1800 },
            verificationToken: { duration: 259200 },
            fileToken: { duration: 180 },
            verificationTemplate: {
                subject: "Verify your {APP_NAME} email",
                body: "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
            },
            resetPasswordTemplate: {
                subject: "Reset your {APP_NAME} password",
                body: "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
            },
            confirmEmailChangeTemplate: {
                subject: "Confirm your {APP_NAME} new email address",
                body: "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
            },
            indexes: [
                "CREATE UNIQUE INDEX `idx_tokenKey__pb_users_auth_` ON `users` (`tokenKey`)",
                "CREATE UNIQUE INDEX `idx_email__pb_users_auth_` ON `users` (`email`) WHERE `email` != ''",
            ],
            fields: [
                { type: "text", name: "name", max: 255, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false },
                {
                    type: "file",
                    name: "avatar",
                    maxSelect: 1,
                    maxSize: 0,
                    mimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp",
                    ],
                    protected: false,
                    required: false,
                    thumbs: null,
                    presentable: false,
                    hidden: false,
                },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
        }, "users");

        // ---------------------------------------------------------------------
        // 2. botSessions (base)
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "base",
            name: "botSessions",
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "accessToken", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "refreshToken", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "number", name: "expiresIn", max: null, min: null, onlyInt: true, required: false, presentable: false, hidden: false },
                { type: "number", name: "obtainmentTimestamp", max: null, min: null, onlyInt: true, required: false, presentable: false, hidden: false },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [],
        }, "botSessions");

        // ---------------------------------------------------------------------
        // 3. channels (base)
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "base",
            name: "channels",
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "channel", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [],
        }, "channels");

        // ---------------------------------------------------------------------
        // 4. commands (base)
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "base",
            name: "commands",
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "channel", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "user", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "command", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "args", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [],
        }, "commands");

        // ---------------------------------------------------------------------
        // 5. links (base)
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "base",
            name: "links",
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "message_id", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "channel", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "user", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "url", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "message", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [],
        }, "links");

        // ---------------------------------------------------------------------
        // 6. logs (base)
        // ---------------------------------------------------------------------
        // NOTE: logs MUST be created before emotes (emotes.field is a relation
        // pointing at logs). We capture the runtime id from the upsert
        // return value for use when creating the emotes collection below.
        // ---------------------------------------------------------------------
        const logsCol = upsertCollection(app, {
            type: "base",
            name: "logs",
            listRule: "",
            viewRule: "",
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "message_id", max: 0, min: 0, required: true, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "channel", max: 0, min: 0, required: true, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "user", max: 0, min: 0, required: true, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "message", max: 0, min: 0, required: true, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "html", max: 50000, min: 0, required: true, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "json", name: "emotes", maxSize: 0, required: false, presentable: false, hidden: false },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [
                "CREATE INDEX `idx_AvxQqoCwNR` ON `logs` (`emotes`)",
                "CREATE INDEX `idx_yqEonSZKFk` ON `logs` (`message`)",
                "CREATE INDEX `idx_i4fdqcai68` ON `logs` (`channel`)",
            ],
        }, "logs");

        // ---------------------------------------------------------------------
        // 7. emotes (base) — depends on logs (relation)
        // ---------------------------------------------------------------------
        // The `field` relation references the logs collection; we resolve its
        // runtime id via the logsCol variable captured above.
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "base",
            name: "emotes",
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "name", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "provider", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "providerID", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                {
                    type: "relation",
                    name: "field",
                    collectionId: logsCol.id,
                    cascadeDelete: false,
                    maxSelect: 999,
                    minSelect: 0,
                    required: false,
                    presentable: false,
                    hidden: false,
                },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [],
        }, "emotes");

        // ---------------------------------------------------------------------
        // 8. songRequests (base)
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "base",
            name: "songRequests",
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "artists", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "title", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "spotifyID", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "bool", name: "played", required: false, presentable: false, hidden: false },
                { type: "text", name: "requestedBy", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [],
        }, "songRequests");

        // ---------------------------------------------------------------------
        // 9. tokens (base)
        // ---------------------------------------------------------------------
        upsertCollection(app, {
            type: "base",
            name: "tokens",
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            fields: [
                { type: "text", name: "user_id", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "access_token", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "text", name: "refresh_token", max: 0, min: 0, required: false, presentable: false, autogeneratePattern: "", pattern: "", hidden: false, primaryKey: false },
                { type: "number", name: "expires_in", max: null, min: null, onlyInt: false, required: false, presentable: false, hidden: false },
                { type: "number", name: "obtainment_timestamp", max: null, min: null, onlyInt: false, required: false, presentable: false, hidden: false },
                { type: "autodate", name: "created", onCreate: true, onUpdate: false, hidden: false, presentable: false },
                { type: "autodate", name: "updated", onCreate: true, onUpdate: true, hidden: false, presentable: false },
            ],
            indexes: [],
        }, "tokens");
    },

    // =========================================================================
    // down — delete in reverse order (best effort, wrapped in try/catch)
    // =========================================================================
    (app) => {
        // Deletion order is the reverse of creation order to avoid foreign
        // key / relation violations. Each delete is wrapped in try/catch so
        // a missing collection (e.g. from a partial migration) does not
        // abort the rollback.
        const collections = [
            "tokens",
            "songRequests",
            "emotes",
            "links",
            "commands",
            "logs",
            "channels",
            "botSessions",
            "users",
        ];
        for (const name of collections) {
            try {
                const col = app.findCollectionByNameOrId(name);
                if (col) {
                    app.delete(col);
                }
            } catch (e) {
                console.log(`[rollback] Could not delete ${name}: ${e.message}`);
            }
        }
    },
);
