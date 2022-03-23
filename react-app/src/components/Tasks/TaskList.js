import React, { useState } from 'react';
import DeleteTask from './DeleteTask';
import TaskForm from './TaskForm';

import './TaskList.css'

const TaskList = ({ task }) => {
  const [completed, setCompleted] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)


  return (
    <>
      <div className='task-container'>
        <div
          className='hide-container'
          hidden={showTaskForm}
        >
          <input
            value={completed}
            type="checkbox"
            className='completed-circle'
          />
          {task?.completed}

          <div className='name-description-container'>
            <div className='task-name'>{task?.task}</div>
            <div className='task-description'>{task?.description}</div>
          </div>
          <div className='task-buttons-div'>
            <DeleteTask task={task} />
            <a
              className='proj-sb-button'
              onClick={() => setShowTaskForm(true)}
            >
              <i class="far fa-edit tooltip">
                <span className='tooltiptext'>Edit</span>
              </i>
            </a>

          </div>
        </div >
      </div>

      <div
        hidden={!showTaskForm}
      >
        <TaskForm currentTask={task} showTaskForm={() => setShowTaskForm(false)} />
      </div>
    </>
  );
}

export default TaskList;
