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
import { register } from '../services/adminServices';
import { useState } from 'react';
import AlertNotif from '../component/AlertNotif';




const validationSchema = Yup.object().shape({

 name: Yup.string().required("name required"),
  email: Yup.string().required("email required").email('enter your correct email'),
  password: Yup.string().required("password required").min(6, "Password incorrect").max(10,"Password incorrect")
});


const defaultTheme = createTheme();

export default function Register() {

  const [loadiing,setLoading]=useState(false)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  React.useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/")
    }
  },[navigate])

  const handleRegister = async (values) => {
    setLoading(true)
    dispatch(register(values)).then(res=>{
      if(res?.status===false){
        setMessage(res.message)
        setOpen(true);
        setLoading(false)
      }else if(res?.status===true){
        navigate("/")
      }
    })
  }

 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AlertNotif message={message} open={open} handleClose={handleClose} />
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
            Sign up
          </Typography>
          <Formik
                  initialValues={{
                    name:"",
                    email: "",
                    password: "",
                    role:"ADMIN",
                  }}

                  validationSchema={validationSchema}
                  onSubmit={values => {
                    handleRegister(values)
                  }}
                >

                  {(formik) => {
                    const { handleSubmit, handleChange,errors} = formik;

                    return (
                      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Inputs field={"name"} label={"name"} handleChange={handleChange} error={errors.name} />
                      <Inputs field={"email"} label={"Email Address"} handleChange={handleChange} error={errors.email} />
                      <Inputs field={"password"} label={"password"} handleChange={handleChange} error={errors.password} type={"password"}/>
                       
                      <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           disabled={loadiing}
                         >
                           Sign Up
                         </Button>
                         <Grid container>
                          
                           <Grid item>
                           <Link to="/">
                               Singn In
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