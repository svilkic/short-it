import { useState } from 'react'
import './Popup.css'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  return (
    <main>
      <h3>Short It!</h3>
      <h6>v 1.0.0</h6>
    </main>
  )
}

export default App
