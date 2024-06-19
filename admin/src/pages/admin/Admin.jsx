import React from 'react'
import './admin.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import AllProduct from '../../components/AllProduct/AllProduct'

const admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addProduct' element={<AddProduct/>}/>
        <Route path='/allproducts' element={<AllProduct/>}/>
      </Routes>
    </div>
  )
}

export default admin