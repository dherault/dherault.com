import './index.css'

import { Emoji } from 'react-apple-emojis'

function BouncingArrow() {
  return (
    <div className="BouncingArrow">
      <Emoji
        name="backhand-index-pointing-right"
        width={24}
        className="BouncingArrow-arrow"
      />
    </div>
  )
}

export default BouncingArrow
