import React from 'react'
import {  Outlet } from 'react-router-dom'
import LayoutAdmin from '../component/LayoutAdmin'


function AdminPages() {
  return (
    <LayoutAdmin>
    <Outlet />
    </LayoutAdmin>
  )
}

export default AdminPages
