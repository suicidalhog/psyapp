import { compare, hash } from "bcryptjs"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function getUserByEmail(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

export async function getUserById(id: number) {
  try {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}

export async function createUser(userData: {
  name: string
  email: string
  password: string
  role?: string
  image?: string
}) {
  try {
    const hashedPassword = await hash(userData.password, 10)

    const result = await db
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || "user",
        image: userData.image,
      })
      .returning()

    return result[0]
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function verifyPassword(user: { password: string }, inputPassword: string) {
  return compare(inputPassword, user.password)
}

export async function updateUser(id: number, data: Partial<Omit<typeof users.$inferInsert, "id">>) {
  try {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()

    return result[0]
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}
