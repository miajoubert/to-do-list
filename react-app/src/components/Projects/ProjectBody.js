import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import MainNav from '../MainNav';
import ProjectSidebar from './ProjectsSidebar';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import { getProjTasks, getAllTasks } from '../../store/tasks';
import './ProjectBody.css'

const ProjectBody = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const tasksState = useSelector(state => state.tasks)
  const [openSideBar, setOpenSideBar] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)

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
                <EditModal
                  className="project-title-button"
                  project={projectsState[projectId]}
                />
                <DeleteModal
                  className="project-title-button"
                  project={projectsState[projectId]}
                />
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

              <a
                className='main-add'
                hidden={showTaskForm}
                onClick={() => setShowTaskForm(true)}
              >
                <svg
                  className='add-task-circle'
                  width="20"
                  height="20"
                >
                  <g fill="none" fillRule="evenodd" transform="translate(2 1)">
                    <mask id="jd4FBg" fill="#fff">
                      <path d="M9 8h7a.5.5 0 1 1 0 1H9v7a.5.5 0 1 1-1 0V9H1a.5.5 0 0 1 0-1h7V1a.5.5 0 0 1 1 0v7z">
                      </path>
                    </mask>
                    <g mask="url(#jd4FBg)">
                      <path fill="currentColor" d="M-4-3h24v24H-4z">
                      </path>
                    </g>
                  </g>
                </svg>
                <path fill="currentColor" d="M-4-3h24v24H-4z"></path>
                <a className='add-task'>Add Task</a>
              </a>
              <div
                hidden={!showTaskForm}
              >
                <TaskForm showTaskForm={() => setShowTaskForm(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectBody;
