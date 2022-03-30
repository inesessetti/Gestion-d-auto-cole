import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  footer:{
    backgroundColor:"#1c2541"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BottomNavigation className={classes.footer}/>
    </div>
  );
}
