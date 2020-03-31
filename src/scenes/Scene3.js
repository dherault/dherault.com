import React from 'react'
import { Link } from 'react-router-dom'

import CirclesDance from '../components/CirclesDance'
import AppearingText from '../components/AppearingText'

function Scene3({ goTo }) {

  function handleGoBackClick(event) {
    event.preventDefault()
    goTo('/2')
  }

  function handleContinueClick(event) {
    event.preventDefault()
    goTo('/4')
  }

  return (
    <div className="Scene">

      <CirclesDance />

      <header className="card">
        <AppearingText color="#c6ff00">
          <h1>
            Hobbies
          </h1>
        </AppearingText>
        <AppearingText className="mt-3">
          <strong>• Learning</strong>
          <div className="mt-1">
            I take one hour a day to learn something new. Either in my field of work or outside of it.
          </div>
        </AppearingText>
        <AppearingText className="mt-3">
          <strong>• Computer programming</strong>
          <div className="mt-1">
            JavaScript, C++, C# (unity) and Python.
            <br />
            Especially complex visualisations and pieces of art.
          </div>
        </AppearingText>
        <AppearingText className="mt-3">
          <strong>• Go game</strong>
          <div className="mt-1">
            I would love to play with you online or in a garden on a summer day.
          </div>
        </AppearingText>
        <AppearingText className="mt-3">
          <strong>• Cooking</strong>
          <div className="mt-1">
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
          A <a href="https://en.wikipedia.org/wiki/Fourier_series" target="_blank" rel="noopener noreferrer">Fourrier serie </a> is an weighted summation of harmonically related sinudoids.
        </AppearingText>
        <div className="x5b w100 mt-3">
          <AppearingText>
            <Link to="/2" onClick={handleGoBackClick}>
              Go back
            </Link>
          </AppearingText>
          <AppearingText>
            <Link to="/4" onClick={handleContinueClick}>
              Continue
            </Link>
          </AppearingText>
        </div>
      </article>
    </div>
  )
}

export default Scene3
