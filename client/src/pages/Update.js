import React, { useEffect } from 'react'
import { useLocation,useParams  } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Inputs from '../component/Inputs';
import { Formik} from "formik";
import { useState  } from 'react';
import { addToGroupe, getUser, updateUser } from '../services/adminServices';
import { useDispatch, useSelector } from 'react-redux';
import AlertNotif from '../component/AlertNotif';
import { Typography, IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material'





function Update(student) {
      
    const [loading,setLoading]=useState(false)
    const [open, setOpen] = useState(false);
    const [type,setType]=useState(null)
    const [message, setMessage] = useState("");
    const [loadingUpdate,setLoadingUpdate]=useState(false)
  
    let location = useLocation();
    let { id } = useParams();
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.users)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

   


useEffect(()=>{
  setLoading(true)
  dispatch(getUser(location?.pathname?.split("/")[1],id)).then(res=>setLoading(false))

},[location,id,dispatch])




const onChangeUser=(values)=>{
  setLoadingUpdate(true)
 dispatch(updateUser(location?.pathname?.split("/")[1],id,values)).then(res=>{
  if(res?.status===false){
    setMessage(res.message)
    setOpen(true);
    setType("error")
    setLoadingUpdate(false)
  }else if(res?.status===true){
    setMessage("success update")
    setOpen(true);
    setType("success")
    setLoadingUpdate(false)
  }
 })
}


const onAddToGroupe=()=>{
dispatch(addToGroupe(id)).then(res=>{
  if(res?.status===false){
    setMessage(res.message)
    setOpen(true);
    setType("error")
    setLoadingUpdate(false)
  }else if(res?.status===true){
    setMessage(res.message)
    setOpen(true);
    setType("success")
    setLoadingUpdate(false)
  }
})
}

    return (
        <>   
        
         { loading? (
           <p>loading ...</p>
         ):(
          <>
          {location?.pathname?.split("/")[1]==="student" && <>
            <Box display="flex" alignItems="center">
      <Typography variant="body1">
        Add this student to a group
      </Typography>
       <IconButton color="primary" onClick={onAddToGroupe}>
        <AddCircleOutline />
      </IconButton> 
    </Box>
          
          </>}
          <AlertNotif message={message} open={open} handleClose={handleClose} type={type}/>
           <Formik
           enableReinitialize={false}
           initialValues={{
             email:user?user?.email: "",
             name:user?user?.name: "",
           }}
           
           onSubmit={values => {
             onChangeUser(values)
           }}
         >
       
           {(formik) => {
             const { handleSubmit, handleChange,values} = formik;
       
             return (
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
               <Inputs field={"email"} label={"Email Address"} handleChange={handleChange} value={values} />
               <Inputs field={"name"} label={"name"} handleChange={handleChange} value={values} />
               <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loadingUpdate}
                  >
                    update
                  </Button>
               </Box>
             )
           }}
           </Formik>
           </>
         )}
         </>
     
       )
}

export default Update
