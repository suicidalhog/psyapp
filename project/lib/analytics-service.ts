import { db } from "@/lib/db"
import { analytics } from "@/lib/schema"
import { eq, desc, sql } from "drizzle-orm"

export async function trackEvent(data: {
  userId?: number
  eventType: string
  modelId?: string
  personalityId?: string
  query?: string
  responseTime?: number
  tokenCount?: number
}) {
  try {
    const result = await db.insert(analytics).values(data).returning()
    return result[0]
  } catch (error) {
    console.error("Error tracking analytics event:", error)
    // Don't throw error to prevent disrupting the user experience
    return null
  }
}

export async function getAnalyticsByUserId(userId: number) {
  try {
    return await db.select().from(analytics).where(eq(analytics.userId, userId)).orderBy(desc(analytics.createdAt))
  } catch (error) {
    console.error("Error getting analytics by user ID:", error)
    throw error
  }
}

export async function getAnalyticsSummary() {
  try {
    // This is a simplified example - in a real app, you'd use more complex queries
    const totalQueries = await db
      .select({ count: sql`count(*)` })
      .from(analytics)
      .where(eq(analytics.eventType, "query"))

    const modelUsage = await db
      .select({
        modelId: analytics.modelId,
        count: sql`count(*)`,
      })
      .from(analytics)
      .where(eq(analytics.eventType, "query"))
      .groupBy(analytics.modelId)

    const personalityUsage = await db
      .select({
        personalityId: analytics.personalityId,
        count: sql`count(*)`,
      })
      .from(analytics)
      .where(eq(analytics.eventType, "query"))
      .groupBy(analytics.personalityId)

    return {
      totalQueries: totalQueries[0]?.count || 0,
      modelUsage,
      personalityUsage,
    }
  } catch (error) {
    console.error("Error getting analytics summary:", error)
    throw error
  }
}
