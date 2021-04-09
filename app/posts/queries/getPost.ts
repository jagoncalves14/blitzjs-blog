import {NotFoundError, resolver} from "blitz"
import db from "db"
import * as z from "zod"

const GetPost = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPost), async ({id}) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.findFirst({
    where: {id},
    include: {
      categories: true,
      tags: true,
    },
  })

  if (!post) throw new NotFoundError()

  return post
})
