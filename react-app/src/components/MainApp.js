import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './auth/ProtectedRoute';
import MainNav from './MainNav';
import ProjectSidebar from './Projects/ProjectsSidebar';
import AppHome from './AppHome';
import ProjectBody from './Projects/ProjectBody';
import SearchResults from './SearchResults';
import { addATask, getAllTasks } from '../store/tasks';

import './MainApp.css'
import TaskForm from './Tasks/TaskForm';
import { useParams } from 'react-router-dom';

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const tasksState = useSelector(state => state.tasks)

  const [closeSideBar, setCloseSideBar] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)

  const dispatch = useDispatch();

  const tasks = Object.values(tasksState)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])


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
