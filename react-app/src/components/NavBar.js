import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ProjectSidebar from './Projects/ProjectsSidebar';

import './NavBar.css'
import MainApp from './MainApp';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionNav = null;
  if (!sessionUser) {
    sessionNav = (
      <div className='nav-bar-splash-container'>
        <div className='nav-bar-splash-left'>
          <a
            href="/"
            className='site-name'>
            <img
              height="32px"
              src="https://w7.pngwing.com/pngs/957/657/png-transparent-todoist-task-management-computer-software-task-management-errands-angle-logo-microsoft-store.png"
              className='logo-home'
            />
            <div className='splash-bar-name'>todolist</div>
          </a>
        </div>
        <div className='nav-bar-splash-right'>
          <div className='splash-bar-item'>
            <NavLink to='/login' exact={true}
              className="splash-link"
            >
              Login
            </NavLink>
          </div>
          <div className='splash-bar-item'>
            <NavLink to='/register' exact={true}
              className="splash-link"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {sessionNav}
    </>
  );
}

export default NavBar;
