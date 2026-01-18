import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </>
  )
}

export default App
