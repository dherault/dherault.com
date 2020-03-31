import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import HilbertCurve from '../components/HilbertCurve'
import AppearingText from '../components/AppearingText'

const minDegree = 1
const maxDegree = 6

function Scene3({ goTo }) {
  const [degree, setDegree] = useState(4)

  function handleDegreeChange(delta) {
    return () => setDegree(Math.min(maxDegree, Math.max(minDegree, degree + delta)))
  }

  function handleGoBackClick(event) {
    event.preventDefault()
    goTo('/3')
  }

  function handleStartOverClick(event) {
    event.preventDefault()
    goTo('/1')
  }

  return (
    <div className="Scene">

      <HilbertCurve degree={degree} />

      <header className="card">
        <AppearingText color="#673ab7">
          <h1>
            Social Media
          </h1>
        </AppearingText>
        <SocialMedia
          name="GitHub"
          url="https://github.com/dherault"
          icon="fa-github"
        />
        <SocialMedia
          name="Facebook"
          url="https://www.facebook.com/dherault"
          icon="fa-facebook"
        />
        <SocialMedia
          name="Linkedin"
          url="https://www.linkedin.com/in/dherault"
          icon="fa-linkedin"
        />
      </header>

      <section className="card x5b">
        <button
          type="button"
          onClick={handleDegreeChange(-1)}
          disabled={degree === minDegree}
        >
          Decrease degree
        </button>
        <button
          type="button"
          onClick={handleDegreeChange(1)}
          disabled={degree === maxDegree}
          className="ml-2"
        >
          Increase degree
        </button>
      </section>

      <article className="card">
        <AppearingText>
          Filling space with a curve can be quite a challenge.
        </AppearingText>
        <AppearingText className="mt-2">
          It can be used to flatten a 2D space into a line.
        </AppearingText>
        <AppearingText className="mt-2">
          Going through life can be quite challenging too. Do you have a plan?
        </AppearingText>
        <div className="x5b w100 mt-3">
          <AppearingText>
            <Link to="/3" onClick={handleGoBackClick}>
              Go back
            </Link>
          </AppearingText>
          <AppearingText>
            <a
              href="https://github.com/dherault/dherault.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
          </AppearingText>
          <AppearingText>
            <Link to="/1" onClick={handleStartOverClick}>
              Start over
            </Link>
          </AppearingText>
        </div>
      </article>
    </div>
  )
}

function SocialMedia({ name, url, icon }) {
  return (
    <AppearingText className="mt-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="x4 SocialMedia-link"
      >
        <i className={`fab ${icon}`} />
        <strong className="ml-2">
          {name}
        </strong>
      </a>
    </AppearingText>
  )
}

export default Scene3
