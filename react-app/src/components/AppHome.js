import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from './Tasks/TaskList';
import TaskForm from './Tasks/TaskForm';
import { getAllTasks } from '../store/tasks';
import './AppHome.css'

const AppHome = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const tasksState = useSelector(state => state.tasks)
  const [showTaskForm, setShowTaskForm] = useState(false)

  const dispatch = useDispatch();

  const tasks = Object.values(tasksState)

  useEffect(async () => {
    await dispatch(getAllTasks())
  }, [dispatch, sessionUser])


  return (
    <>
      <div className='task-list-title-container'>
        <div className='task-list-title'>
          Inbox
        </div>
      </div>
      <div className='primary-task-container'>
        <ul className="task-list">
          {tasks?.map(task => {
            return (
              <li key={task?.id}>
                <TaskList
                  task={task}
                  handleClose={() => setShowTaskForm(false)} />
              </li>
            )
          })}
        </ul>

        <div hidden={showTaskForm}>
          <a
            className='main-add'
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
        </div>

        <div
          hidden={!showTaskForm}
        >
          <TaskForm showTaskForm={() => setShowTaskForm(false)} />
        </div>
      </div>
    </>
  );
}

export default AppHome;
