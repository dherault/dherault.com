import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

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
        <div className="mt-2">
          <AppearingText color="#2196f3">
            <h2>
              JavaScript developper
            </h2>
          </AppearingText>
        </div>
        <div className="mt-2">
          <AppearingText color="#2196f3">
            <h2>
              dherault@gmail.com
            </h2>
          </AppearingText>
        </div>
        <div className="mt-2">
          <AppearingText color="#2196f3">
            <h2>
            +33 666 000 577
            </h2>
          </AppearingText>
        </div>
      </header>
      <article className="card">
        <AppearingText>
          Birds fly in flocks: they tend to follow the bird in front of them.
          <div className="mt-1">
            Can you see the pattern?
          </div>
        </AppearingText>
        <div className="x6 w100 mt-3">
          <AppearingText color="#2196f3">
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
