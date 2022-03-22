import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MainNav from './MainNav';
import ProjectSidebar from './Projects/ProjectsSidebar';
import TaskList from './Tasks/TaskList';

import './MainApp.css'

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [openSideBar, setOpenSideBar] = useState(false)
  const history = useHistory();


  const handleNewTask = () => {
    history.push('/app/add')
  }


  return (
    <>
      <div className='main-app-container'>
        <MainNav openSideBar={() => setOpenSideBar(!openSideBar)} />

        <div className='main-bottom'>
          <div
            className='bottom-left'
            style={openSideBar ? { 'width': "0px", 'margin-left': "150px" }
              : { 'width': "327px" }}
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
            <div
              onClick={handleNewTask}>
              + Add task
            </div>
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainApp;
