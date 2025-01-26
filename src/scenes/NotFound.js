import { Link } from 'react-router'

function NotFound() {
  return (
    <div className="NotFound y5">
      <h1>
        Not Found
      </h1>
      <div className="mt-5">
        You should go to
        <Link to="/">Home</Link>
        .
      </div>
    </div>
  )
}

export default NotFound
