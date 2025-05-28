import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import 'flexpad/dist/flexpad.min.css'
import App from './App'
import './firebase'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
