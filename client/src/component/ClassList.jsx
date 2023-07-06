import React from 'react';
import { Card, CardContent, Button  } from '@mui/material';

const ClassList = ({card,handleDelete,title}) => {
 



  return (
    <div>
      
          <Card sx={{ maxWidth: 300 }}>
            <CardContent>
              <h2>{title}</h2>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(card._id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
      
    </div>
  );
};

export default ClassList;
