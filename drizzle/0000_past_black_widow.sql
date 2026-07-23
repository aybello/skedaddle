CREATE TABLE `ga4_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`territory` varchar(128) NOT NULL,
	`pageType` varchar(64) NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`sessions` int NOT NULL DEFAULT 0,
	CONSTRAINT `ga4_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gbp_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`territory` varchar(128) NOT NULL,
	`metricType` varchar(32) NOT NULL,
	`year` int NOT NULL,
	`month` int NOT NULL,
	`value` int NOT NULL DEFAULT 0,
	`businessUrl` text,
	CONSTRAINT `gbp_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
