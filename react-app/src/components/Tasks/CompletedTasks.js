import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TaskList from './TaskList';
import { getAllTasks } from '../../store/tasks';
import './CompletedTasks.css'

const CompletedTasks = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const completedState = useSelector(state => state.tasks)
  const tasks = Object.values(completedState)
    .filter(task => {
      return task.completed
    })
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAllTasks(sessionUser))
  }, [dispatch, sessionUser])



  return (
    <>
      <Redirect to='/app/archive' />
      <div className='task-list-title-container'>
        <div className='task-list-title'>
          Completed Tasks
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
      </div>
    </>
  );
}

export default CompletedTasks;
