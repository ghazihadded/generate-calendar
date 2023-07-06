import React from 'react'

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function AlertNotif({message,handleClose,open,type}) {

  
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
        </Snackbar>
    </>
  )
}

export default AlertNotif
