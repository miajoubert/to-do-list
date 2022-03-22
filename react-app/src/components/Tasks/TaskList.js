import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllTasks } from '../../store/tasks';

import './TaskList.css'

const TaskList = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const tasksState = useSelector(state => state.tasks)
  const dispatch = useDispatch();

  const tasks = Object.values(tasksState)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])


  return (
    <div className='task-container'>
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
  );
}

export default TaskList;
