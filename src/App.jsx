import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // React router import
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Form from './pages/Form'
import List from './pages/List'
import CountrySearch from './pages/CountrySearch'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

      <NavBar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/form' element={<Form />}></Route>
        <Route path='/list' element={<List />}></Route>
        <Route path='/countrySearch' element={<CountrySearch />}></Route>
        <Route path='/*' element={<Home />}></Route>
      </Routes>
    </Router>
  )
}

export default App
