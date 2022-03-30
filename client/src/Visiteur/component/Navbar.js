import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  colorText: {
    color: '#52ab98',
  },
  appbarTitle: {
    color: '#fff',
    fontSize: '2rem',
    marginLeft:"42vw",
    marginTop:"5vh"
  },
  navbarItems: {
    display:"flex",
    textAlign:"center",
    justifyContent:"center"

  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
const retour = () => {
history.push('/')
}
  return (
    <div className={classes.root}>
      <AppBar position="absolute" style={{backgroundColor:"#0b132b", height:"9vh", position:"fixed"}}>
        <Toolbar>
        <div className={classes.navbarItems} onClick={retour} >
            <h1 className={classes.appbarTitle}>
              Auto école<span className={classes.colorText}>SITI</span>
            </h1>
          </div>    
              </Toolbar>
      </AppBar>
    </div>
  );
}
