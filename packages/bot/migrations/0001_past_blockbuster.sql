PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scopes` (
	`id` text
);
--> statement-breakpoint
INSERT INTO `__new_scopes`("id") SELECT "id" FROM `scopes`;--> statement-breakpoint
DROP TABLE `scopes`;--> statement-breakpoint
ALTER TABLE `__new_scopes` RENAME TO `scopes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;