import { type MouseEvent } from 'react'
import { Link } from 'react-router'

import type { SceneProps } from '../types'
import AppearingText from '../components/AppearingText'
import CirclesDance from '../components/CirclesDance'

function Scene3({ goTo, color }: SceneProps) {

  function handleGoBackClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/2')
  }

  function handleContinueClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/4')
  }

  return (
    <div className="scene">

      <CirclesDance color={color} />
      <header className="card">
        <AppearingText color={color}>
          <h1>
            Hobbies
          </h1>
        </AppearingText>
        <AppearingText className="mt-2">
          <strong>Learning</strong>
          <div className="mt-0.5">
            I always find time to learn something new.
            <br />
            Either in my field of work or outside of it.
          </div>
        </AppearingText>
        <AppearingText className="mt-4">
          <strong>Computer programming</strong>
          <div className="mt-0.5">
            Mostly TypeScript and Unity C#.
            <br />
            Especially complex visualisations and pieces of art.
          </div>
        </AppearingText>
        <AppearingText className="mt-4">
          <strong>Go game</strong>
          <div className="mt-0.5">
            I would love to play with you online or in a garden on a summer day.
          </div>
        </AppearingText>
        <AppearingText className="mt-4">
          <strong>Cooking</strong>
          <div className="mt-0.5">
            I'm a self-made chef :). Plus I'm French so it helps.
          </div>
        </AppearingText>
      </header>
      <article className="card">
        <AppearingText>
          This world is constantly vibrating. Hence, circles are in everything.
        </AppearingText>
        <AppearingText className="mt-2">
          Can you see the beauty of it?
        </AppearingText>
        <AppearingText className="mt-2">
          A
          <a
            href="https://en.wikipedia.org/wiki/Fourier_series"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1"
          >
            Fourrier serie
          </a>
          is an weighted summation of harmonically related sinudoids.
        </AppearingText>
        <div className="x5b w100 mt-4">
          <AppearingText>
            <Link
              to="/2"
              onClick={handleGoBackClick}
            >
              Go back
            </Link>
          </AppearingText>
          <AppearingText>
            <Link
              to="/4"
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

export default Scene3
