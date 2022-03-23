import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import MainNav from '../MainNav';
import ProjectSidebar from './ProjectsSidebar';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import TaskList from '../Tasks/TaskList';
import { getProjTasks, getAllTasks } from '../../store/tasks';
import './ProjectBody.css'

const ProjectBody = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const tasksState = useSelector(state => state.tasks)
  const [openSideBar, setOpenSideBar] = useState(false)

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const tasks = Object.values(tasksState).filter((task) => {
    return (task.project_id === +projectId)
  })

  useEffect(async () => {
    await dispatch(getAllTasks())
  }, [dispatch])


  const handleNewTask = () => {
    return (
      <input></input>
    )
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
            <div className='task-list-title-container'>
              <div className='task-list-title'>
                {projectsState[projectId]?.title}
              </div>
              <div className='title-button-div'>
                <EditModal project={projectsState[projectId]} />
                <DeleteModal project={projectsState[projectId]} />
              </div>
            </div>
            <div className='primary-task-container'>

              <ul className="task-list">
                {tasks?.map(task => {
                  return (
                    <li>
                      <TaskList task={task} />
                    </li>
                  )
                })}
              </ul>
              <button
                className='add-task-circle'
                onClick={handleNewTask}
              >
                <i class="fas fa-plus main-add" />
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectBody;
