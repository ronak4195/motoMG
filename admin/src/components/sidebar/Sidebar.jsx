import React from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'
import add from '../../assets/icon/shoppingbagblack.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addProduct'} style={{textDecoration:"none"}}>
            <div className="sidebaritem">
                <img src={add}  alt="" />
                <p>Add Product</p>
            </div>
        </Link>

        <Link to={'/allproducts'} style={{textDecoration:"none"}}>
            <div className="sidebaritem">
                <img src={add}  alt="" />
                <p>All Product</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar