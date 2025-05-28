import { type MouseEvent, useState } from 'react'
import { Link } from 'react-router'

import type { SceneProps } from '../types'
import AppearingText from '../components/AppearingText'
import HilbertCurve from '../components/HilbertCurve'

const minDegree = 1
const maxDegree = 6

function Scene4({ goTo, color }: SceneProps) {
  const [degree, setDegree] = useState(4)

  function handleDegreeChange(delta: number) {
    return () => setDegree(Math.min(maxDegree, Math.max(minDegree, degree + delta)))
  }

  function handleGoBackClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/3')
  }

  function handleContinueClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/5')
  }

  return (
    <div className="scene">
      <HilbertCurve
        degree={degree}
        color={color}
      />
      <header className="card">
        <AppearingText color={color}>
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
          name="Linkedin"
          url="https://www.linkedin.com/in/dherault"
          icon="fa-linkedin"
        />
        <SocialMedia
          name="Facebook"
          url="https://www.facebook.com/dherault"
          icon="fa-facebook"
        />
      </header>
      <section className="card x5b gap-4 py-4! max-w-[350px]!">
        <button
          type="button"
          onClick={handleDegreeChange(-1)}
          disabled={degree === minDegree}
          className="button-purple"
        >
          Decrease degree
        </button>
        <button
          type="button"
          onClick={handleDegreeChange(1)}
          disabled={degree === maxDegree}
          className="button-purple"
        >
          Increase degree
        </button>
      </section>
      <article className="card">
        <AppearingText>
          Filling space with a curve can be quite a challenge.
        </AppearingText>
        <AppearingText className="mt-2">
          A manifold can be used to flatten a 2D space into a line.
        </AppearingText>
        <AppearingText className="mt-2">
          Going through life can be quite challenging too. Do you have a plan?
        </AppearingText>
        <div className="x5b w100 mt-4">
          <AppearingText>
            <Link
              to="/3"
              onClick={handleGoBackClick}
            >
              Go back
            </Link>
          </AppearingText>
          <AppearingText>
            <Link
              to="/1"
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

type SocialMediaProps = {
  name: string
  url: string
  icon: string
}

function SocialMedia({ name, url, icon }: SocialMediaProps) {
  return (
    <AppearingText className="mt-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="x4 SocialMedia-link"
      >
        <div className="w-5">
          <i className={`fab ${icon}`} />
        </div>
        <strong className="ml-2">
          {name}
        </strong>
      </a>
    </AppearingText>
  )
}

export default Scene4
