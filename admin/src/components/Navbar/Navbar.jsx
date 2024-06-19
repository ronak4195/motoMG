import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/navlogo.svg'
import navProfile from '../../assets/navprofile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      
      <img src={navlogo} alt="" className='navprofile'/>
      <img src={navProfile} alt="" className='navlogo'/>
    </div>
  )
}

export default Navbar