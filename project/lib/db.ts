import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Create a SQL client with the connection string from environment variables
const sql = neon(process.env.DATABASE_URL!)

// Create a Drizzle client
export const db = drizzle(sql)

// Helper function for direct SQL queries
export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T> {
  try {
    return (await sql(query, params)) as T
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
