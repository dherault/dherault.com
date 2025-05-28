import { type MouseEvent, type PropsWithChildren, useEffect, useState } from 'react'
import { Link } from 'react-router'
import GitHubButton from 'react-github-btn'

import type { SceneProps } from '../types'
import AppearingText from '../components/AppearingText'
import KoshSnowflake from '../components/KoshSnowflake'

function Scene2({ goTo, color }: SceneProps) {

  function handleGoBackClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/1')
  }

  function handleContinueClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/3')
  }

  return (
    <div className="scene">

      <KoshSnowflake color={color} />
      <header className="card space-y-2">
        <AppearingText className="mb-2">
          <h2 className="mt-2">
            I
            <span
              role="img"
              aria-label="love"
              className="mx-1.5"
            >
              ❤️
            </span>
            open-source software
          </h2>
        </AppearingText>
        <Repository
          name="Serverless-offline"
          url="https://github.com/dherault/serverless-offline"
        >
          A AWS API Gateway and Lambda emulator to speed up local develoment cycles.
          <br />
          More than 250 contributors!
        </Repository>
        <Repository
          name="Semantic GraphQL"
          url="https://github.com/dherault/semantic-graphql"
        >
          A RDFS/OWL ontology to GraphQL schema converter, great for exploring semantic data!
        </Repository>
        <Repository
          name="GraphQL-js"
          url="https://github.com/graphql/graphql-js"
        >
          I contributed by making the type resolvers asynchronous. Useful when you are manipulating resources without knowing their type in the first hand.
        </Repository>
        <Repository
          name="Pix"
          url="https://github.com/1024pix/pix"
        >
          A French government app to assert student and civil servants' computer skills. Made by a dream team.
        </Repository>
        <Repository
          name="React-apple-emojis"
          url="https://github.com/dherault/react-apple-emojis"
        >
          A React component to display Apple emojis. Used in this very website!
        </Repository>
        <Repository
          name="Aquarelle"
          url="https://github.com/dherault/aquarelle"
        >
          A random profile pictures generator with a sense of art.
        </Repository>
      </header>
      <article className="card">
        <AppearingText>
          Fractals can be a bit surprising.
        </AppearingText>
        <AppearingText className="mt-2">
          Try to zoom in. Why does it de-zoom at some point?
        </AppearingText>
        <AppearingText className="mt-2">
          How can computers prevent underflow while rendering fractals, i.e. handling numbers that are too low for their processor to handle?
        </AppearingText>
        <AppearingText className="mt-2">
          Response is in
          <a
            href="https://github.com/dherault/dherault.com/blob/1260cc36d32a057c5cb4d837b734f3b728b4522f/dherault.com/src/components/KoshSnowflake/handleCanvas.ts#L186"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1"
          >
            the code
          </a>
          .
        </AppearingText>
        <div className="x5b w100 mt-4">
          <AppearingText>
            <Link
              to="/1"
              onClick={handleGoBackClick}
            >
              Go back
            </Link>
          </AppearingText>
          <AppearingText>
            <Link
              to="/3"
              onClick={handleContinueClick}
            >
              Continue
            </Link>
          </AppearingText>
        </div>
      </article>
    </div>
  )
}

type RepositoryProps = PropsWithChildren<{
  name: string
  url: string
}>

function Repository({ name, url, children }: RepositoryProps) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 0)
  }, [])

  return (
    <>
      <div className="mt-2 x2b w100">
        <AppearingText>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>
              {name}
            </strong>
          </a>
        </AppearingText>
        <div
          className="github-button-wrapper"
          style={{ opacity }}
        >
          <GitHubButton
            href={url}
            data-icon="octicon-star"
            data-show-count="true"
            aria-label={`Star ${name} on GitHub`}
          >
            Star
          </GitHubButton>
        </div>
      </div>
      <div className="-mt-2 mobile-margin-top-fix">
        <AppearingText>
          {children}
        </AppearingText>
      </div>
    </>
  )
}

export default Scene2
