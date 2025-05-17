import { hash } from "bcryptjs"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"

async function main() {
  try {
    // Create initial users
    const hashedPassword = await hash("password123", 10)

    await db.insert(users).values([
      {
        name: "Doctor",
        email: "doctor@example.com",
        password: hashedPassword,
        role: "doctor",
      },
      {
        name: "Patient",
        email: "patient@example.com",
        password: hashedPassword,
        role: "patient",
      },
      {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
    ])

    console.log("Seed completed successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

main()
