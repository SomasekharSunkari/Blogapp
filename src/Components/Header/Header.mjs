import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className='header'>
    <a href='#'>My Blog</a>
    <div className='auth'>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>

  </header>
  )
}

export default Header
