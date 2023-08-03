import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GitHubButton from 'react-github-btn'

import KoshSnowflake from '../components/KoshSnowflake'
import AppearingText from '../components/AppearingText'

function Scene2({ goTo, color }) {

  function handleGoBackClick(event) {
    event.preventDefault()
    goTo('/1')
  }

  function handleContinueClick(event) {
    event.preventDefault()
    goTo('/3')
  }

  return (
    <div className="Scene">

      <KoshSnowflake color={color} />
      <header className="card">
        <AppearingText>
          <h1>
            I
            <span
              role="img"
              aria-label="love"
              className="mx-1"
            >
              ❤️
            </span>
            open-source software
          </h1>
        </AppearingText>
        <AppearingText
          color={color}
          className="mt-3 mb-2"
        >
          <h2>
            Here are a few of my contributions:
          </h2>
        </AppearingText>
        <Repository
          name="Serverless-offline"
          url="https://github.com/dherault/serverless-offline"
        >
          A AWS API Gateway and Lambda emulator to speed up local develoment cycles.
          <br />
          More than 160 contributors!
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
          name="Flexpad"
          url="https://github.com/dherault/flexpad"
        >
          A CSS utility to easily create any flexbox layout.
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
          <br />
          Try to zoom in.
          <br />
          Why does it de-zoom at some point?
        </AppearingText>
        <AppearingText className="mt-2">
          How can computers prevent underflow while rendering fractals, i.e. handling numbers that are too low for their processor to handle?
          <br />
          Response is in
          <a
            href="https://github.com/dherault/dherault.com/blob/master/src/components/KoshSnowflake/handleCanvas.js#L172"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-0h"
          >
            the code
          </a>
          .
        </AppearingText>
        <div className="x5b w100 mt-3">
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

function Repository({ name, url, children }) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 0)
  }, [])

  return (
    <>
      <div className="mt-3 x2b w100">
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
      <div className="mt-2 mobile-margin-top-fix">
        <AppearingText>
          {children}
        </AppearingText>
      </div>
    </>
  )
}

export default Scene2
