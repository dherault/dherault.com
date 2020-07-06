import React from 'react'
import { Link } from 'react-router-dom'

import FlockOfBirds from '../components/FlockOfBirds'
import AppearingText from '../components/AppearingText'

function Scene1({ goTo }) {
  function handleContinueClick(event) {
    event.preventDefault()
    goTo('/2')
  }

  return (
    <div className="Scene">

      <FlockOfBirds />

      <header className="card">
        <AppearingText>
          <h1>
            David Hérault
          </h1>
        </AppearingText>
        <AppearingText color="#2196f3" className="mt-2">
          <h2>
            JavaScript architect
          </h2>
        </AppearingText>
        <AppearingText color="#2196f3" className="mt-2">
          <h2>
            dherault@gmail.com
          </h2>
        </AppearingText>
        <AppearingText color="#2196f3" className="mt-2">
          <h2>
            +33 666 000 577
          </h2>
        </AppearingText>
      </header>

      <article className="card">
        <AppearingText>
          Birds fly in flocks, they tend to follow the bird in front of them.
        </AppearingText>
        <AppearingText className="mt-2">
          Can you see the pattern?
        </AppearingText>
        <AppearingText className="mt-2">
          Leading and following are not fixed states of mind.
        </AppearingText>
        <AppearingText className="mt-2">
          You must be versatile like a bird.
        </AppearingText>
        <div className="x6 w100 mt-3">
          <AppearingText>
            <Link to="/2" onClick={handleContinueClick}>
              Continue
            </Link>
          </AppearingText>
        </div>
      </article>

    </div>
  )
}

export default Scene1
