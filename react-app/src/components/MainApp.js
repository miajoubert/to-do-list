import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import ProjectSidebar from './Projects/ProjectsSidebar';

import './MainApp.css'

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)


  return (
    <div className='main-app-container'>
      <div className='app-body'> MAIN APP </div>
    </div>
  );
}

export default MainApp;
