import React from 'react'
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"


const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md '>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to="/">
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Soriic</span>
          </h1>
        </Link>
        {/* <form className='bg-slate-100 p-3 rounded-lg items-center flex'>
          <input type='search' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className="text-slate-600 ms-2" />
        </form> */}
        <ul className='flex gap-4'>
          <Link to="/">
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
          </Link>
          <Link to="/about">
          <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
        </Link>
        <Link to="/login">
        <li className=' text-slate-700 hover:underline cursor-pointer'>Login</li>
      </Link>
    </ul>
      </div >
    </header >
  )
}

export default Header