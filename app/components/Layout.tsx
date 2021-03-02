import Head from "next/head"
import Navigation from "./Navigation"

type Props = {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>

      <nav>
        <Navigation />
      </nav>

      <main>{children}</main>

      <style jsx>
        {`
          .root {
            display: flex;
            flex-flow: column wrap;
          }

          nav {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 20px 0;
            margin: 0;
          }

          .navigation-link {
            max-width: 30px;
          }

          main {
            display: flex;
            flex-flow: column wrap;
            width: 100%;
            margin: 0;
          }

          section {
            padding: 30px 0;
          }
        `}
      </style>
    </div>
  )
}
