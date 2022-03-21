import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MainNav from './MainNav';
import ProjectSidebar from './Projects/ProjectsSidebar';

import './MainApp.css'

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <>
      <div className='main-app-container'>
        <div className='top-main'>
          <MainNav />
          <div className='nav-bar-item-burger'>
            <svg
              className='burger-menu'
              onClick={() => setOpenSideBar(!openSideBar)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" fillRule="evenodd" d="M4.5 5h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1z"></path>
            </svg>
          </div>
        </div>

        <div className='main-bottom'>
          <div
            className='bottom-left'
            style={openSideBar ? { 'width': "0px" } : { 'width': "327px" }}
          >
            <div
              className="sidebar"
              style={openSideBar ? { transform: 'translateX(-328px)' } : {}}
            >
              <ProjectSidebar
                openSideBar={() => setOpenSideBar(!openSideBar)} />
            </div>
          </div>

          <div
            className='bottom-right'
          >
            <div>
              MAIN APP
            </div>
            <div> MORE STUFF</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainApp;
