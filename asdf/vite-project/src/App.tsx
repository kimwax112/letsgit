import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './component/Header'
import { Sidebar } from './component/Sidebar'
import { ProductCard } from './component/ProductCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Sidebar />
      <ProductCard />
    </>
  )
}

export default App
