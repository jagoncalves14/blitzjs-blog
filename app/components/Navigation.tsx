import Link from "next/link"
import { useRouter } from "next/router"
import Burger from "./Burger"
import { useState } from "react"
import classNames from "classnames"

export default function Navigation() {
  const router = useRouter()
  const [active, setActive] = useState(false)
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container " + (active ? "active" : "")}>
        <Link href="/">
          <a className="navigation-link">
            <img src="/icon.png" alt="Logo" />
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/">
              <a
                className={classNames({
                  active: router.pathname === "/",
                })}
              >
                About
              </a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a
                className={classNames({
                  active: router.pathname.startsWith("/posts"),
                })}
              >
                Blog
              </a>
            </Link>
          </li>
        </ul>
        <style jsx>
          {`
            .container {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0 auto;
              max-width: 1200px;
              width: 100%;
              padding: 0 1.5rem;
            }
            .navigation-link img {
              max-width: 50px;
            }
            ul {
              opacity: 0;
              width: 100%;
              height: 100vh;
              text-align: right;
              list-style: none;
              margin: 0;
              padding: 0;
              position: fixed;
              top: 0;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 1;
              transform: translateY(100%);
              transition: opacity 200ms;
            }
            .active ul {
              opacity: 1;
              transform: translateY(0);
            }
            li {
              margin-bottom: 1.75rem;
              font-size: 2rem;
              padding: 0 1.5rem 0 0;
            }
            li:last-child {
              margin-bottom: 0;
            }
            .active {
              color: #222;
            }

            @media (min-width: 769px) {
              .container {
                display: flex;
              }
              ul {
                position: relative;
                opacity: 1;
                top: auto;
                display: inline-flex;
                flex-flow: row wrap;
                width: auto;
                height: auto;
                transform: translateY(0);
              }
              li {
                flex: 0 1 auto;
                font-size: 1rem;
                padding: 0;
                margin: 0 0 0 20px;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
