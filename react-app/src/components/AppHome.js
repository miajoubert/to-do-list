import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from './Tasks/TaskList';
import TaskForm from './Tasks/TaskForm';
import { getAllTasks } from '../store/tasks';
import './AppHome.css';

const AppHome = () => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const projectsState = useSelector(state => state.projects);
  const tasksState = useSelector(state => state.tasks);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const dispatch = useDispatch();

  const tasks = Object.values(tasksState);

  useEffect(async () => {
    await dispatch(getAllTasks())
  }, [dispatch, sessionUser]);


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
                <TaskList task={task} />
              </li>
            )
          })}
        </ul>

        <div hidden={showTaskForm}>
          <a
            className='main-add'
            onClick={() => setShowTaskForm(true)}
          >
            <svg className='add-task-circle'>
              <g transform='translate(-.25 0)'>
                <mask id='2'>
                  <line x1='3' y1='10' x2='18' y2='10' stroke='white' stroke-width='1' />
                  <line x1='10.5' y1='3' x2='10.5' y2='17' stroke='white' stroke-width='1' />
                </mask>
                <g mask='url(#2)'>
                  <path d='M-1-1H25V25H-1z'
                    fill='currentColor'>
                  </path>
                </g>
              </g>
            </svg>
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
