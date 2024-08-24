import { Link } from 'react-router-dom'

import FlockOfBirds from '../components/FlockOfBirds'
import AppearingText from '../components/AppearingText'
import BouncingArrow from '../components/BouncingArrow'

function Scene1({ goTo, color }) {
  function handleContinueClick(event) {
    event.preventDefault()
    goTo('/2')
  }

  return (
    <div className="Scene">

      <FlockOfBirds color={color} />
      <header className="card">
        <AppearingText>
          <h1>
            David Hérault
          </h1>
        </AppearingText>
        <AppearingText
          color={color}
          className="mt-2"
        >
          <h2>
            JavaScript Architect Freelancer
          </h2>
        </AppearingText>
        <AppearingText
          color={color}
          className="mt-2"
        >
          <h2>
            dherault@gmail.com
          </h2>
        </AppearingText>
        <AppearingText
          color={color}
          className="mt-2"
        >
          <h2>
            +33 666 000 577
          </h2>
        </AppearingText>
        <AppearingText
          color={color}
          className="mt-2"
        >
          <a
            href="https://blog.dherault.com"
            target="_blank"
            rel="noreferrer"
          >
            <h2 className="hover-underline">
              Blog
            </h2>
          </a>
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
          <div className="mr-1">
            <BouncingArrow />
          </div>
          <AppearingText>
            <Link
              to="/2"
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

export default Scene1
