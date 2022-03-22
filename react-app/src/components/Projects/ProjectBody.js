import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import MainNav from '../MainNav';
import ProjectSidebar from './ProjectsSidebar';
import { getProjTasks } from '../../store/tasks';
import './ProjectBody.css'
import TaskList from '../Tasks/TaskList';

const ProjectBody = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const tasksState = useSelector(state => state.tasks)
  const [openSideBar, setOpenSideBar] = useState(false)

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const tasks = Object.values(tasksState)

  useEffect(() => {
    dispatch(getProjTasks(projectId))
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
            <div>{projectsState[projectId]?.title}</div>
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

export default ProjectBody;
