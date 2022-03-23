import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addATask } from '../../store/tasks'

import './TaskForm.css'

const TaskForm = ({ currentTask, showTaskForm }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [project_id, setProjectId] = useState(0)
  // const [showTaskForm, setShowTaskForm] = useState(false)
  const [task, setTask] = useState(currentTask?.task)
  const [description, setDescription] = useState(currentTask?.description)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      project_id,
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
    setDescription('')
  }


  return (
    <>
      <div className='new-task-container'>
        <form
          className='new-task-form'
          onSubmit={handleAddTask}
        >
          <ul className="errorsAuth">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., Pick up groceries"
            className='task-form-name'
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className='task-form-description'
            required
          />
          <select
            value={project_id}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value=''>Inbox</option>
            {/* {projects?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)} */}
          </select>
        </form>
        <div className='form-button-div'>
          <button
            type='submit'
            className="submit-button"
            onClick={handleAddTask}
          >
            Add task
          </button>
          <button
            onClick={showTaskForm}
            className='cancel-button'
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskForm;
