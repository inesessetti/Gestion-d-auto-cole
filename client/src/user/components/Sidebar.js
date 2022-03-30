import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../CSS/Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../images/logo.png';
import {BiLogInCircle} from 'react-icons/bi';
import axios from 'axios';
import { useHistory } from 'react-router';



function Sidebar({sidebar, setSidebar}) {
  const history = useHistory();
  const showSidebar = () => setSidebar(!sidebar);
  const [user, setuser] = React.useState({})
  React.useEffect(() => {
      axios.get('http://localhost:3001/api/auth',{headers:{
          "auth-token":localStorage.getItem('token')
      }}).then((result)=>{ 
                          setuser(result.data.userData)
                              })
      .catch((err)=>console.log(err))
  }, [])
  const Disconnect = ()=>{
    localStorage.setItem('isAuth',false)
    localStorage.setItem('token', '')
    window.location.replace('/login')
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul >
          <li className='navbar-toggleAdmin'>
              <Link to='#' className='menu-barsAdmin'>
                <div style={{ marginLeft: '150px' }}>
                  <FaIcons.FaBars className='barsAdmin' onClick={showSidebar} />
                </div>
              </Link>
            </li>
            <Link to='/'>
            <div>
              <img className="logo" src={logo} />
            </div>
            <div className='TitleSideBar'>
              <h3>Auto ecole Siti</h3>
            </div>
            </Link>
            <hr className='line'/>
            <div style={{marginTop:'30px'}}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={showSidebar}>
                  <Link to={item.path} >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            </div>
          </ul>
          <div className="side-menu-footer">
            <BiLogInCircle style={{width: 25, height:25, marginLeft:20, marginRight:-10, marginBottom:3}} className='logo' onClick={Disconnect} />
            <div className="user-info">
            <h5><Link to='/user/profile' className='footer-link'>{user.name}</Link> </h5>
             <p>{user.role}</p>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

 

export default Sidebar;