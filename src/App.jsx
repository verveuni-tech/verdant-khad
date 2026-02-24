import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer'

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Navbar/>
   <Home/>
   <Footer/>
    </div>
  )
}

export default App
