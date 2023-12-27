import React from 'react'
import Sidebar from './Sidebar'
import './Sidebar.css'
import './Home.css'

const Home = () => {
  return (
    <div>
      <div className='home'>
        <Sidebar />
      </div>
      <div className='box'>
        <div className='inner-box'>
          December Expenses
        </div>
      </div>
    </div>
  )
}

export default Home
