import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material'
import Popup from './Popup';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




const TableList = ({title,rows,path,handleCreate}) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

 

  const handleOpen = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
 

  return (
    <>
    <Popup handleClose={handleClosePopup} open={openPopup} path={path} handleCreate={handleCreate} />
    <Box display="flex" alignItems="center">
      <Typography variant="body1">
        Create new {path} 
      </Typography>
       <IconButton color="primary" onClick={handleOpen}>
        <AddCircleOutline />
      </IconButton> 
    </Box>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="My Table">
        <TableHead>
          <TableRow>
          {title.map((title,i) => (
           
              <TableCell key={i}>{title}</TableCell>
            
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            
            <TableRow key={row.id}>
             
              <TableCell>{i+1}</TableCell>
              <TableCell> <Link to={`/${path}/${row._id}`}>{row.name} </Link></TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.level.level}</TableCell>
             
            </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TableList;
