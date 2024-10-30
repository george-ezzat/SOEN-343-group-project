import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import logo from './Images/Logo.webp'

function Navbar () {
  return (
    <nav className='navbar'>
      <Link to='/' className='navTitleName'><img src={logo} alt='' /></Link>
      <button className='contactus'>
        Contact Us
      </button>
      <button className='LogBtn'>
        log In
      </button>
      <button className='SignBtn'>
        Sign in
      </button>
    </nav>

  )
}

export default Navbar