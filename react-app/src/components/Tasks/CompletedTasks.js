import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TaskList from './TaskList';
import { getCompleteTasks } from '../../store/tasks';
import './CompletedTasks.css'

const CompletedTasks = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const completedState = useSelector(state => state.tasks)
  const tasks = Object.values(completedState)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(async () => {
    await dispatch(getCompleteTasks())
  }, [dispatch])

  console.log("PLEASE WORK!!!!!!!!!!!!", tasks)


  return (
    <>
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