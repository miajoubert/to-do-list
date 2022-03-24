import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './auth/ProtectedRoute';
import MainNav from './MainNav';
import AppHome from './AppHome';
import ProjectSidebar from './Projects/ProjectsSidebar';
import ProjectBody from './Projects/ProjectBody';
import CompletedTasks from './Tasks/CompletedTasks';
import SearchResults from './SearchResults';
import { getAllTasks } from '../store/tasks';

import './MainApp.css'
import TaskForm from './Tasks/TaskForm';

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)

  const [closeSideBar, setCloseSideBar] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)

  return (
    <>
      <div className='main-app-container'>
        <MainNav closeSideBar={() => setCloseSideBar(!closeSideBar)} />

        <div className='main-bottom-row'>
          <div
            className='bottom-left'
            style={closeSideBar ? { 'width': "0px", 'margin-left': "220px" }
              : { 'width': "327px" }}
          >
            <div
              className="sidebar"
              style={closeSideBar ? { transform: 'translateX(-328px)' } : {}}
            >
              <ProjectSidebar
                showTaskForm={() => setShowTaskForm(false)} />
            </div>
          </div>

          <div className='bottom-right'>
            <ProtectedRoute path='/app' exact={true}>
              <AppHome />
            </ProtectedRoute>
            <ProtectedRoute path='/app/projects/:projectId' exact={true}>
              <ProjectBody />
            </ProtectedRoute>
            <ProtectedRoute path='/app/archive' exact={true}>
              <CompletedTasks />
            </ProtectedRoute>
            <ProtectedRoute path='/app/search' exact={true}>
              <SearchResults />
            </ProtectedRoute>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainApp;
