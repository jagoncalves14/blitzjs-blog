import "app/core/styles/index.css";

import LoginForm from "app/auth/components/LoginForm"
import Layout from "app/core/layouts/Layout";
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorComponent,
  ErrorFallbackProps,
  useRouter,
} from "blitz"
import {ErrorBoundary} from "react-error-boundary"
import {queryCache} from "react-query"

export default function App({Component, pageProps}: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
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
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Blitzerplate - Unauthorized"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
