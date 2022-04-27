import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteTask from './DeleteTask';
import EditTaskForm from './EditTaskForm';
import { completeATask } from '../../store/tasks';

import './TaskList.css'

const TaskList = ({ task, handleClose }) => {
  const [completed, setCompleted] = useState(task?.completed)
  const [showEditForm, setShowEditForm] = useState(false)
  const dispatch = useDispatch()

  const handleCompleted = async (e) => {
    await dispatch(completeATask(task?.id))

    setCompleted(!completed)
  }

  if (!task) {
    return null
  } else return (
    <>
      <div hidden={showEditForm}>
        <div className='task-container'>
          <div className='completed-container'>
            <form
              onClick={handleCompleted}
            >
              {/* <input
                className='the-actual-checkbox'
                value={completed}
                type="checkbox"
                checked={completed}
                background-color="gray"
              /> */}
              <span
                value={completed}
                type="checkbox"
                checked={completed}
                className={
                  completed ? 'completed-circle checked'
                    : 'completed-circle'}
              >
                <i className={
                  completed ? 'fas fa-check done'
                    : 'fas fa-check'}></i>
              </span>
            </form>
          </div>

          <div className='name-description-container' >
            <div className='task-name'>{task?.task}</div>
            <div className='task-description'>{task?.description}</div>
          </div>
          <div className='task-buttons-div'>
            <a
              className='proj-sb-button'
              onClick={() => setShowEditForm(true)}
            >
              <i className="far fa-edit">
              </i>
            </a>

            <DeleteTask task={task} />
          </div>
        </div >
      </div>

      <div
        hidden={!showEditForm}
        onClick={handleClose}
      >
        <EditTaskForm
          currentTask={task}
          showEditForm={() => setShowEditForm(false)}
        />
      </div>
    </>
  );
}

export default TaskList;
