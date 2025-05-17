import type { InferModel } from "drizzle-orm"
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Conversations table
export const conversations = pgTable("conversations", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  personalityId: varchar("personality_id", { length: 50 }).notNull(),
  modelId: varchar("model_id", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: varchar("conversation_id", { length: 255 }).references(() => conversations.id, {
    onDelete: "cascade",
  }),
  role: varchar("role", { length: 50 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Files table
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  conversationId: varchar("conversation_id", { length: 255 }).references(() => conversations.id, {
    onDelete: "set null",
  }),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  blobUrl: varchar("blob_url", { length: 255 }).notNull(),
  blobPathname: varchar("blob_pathname", { length: 255 }).notNull(),
  contentType: varchar("content_type", { length: 100 }).notNull(),
  size: integer("size").notNull(),
  fileType: varchar("file_type", { length: 50 }),
  extractedText: text("extracted_text"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Analytics table
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  eventType: varchar("event_type", { length: 50 }).notNull(),
  modelId: varchar("model_id", { length: 50 }),
  personalityId: varchar("personality_id", { length: 50 }),
  query: text("query"),
  responseTime: integer("response_time"),
  tokenCount: integer("token_count"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Types
export type User = InferModel<typeof users>
export type Conversation = InferModel<typeof conversations>
export type Message = InferModel<typeof messages>
export type File = InferModel<typeof files>
export type Analytics = InferModel<typeof analytics>
