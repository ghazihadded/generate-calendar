import React, {useState,useEffect} from 'react';
import ClassList from '../component/ClassList';
import {useDispatch,useSelector} from "react-redux"
import { Grid  } from '@mui/material';
import { getAllGroupeByGroupe } from '../services/adminServices';

function StudentGroupe() {

    const [loading,setLoading]=useState(false)

    const dispatch=useDispatch()
  const {groupes}=useSelector(state=>state.groupes)

  useEffect(()=>{
    setLoading(true)
    dispatch(getAllGroupeByGroupe()).then(r=>setLoading(false))
  },[dispatch])



  return (
    <>
   {
      loading?(
        <p>wait...</p>
      ):(
        <Grid container spacing={2}>
        {groupes.map((card) =>(
        <Grid item xs={6} key={card._id}>
       <ClassList  card={card} title={`groupe-${card.number}`} user={true} />
       </Grid>
              )
              )}
       </Grid>
      )
}    
    </>
  )
}

export default StudentGroupe
