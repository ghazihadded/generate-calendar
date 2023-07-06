import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Inputs from "./Inputs";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import {useDispatch,useSelector} from "react-redux"
import {  getAllLevel } from '../services/adminServices';
import * as Yup from "yup";

const Popup = ({handleClose,open,path,handleCreate}) => {



  const validationSchema = Yup.object().shape(path==="professeur"?{

    email: Yup.string().required("email required").email('enter your correct email'),
    name: Yup.string().required("name required"),
    speciality: Yup.string().required("speciality required"),
    level: Yup.string().required("level required"),
  }:{
    email: Yup.string().required("email required").email('enter your correct email'),
    name: Yup.string().required("name required"),
    level: Yup.string().required("level required"),
  });


  const [loading,setLoading]=useState(false)

const dispatch=useDispatch()
const {levels}=useSelector(state=>state.levels)
  



  useEffect(()=>{
    setLoading(true)
dispatch(getAllLevel()).then(res=>setLoading(false))
  },[dispatch])
 

  return (
     <>
    {loading ?(
      <p>wait ...</p>
    ):(
   <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new {path}</DialogTitle>
        <DialogContent>
        <Formik
          enableReinitialize={false}
          validationSchema={validationSchema}
          initialValues={path==="professeur"?{
            email:  "",
            name: "",
            speciality:"",
            level:"",
          }:{
            email:  "",
            name: "",
            level:"",
          }}
          onSubmit={(values) => {
            handleCreate(values);
          }}
        >
          {(formik) => {
            const { handleSubmit, handleChange, values,errors } = formik;

            return (
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Inputs
                  field={"email"}
                  label={"Email Address"}
                  handleChange={handleChange}
                  value={values}
                  error={errors.email}
                />
                <Inputs
                  field={"name"}
                  label={"name"}
                  handleChange={handleChange}
                  value={values}
                  error={errors.name}
                />
                {path==="professeur" &&
                <Inputs
                  field={"speciality"}
                  label={"speciality"}
                  handleChange={handleChange}
                  value={values}
                  error={errors.speciality}
                /> }
                <Grid display="flex" alignItems="center" >
                
      <InputLabel id="my-dropdown-label">level</InputLabel>
                 <Select
       
        value={values.level}
        
        onChange={handleChange('level')}
   >   
   {levels.map(el=> 
      
       <MenuItem value={el?._id} key={el?._id}>{`level ${el?.level}`}</MenuItem>
      
   )}
       
      </Select>
      {errors.level && <p className='red' >{errors.level}</p>}
      </Grid>
                <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleCreate} color="primary" >
            Create
          </Button>
              </Box>
            );
          }}
        </Formik>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
    )}
    
    </>
  );
};

export default Popup;
