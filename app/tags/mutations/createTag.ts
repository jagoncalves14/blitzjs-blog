import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const CreateTag = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateTag), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.tag.create({data: input})
})
