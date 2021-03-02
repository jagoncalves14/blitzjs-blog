import React from "react"
import Twitter from "public/twitter-alt.svg"
import GitHub from "public/github-alt.svg"
import config from "app/lib/config"

export function SocialList({}) {
  return (
    <div>
      <a
        title="Twitter"
        href={`https://twitter.com/${config.twitter_account}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter width={24} height={24} fill={"#222"} />
      </a>
      <a
        title="GitHub"
        href={`https://github.com/${config.github_account}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub width={24} height={24} fill={"#222"} />
      </a>
      <style jsx>
        {`
          a {
            display: inline-block;
          }
          a:not(:last-child) {
            margin-right: 2em;
          }
        `}
      </style>
    </div>
  )
}
