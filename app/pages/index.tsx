import Layout from "app/core/layouts/Layout"
import {
  BlitzPage,
  Head,
  Image,
  Link,
} from "blitz"

const Home: BlitzPage = () => (
  <>
    <Head>
      <title>Blitzerplate - Homepage</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex-grow mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 pb-24">
      <div className="container mx-auto flex flex-col justify-center lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl">
            I like <span className="text-indigo-600">cool</span> buildings and landscapes
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            And this is my collection on all I could found.
          </p>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link href="/posts">
              <a className="px-8 py-3 text-md font-semibold rounded bg-indigo-600 text-white">
                Explore posts
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Image width="800" height="450" src="https://blush.design/api/download?shareUri=SNdyZe28c&w=800&fm=png" alt="Blush Image" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
        </div>
      </div>
    </main>
  </>
)

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Blitzerplate - Homepage">{page}</Layout>

export default Home
