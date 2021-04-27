import "app/core/styles/index.css"

import LoginForm from "app/auth/components/LoginForm"
import Layout from "app/core/layouts/Layout"
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from "blitz"
import {ErrorBoundary} from "react-error-boundary"

export default function App({Component, pageProps}: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({error, resetErrorBoundary}: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <Layout>
        <div className="flex-grow container mx-auto mt-12 pb-24">
          <LoginForm onSuccess={resetErrorBoundary} />
        </div>
      </Layout>
    )
  } else if (error instanceof AuthorizationError) {
    return <ErrorComponent statusCode={error.statusCode} title="BlitzBlog - Unauthorized" />
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
