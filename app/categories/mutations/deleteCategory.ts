import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const DeleteCategory = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteCategory), resolver.authorize(), async ({id}) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.category.deleteMany({where: {id}})
})
