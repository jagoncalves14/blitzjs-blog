import { AppProps } from "blitz"
import "../../public/styles/global.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
