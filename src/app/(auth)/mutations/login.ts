import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"
import { SecurePassword } from "@blitzjs/auth/secure-password"

export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
  const { email, password } = Login.parse({ email: rawEmail, password: rawPassword })
  const user = await db.user.findFirst({ where: { email } })
  if (!user) throw new AuthenticationError("No account found with this email. Please sign up first.")

  // Check account status
  if (user.accountStatus === "BANNED") {
    throw new AuthenticationError("Your account has been banned")
  }

  if (user.accountStatus === "SUSPENDED") {
    throw new AuthenticationError("Your account has been suspended")
  }

  if (user.accountStatus === "PENDING_VERIFICATION") {
    throw new AuthenticationError("Your account is pending verification")
  }

  // Check ban status and auto-unban if expired
  if (user.banned && user.banExpires) {
    const now = new Date()
    if (now > user.banExpires) {
      // Auto-unban if ban has expired
      await db.user.update({
        where: { id: user.id },
        data: {
          banned: false,
          banReason: null,
          banExpires: null,
          accountStatus: "ACTIVE",
        },
      })
    } else {
      // Ban is still active
      const banReason = user.banReason || "Violation of terms"
      const expiresDate = user.banExpires.toLocaleDateString()
      throw new AuthenticationError(
        `Your account is banned until ${expiresDate}. Reason: ${banReason}`
      )
    }
  } else if (user.banned && !user.banExpires) {
    // Permanent ban
    const banReason = user.banReason || "Violation of terms"
    throw new AuthenticationError(`Your account is permanently banned. Reason: ${banReason}`)
  }

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  const user = await authenticateUser(email, password)
  await ctx.session.$create({ userId: user.id, role: user.role as "USER" | "ADMIN" })
  return user
})
