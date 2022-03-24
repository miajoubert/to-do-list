import React, { useState } from 'react';
import DeleteTask from './DeleteTask';
import EditTaskForm from './EditTaskForm';

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
          <div className='completed-container'>
            <input
              value={completed}
              type="checkbox"
              className='completed-circle'
              checked={task?.completed === true}
            />
            <span className='completed-circle'></span>
          </div>
          {/* {task?.completed} */}

          <div className='name-description-container'>
            <div className='task-name'>{task?.task}</div>
            <div className='task-description'>{task?.description}</div>
          </div>
          <div className='task-buttons-div'>
            <a
              className='proj-sb-button'
              onClick={() => setShowTaskForm(true)}
            >
              <i className="far fa-edit tooltip">
                <span className='tooltiptext'>Edit</span>
              </i>
            </a>

            <DeleteTask task={task} />
          </div>
        </div >
      </div>

      <div
        hidden={!showTaskForm}
      >
        <EditTaskForm currentTask={task} showTaskForm={() => setShowTaskForm(false)} />
      </div>
    </>
  );
}

export default TaskList;
