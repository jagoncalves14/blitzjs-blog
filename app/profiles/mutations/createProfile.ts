import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const CreateProfile = z
  .object({
    bio: z.string(),
    userId: z.number().int(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateProfile), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.profile.create({data: input})
})
