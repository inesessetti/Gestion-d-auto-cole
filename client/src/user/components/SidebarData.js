import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as TiIcons from 'react-icons/ti';
import * as BsIcons from 'react-icons/bs';
import * as cg from 'react-icons/cg'

export const SidebarData = [
  {
    title: 'Acceuil',
    path: '/',
    icon: <TiIcons.TiHomeOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/user/profile',
    icon: <cg.CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Calendrier',
    path: '/user/Calendrier',
    icon: <BsIcons.BsCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Tests',
    path: '/user/Tests',
    icon: <FaIcons.FaWpforms />,
    cName: 'nav-text'
  },

];
