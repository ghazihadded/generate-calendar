import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllProfByLevel } from '../services/adminServices'
import { Grid  } from '@mui/material';
import ClassList from '../component/ClassList'

function ProfByLevel() {

  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  const {professeurs}=useSelector(state=>state.professeurs)

  useEffect(()=>{
    setLoading(true)
  dispatch(getAllProfByLevel()).then(res=>setLoading(false))
  },[dispatch])


  


  return (
    <>
  {loading?(
    <p>loading...</p>
  ):(
    professeurs.length>0?
    <Grid container spacing={2}>
    {professeurs.map((prof)=> (
      <Grid item xs={6} key={prof._id}>
      <ClassList title={prof.name} speciality={prof.speciality} user={true} />
      </Grid>
      ))}
    </Grid>
    :
    <p>you don't have any professeur</p>
  )}
    </>
  )
}

export default ProfByLevel
