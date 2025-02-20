import { sql } from "drizzle-orm";
import * as s from "drizzle-orm/sqlite-core";

export const users = s.sqliteTable("users", {
  id: s.integer("id").primaryKey(),
  accessToken: s.text("access_token"),
  refreshToken: s.text("refresh_token"),
  obtainmentTimestamp: s.integer("obtainment_timestamp"),
  expiresIn: s.integer("expires_in"),
});

export const scopes = s.sqliteTable("scopes", {
  id: s.integer("id").primaryKey({ autoIncrement: true }),
  scope: s.text("scope"),
});

export const userScope = s.sqliteTable("user_scope", {
  userId: s.integer("user_id").references(() => users.id),
  scopeId: s.integer("scope_id").references(() => scopes.id),
});
