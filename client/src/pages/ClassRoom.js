import React, {useState,useEffect} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Inputs from "../component/Inputs";
import { Grid  } from '@mui/material';
import { Formik } from "formik";
import ClassList from '../component/ClassList';
import {useDispatch,useSelector} from "react-redux"
import { createClasses, deleteClass, getAllClass } from '../services/adminServices';
import AlertNotif from '../component/AlertNotif';
const ClassRoom = () => {
   
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loading,setLoading]=useState(false)
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");

  const dispatch=useDispatch()
  const {classes}=useSelector(state=>state.classes)
 

  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteClass(id)).then(res=>{
      if (res?.status === true) {
        setMessage("success delete");
        setOpen(true);
        setType("success");
      }
    })
   
  };

  useEffect(()=>{
    setLoading(true)
    dispatch(getAllClass()).then(r=>setLoading(false))
  },[dispatch])


  const create=(value)=>{
    dispatch(createClasses(value)).then(res=>{
      if (res?.status === true) {
        setMessage("success update");
        setOpen(true);
        setType("success");
        setLoadingUpdate(false);
      } else if(res?.status === false) {
        setMessage(res.message);
        setOpen(true);
        setType("error");
        setLoadingUpdate(false);
      }
    });
    
  }

  return (
    <div>
      {
      loading?(
        <p>wait...</p>
      ):(
        <>
        {classes && classes.length>=6 ? (
          <p>you can't add other class-room</p>
        ) : (
          <>
          <AlertNotif message={message} open={open} handleClose={handleClose} type={type}  />
          <Formik
            enableReinitialize={false}
            initialValues={{
              title:  "",
            }}
            onSubmit={(values) => {
              create(values);
            }}
          >
            {(formik) => {
              const { handleSubmit, handleChange, values } = formik;
  
              return (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >

                  <Inputs
                    field={"title"}
                    label={"title"}
                    handleChange={handleChange}
                    value={values}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loadingUpdate}
                  >
                    create
                  </Button>
                </Box>
            );
            }}
          </Formik>
          </>
        )}
         
        
        <Grid container spacing={2}>
        {classes.map((card) =>(
        <Grid item xs={6} key={card._id}>
       <ClassList handleDelete={handleDelete} card={card} title={card.title} />
       </Grid>
              )
              )}
       </Grid>

        </>
      )}
      
      
    </div>
  );
};

export default ClassRoom;
