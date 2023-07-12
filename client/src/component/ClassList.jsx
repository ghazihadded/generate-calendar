import React from 'react';
import { Card, CardContent, Button  } from '@mui/material';

const ClassList = ({card,handleDelete,title,speciality,user}) => {
 



  return (
    <div>
      
          <Card sx={{ maxWidth: 300 }} >
            <CardContent>
              <h2>{title}</h2>
              {speciality && <h4>{speciality}</h4>}
             {!user && <Button variant="contained" color="secondary" onClick={() => handleDelete(card._id)}>
                Delete
              </Button>
              }
            </CardContent>
          </Card>
      
    </div>
  );
};

export default ClassList;
