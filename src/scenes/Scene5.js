import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Polyhedrons from '../components/Polyhedrons'
import AppearingText from '../components/AppearingText'

function Scene5({ goTo, color }) {
  const [mode, setMode] = useState('dance')

  function handleGoBackClick(event) {
    event.preventDefault()
    goTo('/4')
  }

  function handleStartOverClick(event) {
    event.preventDefault()
    goTo('/1')
  }

  return (
    <div className="Scene">

      <Polyhedrons mode={mode} color={color} />

      <header className="card">
        <AppearingText color={color}>
          <h1>
            I'm actively looking for jobs
          </h1>
        </AppearingText>
        <AppearingText className="mt-3">
          I can solve <em>any</em> JavaScript challenge for your company.
        </AppearingText>
        <AppearingText className="mt-2">
          I specialize in Node.js, ReactJS, React Native, DevOps and more.
        </AppearingText>
        <AppearingText className="mt-2">
          <a
            href="https://www.toptal.com/resume/david-herault"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hire me!
          </a>
        </AppearingText>
      </header>

      <section className="card y8s">
        <button
          type="button"
          onClick={() => setMode('dance')}
          className="button-indigo"
        >
          Dance
        </button>
        <button
          type="button"
          onClick={() => setMode('hexahedron')}
          className="button-indigo mt-2"
        >
          Hexahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('tetrahedron')}
          className="button-indigo mt-2"
        >
          Tetrahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('octahedron')}
          className="button-indigo mt-2"
        >
          Octahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('icosahedron')}
          className="button-indigo mt-2"
        >
          Icosahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('dodecahedron')}
          className="button-indigo mt-2"
        >
          Dodecahedron
        </button>
      </section>

      <article className="card">
        <AppearingText>
          Regular polyhedrons are the jewels of 3D geometry.
        </AppearingText>
        <AppearingText className="mt-2">
          Symetries are one of the building blocks of creation. They are divine, cost-friendly and beautiful.
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

export default Scene5
