import { type MouseEvent, useState } from 'react'
import { Link } from 'react-router'

import type { PolyhedronsMode, SceneProps } from '../types'
import AppearingText from '../components/AppearingText'
import Polyhedrons from '../components/Polyhedrons'

function Scene5({ goTo, color }: SceneProps) {
  const [mode, setMode] = useState<PolyhedronsMode>('dance')

  function handleGoBackClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/4')
  }

  function handleStartOverClick(event: MouseEvent) {
    event.preventDefault()
    goTo('/1')
  }

  return (
    <div className="scene">

      <Polyhedrons
        mode={mode}
        color={color}
      />
      <header className="card">
        <AppearingText
          color={color}
          className="pb-1 leading-9"
        >
          <h1>
            I'm actively looking for opportunities
          </h1>
        </AppearingText>
        <AppearingText className="mt-2">
          I can solve
          {' '}
          <em>any</em>
          {' '}
          JavaScript challenge for your company.
        </AppearingText>
        <AppearingText className="mt-2">
          I specialize in Node.js, ReactJS, and visualizations.
        </AppearingText>
        {/* <AppearingText className="mt-1">
          <a
            href="https://www.toptal.com/resume/david-herault"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hire me!
          </a>
        </AppearingText> */}
      </header>
      <section className="card y8s card-polyhedrons space-y-0.5">
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
          className="button-indigo mt-1"
        >
          Hexahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('tetrahedron')}
          className="button-indigo mt-1"
        >
          Tetrahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('octahedron')}
          className="button-indigo mt-1"
        >
          Octahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('icosahedron')}
          className="button-indigo mt-1"
        >
          Icosahedron
        </button>
        <button
          type="button"
          onClick={() => setMode('dodecahedron')}
          className="button-indigo mt-1"
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
        <div className="x5b w-full mt-4 gap-2">
          <AppearingText>
            <Link
              to="/3"
              onClick={handleGoBackClick}
            >
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
            <Link
              to="/1"
              onClick={handleStartOverClick}
            >
              Start over
            </Link>
          </AppearingText>
        </div>
      </article>
    </div>
  )
}

export default Scene5
