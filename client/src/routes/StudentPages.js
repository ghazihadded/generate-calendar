import React from 'react'
import {  Outlet,Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import StudentLayout from '../component/StudentLayout';

function StudentPages({role}) {

  const token=localStorage.getItem('token')

  const user = jwt_decode(token);

  if(user && user?.role!==role){
    localStorage.removeItem('token')
   return <Navigate to="/login" />
   }

  return (
    <StudentLayout>
    <Outlet />
    </StudentLayout>
  )
}

export default StudentPages
