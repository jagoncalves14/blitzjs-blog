import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const UpdateUser = z
  .object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateUser),
  resolver.authorize(),
  async ({id, ...data}) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    return await db.user.update({where: {id}, data})
  },
)
