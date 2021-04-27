import {NotFoundError, resolver} from "blitz"
import db from "db"
import * as z from "zod"

const GetPost = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPost), async ({id}) => {
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
