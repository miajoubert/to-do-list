import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MainNav from './MainNav';
import ProjectSidebar from './Projects/ProjectsSidebar';
import { getAllTasks } from '../store/tasks';
import './MainApp.css'

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const tasksState = useSelector(state => state.tasks)
  const [openSideBar, setOpenSideBar] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  const tasks = Object.values(tasksState)
  console.log("THESE ARE MY TASKS", tasks)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])


  const handleNewTask = () => {
    history.push('/app/add')
  }


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
            <div
              onClick={handleNewTask}>
              + Add task
            </div>
            <ul className="task-list">
              {tasks?.map(task => {
                return (
                  <>
                    <div>{task?.completed}</div>
                    <div>{task?.task}</div>
                    <div>{task?.description}</div>
                    <div>BUTTONS</div>
                  </>
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
