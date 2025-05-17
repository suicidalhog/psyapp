import { nanoid } from "nanoid"
import { db } from "@/lib/db"
import { conversations, messages } from "@/lib/schema"
import { eq, and, desc } from "drizzle-orm"
import type { CoreMessage } from "ai"

export async function getConversationsByUserId(userId: number) {
  try {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.updatedAt))
  } catch (error) {
    console.error("Error getting conversations by user ID:", error)
    throw error
  }
}

export async function getConversationById(id: string, userId: number) {
  try {
    const conversation = await db
      .select()
      .from(conversations)
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
      .limit(1)

    if (!conversation[0]) return null

    const messagesList = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(messages.createdAt)

    return {
      ...conversation[0],
      messages: messagesList.map((msg) => ({
        id: msg.id.toString(),
        role: msg.role,
        content: msg.content,
      })),
    }
  } catch (error) {
    console.error("Error getting conversation by ID:", error)
    throw error
  }
}

export async function createConversation(data: {
  title: string
  userId: number
  personalityId: string
  modelId: string
}) {
  try {
    const id = nanoid()

    const result = await db
      .insert(conversations)
      .values({
        id,
        title: data.title,
        userId: data.userId,
        personalityId: data.personalityId,
        modelId: data.modelId,
      })
      .returning()

    return result[0]
  } catch (error) {
    console.error("Error creating conversation:", error)
    throw error
  }
}

export async function updateConversation(
  id: string,
  userId: number,
  data: Partial<{
    title: string
    personalityId: string
    modelId: string
  }>,
) {
  try {
    const result = await db
      .update(conversations)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
      .returning()

    return result[0]
  } catch (error) {
    console.error("Error updating conversation:", error)
    throw error
  }
}

export async function deleteConversation(id: string, userId: number) {
  try {
    await db.delete(conversations).where(and(eq(conversations.id, id), eq(conversations.userId, userId)))

    return true
  } catch (error) {
    console.error("Error deleting conversation:", error)
    throw error
  }
}

export async function saveMessages(conversationId: string, newMessages: CoreMessage[]) {
  try {
    // Delete existing messages for this conversation
    await db.delete(messages).where(eq(messages.conversationId, conversationId))

    // Insert new messages
    if (newMessages.length > 0) {
      await db.insert(messages).values(
        newMessages.map((msg) => ({
          conversationId,
          role: msg.role,
          content: msg.content,
        })),
      )
    }

    // Update the conversation's updatedAt timestamp
    await db.update(conversations).set({ updatedAt: new Date() }).where(eq(conversations.id, conversationId))

    return true
  } catch (error) {
    console.error("Error saving messages:", error)
    throw error
  }
}
