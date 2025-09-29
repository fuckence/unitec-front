// src/services/mockAuth.ts
export type AdminProfile = {
  id: string
  email: string
  role: "admin"
}

const MOCK_ADMINS = [
  { id: "a1", email: "123@test.kz", password: "123" },
  { id: "a2", email: "test@company.kz", password: "Test1234" },
]

export async function authenticateAdmin(email: string, password: string): Promise<AdminProfile> {
  await new Promise((r) => setTimeout(r, 400)) // имитация задержки
  const found = MOCK_ADMINS.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
  )
  if (!found) {
    const err: any = new Error("Invalid credentials")
    err.code = 401
    throw err
  }
  return { id: found.id, email: found.email, role: "admin" }
}
