import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import { IconContext } from 'react-icons';
import { Button } from '@material-ui/core';
import {FiLogOut} from 'react-icons/fi'
import { useHistory } from 'react-router';

function Navbar({sidebar,setSidebar}) {
  const history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);
const logout = () => {
    localStorage.setItem('isAuth',false)
    localStorage.setItem('token', '')
    window.location.replace('/login')
  
}
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbarAdmin'>
          <Link to='#' className='menu-barsAdmin'>
            <FaIcons.FaBars onClick={showSidebar} className='barsAdmin' style={{float:'left',boxSizing:'border-box'}}/>
          </Link>
          <div className='site-titleAdmin'><h1>Auto école<span className="colorText">SITI</span></h1></div>
          <Button  className='logoutAdmin' onClick={logout}><h4 className="deconnectionAdmin">Se déconnecter</h4><FiLogOut style={{marginLeft: 10, marginTop: 2}}/></Button>
        </div>
      </IconContext.Provider>
    </>
  );
}


export default Navbar;