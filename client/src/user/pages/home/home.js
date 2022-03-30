import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Serv from './services';
import { Link as Scroll } from 'react-scroll';
import {  IconButton, Collapse } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {MdExpandMore} from 'react-icons/md'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  root1:{
    height: '100vh',
background:"#060b26",
marginTop:-1
  },
  appbar: {
    background: '#060b26',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
    marginLeft:450
  },
  icon: {
    color: '#f2f2f2',
    fontSize: '2rem',
    marginLeft:-200

  },
  colorText: {
    color: '#52ab98',
  },
  container: {
    textAlign: 'center',
    marginTop:-500,
  },
  title: {
    color: '#f2f2f2',
    fontSize: '4.5rem',
    marginTop:400
  },
  goDown: {
    color: '#52ab98',
    fontSize: '4rem',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    marginTop:-1000

  },
  top: {
    color: '#6fffe9',
    animationDuration: '550ms',
    position: 'absolute',
    left: 800,
    top:320,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));
export default function Home(props) {

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  const classes = useStyles();


  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
          setDone(true);
      
    }, 2000);
  }, []);
  return (

    <>
    {!done ? (
     <CircularProgress
     variant="indeterminate"
     className={classes.top}
     size={70}
     thickness={5}
     {...props}
     value={100}
   />
   
    ) : (
      
   


    <div  className={classes.root1} >
      <div className={classes.root} elevation={0}>
        <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Bienvenu sur <br />
            auto école<span className={classes.colorText}>SITI</span>
          </h1>
          <Scroll to="service" smooth={true}>
            <IconButton>
              <MdExpandMore  className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
      </div>
      <CssBaseline />
      <Serv />
    </div>


)}
</>
  );
}