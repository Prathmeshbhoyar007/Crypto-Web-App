import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { FaBitcoinSign } from 'react-icons/fa6'

const Header = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <h1>CryptoWeb</h1>
        <FaBitcoinSign color='red' size={"25"}/>
      </div>
      <ul>
          <li> <Link to='/'>Home</Link> </li>
          <li> <Link to='/coins'>Coins</Link> </li>
      </ul>
      
    </div>
  )
}

export default Header
