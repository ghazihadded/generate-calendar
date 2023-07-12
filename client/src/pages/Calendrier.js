import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAllGroueClass,deleteAllGroueClass,getAllGroueClass } from "../services/adminServices";
import AlertNotif from "../component/AlertNotif";
import Calendar from "../component/Calendar";

const Calendrier = () => {
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type,setType]=useState(null)
  const dispatch = useDispatch();
  const { groupeClasse } = useSelector((state) => state.groupeClasses);

  


  useEffect(()=>{
    setLoading(true)
   dispatch(getAllGroueClass()).then(r=>{
    setLoading(false)
   })
  },[dispatch])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

 

  const create = () => {
    setLoadingCreate(true);
    dispatch(createAllGroueClass()).then((res) => {
      setLoadingCreate(false);
    });
  };

  const onDelete=()=>{
    dispatch(deleteAllGroueClass()).then(res=>{
      console.log(res)
      if(res===false){
        setMessage("failed delete")
        setOpen(true);
        setType("error")
      }
    })
  }

  console.log(groupeClasse)

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
        <AlertNotif message={message} open={open} handleClose={handleClose} type={type} />
          <Box display="flex" justifyContent="center" marginTop="2rem">
            {groupeClasse && groupeClasse?.length===0?
             <Button variant="contained" color="primary" onClick={create} style={{ marginRight: '1rem' }}>
             Generate Calendar
           </Button>
           :
           <Button variant="contained" color="primary" onClick={onDelete}>
           Delete Calendar
         </Button>
           }
          
          </Box>
          {loadingCreate?
        <p>loading...</p>
        :
          <Calendar  groupeClasse={groupeClasse} />
        }
          
        </>
      )}
    </>
  );
};

export default Calendrier;
