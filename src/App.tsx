import { useState, useEffect } from 'react'
import './styles/main.scss'
import Preloader from './components/UI/Preloader'
import MainApp from './components/MainApp'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for preloader
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      {isLoading ? <Preloader /> : <MainApp />}
    </div>
  )
}

export default App 