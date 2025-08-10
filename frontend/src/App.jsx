import React from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'

const App = () => {
  return (
    <div  className=' bg-red-600 p-6'>


<Header/>
      <Outlet/>
      
      
        </div>
  )
}

export default App