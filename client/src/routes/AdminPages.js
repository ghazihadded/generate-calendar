import React from 'react'
import {  Outlet,Navigate } from 'react-router-dom'
import LayoutAdmin from '../component/LayoutAdmin'
import jwt_decode from "jwt-decode";

function AdminPages({role}) {

  const token=localStorage.getItem('token')

  const user = jwt_decode(token);


 if(user && user?.role!==role){
  localStorage.removeItem('token')
 return <Navigate to="/login" />
 }

  return (
    <LayoutAdmin>
    <Outlet />
    </LayoutAdmin>
  )
}

export default AdminPages
