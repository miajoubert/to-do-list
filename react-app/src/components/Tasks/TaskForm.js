import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { addATask } from '../../store/tasks'

import './TaskForm.css'

const TaskForm = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')

  const handleNewTask = (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      projectId: 1,
      task,
      description
    }

    dispatch(addATask(payload))
      .catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
    setTask('')
    setShowModal(false)
  }

  const handleClose = () => {
    console.log("CLOSING TASK")
    return
  }

  return (
    <>
      TASK FORM
      <form
        className='new-task-container'
        onSubmit={handleNewTask}
      >
        <ul className="errorsAuth">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <label className="new-input">
          Task
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </label>
        <label className="new-input">
          Task
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </form>
      <div className='form-button-div'>
        <button
          type='submit'
          className="submit-button"
          onClick={handleNewTask}
        >
          Add task
        </button>
        <button
          onClick={handleClose}
          className='cancel-button'
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default TaskForm;
