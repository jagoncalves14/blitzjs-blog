import logout from "app/auth/mutations/logout"
import trackView from "app/users/mutations/trackView"
import getUser from "app/users/queries/getUser"
import {
  Head,
  invoke,
  Link,
  useMutation,
  useQuery,
  useRouter,
  useRouterQuery,
  useSession,
} from "blitz"
import {Suspense} from "react"

export default function Layout({title, className, children}: {title?: string; className?: string; children: React.ReactNode}) {
  const session = useSession({suspense: false})
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const isLoginPage = router.pathname === '/login'
  const isSignUpPage = router.pathname === '/signup'


  const CurrentUserInfo = () => {
    const session = useSession()
    const [currentUser] = useQuery(getUser, {where: {id: session.userId!}})

    return <pre>{JSON.stringify(currentUser, null, 2)}</pre>
  }

  const UserStuff = () => {
    const session = useSession()
    const query = useRouterQuery()
    const [trackViewMutation] = useMutation(trackView)

    return (
      <>
        {!session.userId && (
        <>
            {!isSignUpPage && (
              <Link href="/signup"><a className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</a></Link>
            )}
            {!isLoginPage && (
              <Link href="/login"><a className="font-medium text-indigo-600 hover:text-indigo-500">Login</a></Link>
            )}
            <div className="flex mt-8">
              {query.authError && <div style={{color: "red"}}>{query.authError}</div>}
            </div>
          </>
        )}
        {session.userId && (
          <button
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={async () => {
              router.push("/")
              await logoutMutation()
            }}
          >
            Logout
          </button>
        )}
{/*
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <Suspense fallback="Loading...">
          <CurrentUserInfo />
        </Suspense>
        <button
          onClick={async () => {
            try {
              const user = await invoke(getUser, {where: {id: session.userId as number}})
              alert(JSON.stringify(user))
            } catch (error) {
              alert("error: " + JSON.stringify(error))
            }
          }}
        >
          Get user
        </button>
        <button
          onClick={async () => {
            try {
              await trackViewMutation()
            } catch (error) {
              alert("error: " + error)
              console.log(error)
            }
          }}
        >
          Track view
        </button> */}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{title || "__name__"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="container mx-auto">
          <nav className="flex justify-between sm:px-6 py-6">
            <Link href="/">
              <a className="inline-flex justify-center space-x-3 md:justify-start mb-auto">
                <img className="inline h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Blitzerplate logo" />
                <span className="self-center text-2xl font-bold">Blitzerplate</span>
              </a>
            </Link>

            <div className="md:space-x-8">
              <Link href="/posts">
                <a className="font-medium text-gray-500 hover:text-gray-900">Posts</a>
              </Link>

              {/* <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Features</a>

              <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Marketplace</a>

              <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Company</a> */}

              <Suspense fallback={"Loading..."}>
                <UserStuff />
              </Suspense>
            </div>
          </nav>
        </div>
      </header>

      <>
        {children}
      </>

      <footer className="border-t bg-gray-900 text-gray-100 border-gray-700">
        <div className="container mx-auto space-y-6">
          <div className="px-12 pt-12 space-y-8 md:flex md:justify-between md:px-6 md:space-y-0">
            <div className="flex flex-col my-6 space-y-6 md:m-0">
              <Link href="/">
                <a className="inline-flex justify-center space-x-3 md:justify-start">
                  <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-white.svg" alt="Blitzerplate logo in white" />
                  <span className="self-center text-2xl font-bold">Blitzerplate</span>
                </a>
              </Link>
              <p className="text-center md:max-w-sm md:text-left text-gray-400">
                Always searching for the neatest buildings. This is actually just a random boilerplate for using BlitzJS.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:space-x-8">
              <div className="p-6 md:py-0">
                <p className="pb-2 text-lg font-medium">Quick links</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><a className="hover:text-gray-400" href="/components">Components</a></li>
                  <li><a className="hover:text-gray-400" href="/templates">Templates</a></li>
                </ul>
              </div>
              <div className="p-6 md:py-0 md:pr-0">
                <p className="pb-2 text-lg font-medium">Resources</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><a className="hover:text-gray-400" href="/docs">Documentation</a></li>
                  <li><a className="hover:text-gray-400" href="/docs/credits">Credits</a></li>
                  <li><a className="hover:text-gray-400" href="/contact">Contact us</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center justify-between p-6 text-center sm:flex-row">
            <p className="mt-3 sm:mt-0">© 2021 All rights reserved.</p>

            <div className="flex space-x-4">
              <a aria-label="Write me an email" href="mailto:jagoncalves@outlook.pt" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-indigo-600 text-white hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"> <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path> <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path> </svg>
              </a>
              <a aria-label="Contact via Twitter" href="https://twitter.com/jagoncalves14" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-indigo-600 text-white hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor" className="w-5 h-5"> <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"> </path> </svg>
              </a>
              <a aria-label="See the code in GitHub" href="https://github.com/jagoncalves14" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-indigo-600 text-white hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"> <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"> </path> </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
