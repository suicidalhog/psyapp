import { db } from "@/lib/db"
import { files } from "@/lib/schema"
import { eq, and } from "drizzle-orm"

export async function saveFileMetadata(fileData: {
  userId: number
  conversationId?: string
  originalName: string
  blobUrl: string
  blobPathname: string
  contentType: string
  size: number
  fileType?: string
  extractedText?: string
}) {
  try {
    const result = await db.insert(files).values(fileData).returning()
    return result[0]
  } catch (error) {
    console.error("Error saving file metadata:", error)
    throw error
  }
}

export async function getFilesByUserId(userId: number) {
  try {
    return await db.select().from(files).where(eq(files.userId, userId)).orderBy(files.createdAt)
  } catch (error) {
    console.error("Error getting files by user ID:", error)
    throw error
  }
}

export async function getFilesByConversationId(conversationId: string) {
  try {
    return await db.select().from(files).where(eq(files.conversationId, conversationId)).orderBy(files.createdAt)
  } catch (error) {
    console.error("Error getting files by conversation ID:", error)
    throw error
  }
}

export async function deleteFile(id: number, userId: number) {
  try {
    await db.delete(files).where(and(eq(files.id, id), eq(files.userId, userId)))

    return true
  } catch (error) {
    console.error("Error deleting file:", error)
    throw error
  }
}

export async function updateFileConversation(id: number, userId: number, conversationId: string | null) {
  try {
    const result = await db
      .update(files)
      .set({ conversationId })
      .where(and(eq(files.id, id), eq(files.userId, userId)))
      .returning()

    return result[0]
  } catch (error) {
    console.error("Error updating file conversation:", error)
    throw error
  }
}

export async function updateFileMetadata(
  id: number,
  userId: number,
  data: Partial<{
    fileType: string
    extractedText: string
  }>,
) {
  try {
    const result = await db
      .update(files)
      .set(data)
      .where(and(eq(files.id, id), eq(files.userId, userId)))
      .returning()

    return result[0]
  } catch (error) {
    console.error("Error updating file metadata:", error)
    throw error
  }
}
