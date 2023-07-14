import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Hola, Alicia</h1>
        <h2>Calendario</h2>
        <h3>Nombre:</h3><span>soy alicia</span>  
      </div>
    </>
  )
}

export default App
