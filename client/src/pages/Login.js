import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Inputs from '../component/Inputs';
import { Formik} from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from '../services/adminServices';
import { useState } from 'react';
import AlertNotif from '../component/AlertNotif';
import { useEffect } from 'react';





const validationSchema = Yup.object().shape({

  email: Yup.string().required("email required").email('enter your correct email'),
  password: Yup.string().required("password required")
});


const defaultTheme = createTheme();




export default function SignIn() {

    const [loadiing,setLoading]=useState(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type,setType]=useState(null)
    const dispatch=useDispatch()
    const navigate=useNavigate()


    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  const handleLogin = async (values) => {
    setLoading(true)
    dispatch(login(values)).then(res=>{
      if(res?.status===false){
        setMessage(res.message)
        setOpen(true);
        setType("error")
        setLoading(false)
      }else if(res?.status===true){
        navigate("/")
      }
    })
  }
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/")
    }
  },[navigate])
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AlertNotif message={message} open={open} handleClose={handleClose} type={type} />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}

                  validationSchema={validationSchema}
                  onSubmit={values => {
                    handleLogin(values)
                  }}
                >

                  {(formik) => {
                    const { handleSubmit, handleChange,errors} = formik;

                    return (
                      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                      <Inputs field={"email"} label={"Email Address"} handleChange={handleChange} error={errors.email} />
                      <Inputs field={"password"} label={"password"} handleChange={handleChange} error={errors.password} type={"password"}/>
                      <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           disabled={loadiing}
                         >
                           Sign In
                         </Button>
                         <Grid container>
                          
                           <Grid item>
                           <Link to="/register">
                               "Don't have an account? Sign Up"
                             </Link>
                           </Grid>
                         </Grid>
                      </Box>
                    )
                  }}
                  </Formik>
         
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}