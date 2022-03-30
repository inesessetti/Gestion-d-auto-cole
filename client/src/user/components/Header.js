import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { FiLogOut } from 'react-icons/fi'
import { useHistory } from 'react-router';
import '../CSS/Navbar.css'
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '9vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: '#060b26',
    height: "9vh"
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
    marginLeft: 450,
   marginTop: 35,
   marginRight: 400
  },
  icon: {
    color: '#f2f2f2',
    fontSize: '2rem',
    marginLeft: -200

  },
  colorText: {
    color: '#52ab98',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',

  },
  goDown: {
    color: '#52ab98',
    fontSize: '4rem',
  },
  navbarItems: {
    display: "flex",
    flexDirection: "row"
  },
  buttonLogout: {
    color: "#f2f2f2",
    display:"flex",
    flexDirection:"row",
    size: "500rem",
    marginRight:"-80vw"
  }
}));
export default function Header({ sidebar, setSidebar }) {
  const classes = useStyles();
  const history = useHistory();
  const showSidebar = () => setSidebar(!sidebar);
  const logout = () => {
    localStorage.setItem('isAuth', false)
    localStorage.setItem('token', '')
    window.location.replace('/login') //se rendre a la page de connexion
  }

  return (
    <div>
       <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} className='bars' style={{float:'left',boxSizing:'border-box'}}/>
          </Link>
          <div className='site-title'>
            <h1>Auto école<span className={classes.colorText}>SITI</span></h1></div>
          <Button  className='logoutUser' onClick={logout}>
            <h4 className="deconnectionUser">Se déconnecter</h4>
            <FiLogOut style={{marginLeft: 10, marginTop: 2}}/>
            </Button>
        </div>
      </IconContext.Provider>
    </>


    </div>
  );
}