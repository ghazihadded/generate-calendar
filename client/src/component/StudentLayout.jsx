import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button ,AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Group as GroupIcon } from '@material-ui/icons';
import { useNavigate } from "react-router-dom";
import { Event,Person,School  } from '@mui/icons-material';
import {useDispatch} from 'react-redux'
import { logOUt } from '../services/adminServices';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const StudentLayout = ( {children}) => {
  const classes = useStyles();
const dispatch=useDispatch()
const navigate=useNavigate()

  const handleLogout = () => {
    
    dispatch(logOUt())
    window.location.reload();
    navigate("/login")
  };


  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap >
           <School style={{ color: 'white' }} /> ETUDIANT
          </Typography>
          <Typography variant="h6" noWrap >
          <Button color="inherit" onClick={handleLogout} >
          Logout
        </Button>
        </Typography>
        </Toolbar>
        
       
    
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/etudiant">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button component={Link} to="/etudiant/professeurs">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="professeurs" />
          </ListItem>
          <ListItem button component={Link} to="/etudiant/calendrier">
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="calendrier" />
          </ListItem>
          <ListItem button component={Link} to="/etudiant/groupe">
            <ListItemIcon>
            <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="groupe" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
