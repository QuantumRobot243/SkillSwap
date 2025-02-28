import { relations } from "drizzle-orm/relations";
import { userdata, chat, feedback, matches, skills, userskills, videocall } from "./schema";

export const chatRelations = relations(chat, ({one}) => ({
	userdatum_senderId: one(userdata, {
		fields: [chat.senderId],
		references: [userdata.userId],
		relationName: "chat_senderId_userdata_userId"
	}),
	userdatum_receiverId: one(userdata, {
		fields: [chat.receiverId],
		references: [userdata.userId],
		relationName: "chat_receiverId_userdata_userId"
	}),
}));

export const userdataRelations = relations(userdata, ({many}) => ({
	chats_senderId: many(chat, {
		relationName: "chat_senderId_userdata_userId"
	}),
	chats_receiverId: many(chat, {
		relationName: "chat_receiverId_userdata_userId"
	}),
	feedbacks: many(feedback),
	matches_user1Id: many(matches, {
		relationName: "matches_user1Id_userdata_userId"
	}),
	matches_user2Id: many(matches, {
		relationName: "matches_user2Id_userdata_userId"
	}),
	userskills: many(userskills),
	videocalls_callerId: many(videocall, {
		relationName: "videocall_callerId_userdata_userId"
	}),
	videocalls_receiverId: many(videocall, {
		relationName: "videocall_receiverId_userdata_userId"
	}),
}));

export const feedbackRelations = relations(feedback, ({one}) => ({
	userdatum: one(userdata, {
		fields: [feedback.userId],
		references: [userdata.userId]
	}),
}));

export const matchesRelations = relations(matches, ({one}) => ({
	userdatum_user1Id: one(userdata, {
		fields: [matches.user1Id],
		references: [userdata.userId],
		relationName: "matches_user1Id_userdata_userId"
	}),
	userdatum_user2Id: one(userdata, {
		fields: [matches.user2Id],
		references: [userdata.userId],
		relationName: "matches_user2Id_userdata_userId"
	}),
	skill: one(skills, {
		fields: [matches.skillId],
		references: [skills.skillId]
	}),
}));

export const skillsRelations = relations(skills, ({many}) => ({
	matches: many(matches),
	userskills: many(userskills),
}));

export const userskillsRelations = relations(userskills, ({one}) => ({
	userdatum: one(userdata, {
		fields: [userskills.userId],
		references: [userdata.userId]
	}),
	skill: one(skills, {
		fields: [userskills.skillId],
		references: [skills.skillId]
	}),
}));

export const videocallRelations = relations(videocall, ({one}) => ({
	userdatum_callerId: one(userdata, {
		fields: [videocall.callerId],
		references: [userdata.userId],
		relationName: "videocall_callerId_userdata_userId"
	}),
	userdatum_receiverId: one(userdata, {
		fields: [videocall.receiverId],
		references: [userdata.userId],
		relationName: "videocall_receiverId_userdata_userId"
	}),
}));