import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, text, timestamp, mysqlEnum, unique, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const chat = mysqlTable("chat", {
	messageId: int("message_id").autoincrement().notNull(),
	senderId: int("sender_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	receiverId: int("receiver_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	message: text().notNull(),
	sentAt: timestamp("sent_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("receiver_id").on(table.receiverId),
	index("sender_id").on(table.senderId),
	primaryKey({ columns: [table.messageId], name: "chat_message_id"}),
]);

export const feedback = mysqlTable("feedback", {
	feedbackId: int("feedback_id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	message: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("user_id").on(table.userId),
	primaryKey({ columns: [table.feedbackId], name: "feedback_feedback_id"}),
]);

export const matches = mysqlTable("matches", {
	matchId: int("match_id").autoincrement().notNull(),
	user1Id: int("user1_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	user2Id: int("user2_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	skillId: int("skill_id").notNull().references(() => skills.skillId, { onDelete: "cascade" } ),
	status: mysqlEnum(['Pending','Accepted','Rejected']).default('Pending'),
	matchedAt: timestamp("matched_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("skill_id").on(table.skillId),
	index("user1_id").on(table.user1Id),
	index("user2_id").on(table.user2Id),
	primaryKey({ columns: [table.matchId], name: "matches_match_id"}),
]);

export const skills = mysqlTable("skills", {
	skillId: int("skill_id").autoincrement().notNull(),
	skillName: varchar("skill_name", { length: 100 }).notNull(),
	category: varchar({ length: 100 }),
},
(table) => [
	primaryKey({ columns: [table.skillId], name: "skills_skill_id"}),
	unique("skill_name").on(table.skillName),
]);

export const userdata = mysqlTable("userdata", {
	userId: int("user_id").autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	bio: text(),
	location: varchar({ length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	primaryKey({ columns: [table.userId], name: "userdata_user_id"}),
	unique("email").on(table.email),
]);

export const userskills = mysqlTable("userskills", {
	userSkillId: int("user_skill_id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	skillId: int("skill_id").notNull().references(() => skills.skillId, { onDelete: "cascade" } ),
	proficiency: mysqlEnum(['Beginner','Intermediate','Advanced']).notNull(),
},
(table) => [
	index("skill_id").on(table.skillId),
	index("user_id").on(table.userId),
	primaryKey({ columns: [table.userSkillId], name: "userskills_user_skill_id"}),
]);

export const videocall = mysqlTable("videocall", {
	callId: int("call_id").autoincrement().notNull(),
	callerId: int("caller_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	receiverId: int("receiver_id").notNull().references(() => userdata.userId, { onDelete: "cascade" } ),
	startTime: timestamp("start_time", { mode: 'string' }).defaultNow(),
	endTime: timestamp("end_time", { mode: 'string' }),
	callStatus: mysqlEnum("call_status", ['Ongoing','Completed','Missed']).default('Ongoing'),
},
(table) => [
	index("caller_id").on(table.callerId),
	index("receiver_id").on(table.receiverId),
	primaryKey({ columns: [table.callId], name: "videocall_call_id"}),
]);
