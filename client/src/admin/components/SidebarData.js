import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as TiIcons from 'react-icons/ti';
import * as HiIcons from 'react-icons/hi';
import * as BsIcons from 'react-icons/bs';


export const SidebarData = [
  {
    title: 'Acceuil',
    path: '/',
    icon: <TiIcons.TiHomeOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Séances',
    path: '/Sessions',
    icon: <BsIcons.BsCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Candidats',
    path: '/Candidats',
    icon: <BsIcons.BsFillPeopleFill />,
    cName: 'nav-text'
  },
  {
    title: 'Employés',
    path: '/Employes',
    icon: <HiIcons.HiOutlineOfficeBuilding />,
    cName: 'nav-text'
  },
  {
    title: 'Véhicules',
    path: '/Vehicules',
    icon: <BiIcons.BiCar />,
    cName: 'nav-text'
  }
];
