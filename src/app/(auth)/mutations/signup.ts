import { generateUniqueReferCode } from "@/utils/generateReferCode"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Signup } from "../validations"

export default resolver.pipe(resolver.zod(Signup), async ({ name, email, mobileNumber, password, country, state, city }, ctx) => {
  const blitzContext = ctx
  const hashedPassword = await SecurePassword.hash(password)
  const userEmail = email || `test${Math.random()}@test.com`
  const referCode = await generateUniqueReferCode()

  const user = await db.user.create({
    data: {
      name: name || null,
      email: userEmail,
      mobileNumber,
      hashedPassword,
      country,
      state,
      city,
      referCode,
      role: "USER",
      accountStatus: "ACTIVE",
      banned: false,
      isProfileComplete: false,
    },
  })

  await blitzContext.session.$create({
    userId: user.id,
    role: user.role as "USER" | "ADMIN",
  })

  return {
    userId: blitzContext.session.userId,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      referCode: user.referCode,
    },
  }
})
