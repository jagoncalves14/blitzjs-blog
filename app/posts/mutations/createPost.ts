import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const CreatePost = z.object(
  {
    title: z.string(),
    authorId: z.number(),
    published: z.boolean(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreatePost), resolver.authorize(), async (payload) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.create({data: payload})

  return post
})
