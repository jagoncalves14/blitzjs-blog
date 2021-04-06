import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const DeleteProfile = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteProfile), resolver.authorize(), async ({id}) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const profile = await db.profile.deleteMany({where: {id}})

  return profile
})
