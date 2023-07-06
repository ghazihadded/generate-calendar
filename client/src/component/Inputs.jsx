import * as React from 'react';


import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';







export default function Inputs({field,label,handleChange,error,value,type}) {



  return (
    <>
   
          <Grid >
            <TextField
              margin="normal"
              required
              fullWidth
              type={type && type}
              id={field}
              label={label}
              name={field}
              value={value && value[field]}
              onChange={handleChange(field)}
              autoComplete={field}
          
            />
           {error && <p className='red' >{error}</p>}
            </Grid>
           
            
         
    </>
    
  );
}