import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdatePost = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.update({ where: { id }, data })

    return post
  }
)
