import {paginate, resolver} from "blitz"
import db, {Prisma} from "db"

interface GetPostsInput
  extends Pick<Prisma.PostFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({where, orderBy, skip = 0, take = 100}: GetPostsInput) => {
  if (db.post !== undefined) {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {items: posts, hasMore, nextPage, count} = await paginate({
      skip,
      take,
      count: () => db.post.count({where}),
      query: (paginateArgs) =>
        db.post.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            categories: true,
          },
        }),
    })

    return {
      posts,
      nextPage,
      hasMore,
      count,
    }
  }
  return {posts: [], nextPage: null, hasMore: false, count: 0}
})
