import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MainNav from './MainNav';
import ProjectSidebar from './Projects/ProjectsSidebar';
import TaskList from './Tasks/TaskList';
import { getAllTasks } from '../store/tasks';

import './MainApp.css'

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const tasksState = useSelector(state => state.tasks)
  const [openSideBar, setOpenSideBar] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();

  const tasks = Object.values(tasksState)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])


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
            <ul className="task-list">
              {tasks?.map(task => {
                return (
                  <li>
                    <TaskList task={task} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainApp;
