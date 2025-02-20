CREATE TABLE `scopes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scope` text
);
--> statement-breakpoint
CREATE TABLE `user_scope` (
	`user_id` integer,
	`scope_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`scope_id`) REFERENCES `scopes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`obtainment_timestamp` integer,
	`expires_in` integer
);
