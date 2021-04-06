import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const DeleteTag = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteTag), resolver.authorize(), async ({id}) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.tag.deleteMany({where: {id}})
})
