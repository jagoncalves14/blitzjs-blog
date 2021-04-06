import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const CreateUser = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateUser), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.user.create({data: input})
})
