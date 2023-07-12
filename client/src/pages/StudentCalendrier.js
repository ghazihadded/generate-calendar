import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCalendarByGroupe } from "../services/adminServices";
import Calendar from "../component/Calendar";


const StudentCalendrier = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { groupeClasse } = useSelector((state) => state.groupeClasses);




  useEffect(()=>{
    setLoading(true)
   dispatch(getCalendarByGroupe()).then(r=>{
    setLoading(false)
   })
  },[dispatch])

 

  

  





  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
        <Calendar groupeClasse={groupeClasse} />  
        </>
      )}
    </>
  );
};

export default StudentCalendrier;
