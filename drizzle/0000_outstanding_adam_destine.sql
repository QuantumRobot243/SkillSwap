-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

CREATE TABLE `chat` (
    `message_id` int AUTO_INCREMENT NOT NULL,
    `sender_id` int NOT NULL,
    `receiver_id` int NOT NULL,
    `message` text NOT NULL,
    `sent_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT `chat_message_id` PRIMARY KEY(`message_id`)
);
--> statement-breakpoint
CREATE TABLE `feedback` (
    `feedback_id` int AUTO_INCREMENT NOT NULL,
    `user_id` int NOT NULL,
    `message` text NOT NULL,
    `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT `feedback_feedback_id` PRIMARY KEY(`feedback_id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
    `match_id` int AUTO_INCREMENT NOT NULL,
    `user1_id` int NOT NULL,
    `user2_id` int NOT NULL,
    `skill_id` int NOT NULL,
    `status` enum('Pending','Accepted','Rejected') DEFAULT 'Pending',
    `matched_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT `matches_match_id` PRIMARY KEY(`match_id`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
    `skill_id` int AUTO_INCREMENT NOT NULL,
    `skill_name` varchar(100) NOT NULL,
    `category` varchar(100),
    CONSTRAINT `skills_skill_id` PRIMARY KEY(`skill_id`),
    CONSTRAINT `skill_name` UNIQUE(`skill_name`)
);
--> statement-breakpoint
CREATE TABLE `userdata` (
    `user_id` int AUTO_INCREMENT NOT NULL,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password_hash` varchar(255) NOT NULL,
    `bio` text,
    `location` varchar(100),
    `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
    CONSTRAINT `userdata_user_id` PRIMARY KEY(`user_id`),
    CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `userskills` (
    `user_skill_id` int AUTO_INCREMENT NOT NULL,
    `user_id` int NOT NULL,
    `skill_id` int NOT NULL,
    `proficiency` enum('Beginner','Intermediate','Advanced') NOT NULL,
    CONSTRAINT `userskills_user_skill_id` PRIMARY KEY(`user_skill_id`)
);
--> statement-breakpoint
CREATE TABLE `videocall` (
    `call_id` int AUTO_INCREMENT NOT NULL,
    `caller_id` int NOT NULL,
    `receiver_id` int NOT NULL,
    `start_time` timestamp DEFAULT (CURRENT_TIMESTAMP),
    `end_time` timestamp,
    `call_status` enum('Ongoing','Completed','Missed') DEFAULT 'Ongoing',
    CONSTRAINT `videocall_call_id` PRIMARY KEY(`call_id`)
);
--> statement-breakpoint
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `chat` ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `feedback` ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `matches` ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `matches` ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `matches` ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`skill_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `userskills` ADD CONSTRAINT `userskills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `userskills` ADD CONSTRAINT `userskills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`skill_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `videocall` ADD CONSTRAINT `videocall_ibfk_1` FOREIGN KEY (`caller_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `videocall` ADD CONSTRAINT `videocall_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `userdata`(`user_id`) ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX `receiver_id` ON `chat` (`receiver_id`);
--> statement-breakpoint
CREATE INDEX `sender_id` ON `chat` (`sender_id`);
--> statement-breakpoint
CREATE INDEX `user_id` ON `feedback` (`user_id`);
--> statement-breakpoint
CREATE INDEX `skill_id` ON `matches` (`skill_id`);
--> statement-breakpoint
CREATE INDEX `user1_id` ON `matches` (`user1_id`);
--> statement-breakpoint
CREATE INDEX `user2_id` ON `matches` (`user2_id`);
--> statement-breakpoint
CREATE INDEX `skill_id` ON `userskills` (`skill_id`);
--> statement-breakpoint
CREATE INDEX `user_id` ON `userskills` (`user_id`);
--> statement-breakpoint
CREATE INDEX `caller_id` ON `videocall` (`caller_id`);
--> statement-breakpoint
CREATE INDEX `receiver_id` ON `videocall` (`receiver_id`);
