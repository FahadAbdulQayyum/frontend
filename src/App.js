import React from 'react'
import Sign from './components/sign'
import Register from './components/register'
import Home from './components/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/register' exact Component={Register} />
          <Route path='/login' exact Component={Sign} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
