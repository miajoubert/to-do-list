import React, { useEffect, useState } from 'react';
import DeleteTask from './DeleteTask';
import EditTaskForm from './EditTaskForm';
import { completeATask } from '../../store/tasks';


import './TaskList.css'
import { useDispatch } from 'react-redux';

const TaskList = ({ task }) => {
  const [completed, setCompleted] = useState(task?.completed)
  const [showEditForm, setShowEditForm] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {

  }, [dispatch])


  function handleShowForm() {
    setShowEditForm(!showEditForm)
  }

  const handleCompleted = async () => {
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
              <input
                value={completed}
                type="checkbox"
                checked={completed}
                background-color="gray"
              />
              {/* <span
                className='completed-circle'
                value={completed}
                checked={true}
              >
                <i className="fas fa-check"></i>
              </span> */}
            </form>
          </div>

          <div className='name-description-container'>
            <div className='task-name'>{task?.task}</div>
            <div className='task-description'>{task?.description}</div>
          </div>
          <div className='task-buttons-div'>

            <a
              className='proj-sb-button'
              onClick={() => setShowEditForm(true)}
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
        hidden={!showEditForm}
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
