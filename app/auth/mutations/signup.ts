import {Signup} from "app/auth/validations"
import {resolver, SecurePassword} from "blitz"
import db from "db"
import {Role} from "types"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({email, firstName, lastName, password}, ctx) => {
    const hashedPassword = await SecurePassword.hash(password)
    const user = await db.user.create({
      data: {email: email.toLowerCase(), firstName, lastName, hashedPassword, role: "user"},
      select: {id: true, firstName: true, lastName: true, email: true, role: true},
    })

    await ctx.session.$create({userId: user.id, role: user.role as Role})
    return user
  },
)
