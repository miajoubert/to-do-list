import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editATask } from '../../store/tasks'

import './EditTaskForm.css'

const EditTaskForm = ({ currentTask, showTaskForm }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const projects = Object.values(projectsState)

  const [project_id, setProjectId] = useState(currentTask?.project_id)
  // const [showTaskForm, setShowTaskForm] = useState(false)
  const [task, setTask] = useState(currentTask?.task)
  const [description, setDescription] = useState(currentTask?.description)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();


  // useEffect(() => {

  // }, [])


  const handleEditTask = (e) => {
    e.preventDefault();
    setErrors([]);

    console.log("PAYLOAD ID", project_id)

    const payload = {
      ...currentTask,
      project_id,
      task,
      description
    }

    dispatch(editATask(payload))
      .catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
    setTask('')
    setDescription('')
    showTaskForm(false)
  }


  return (
    <>
      <div className='new-task-container'>
        <form
          className='new-task-form'
          onSubmit={handleEditTask}
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
          <textarea
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
            {projects?.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </form>
        <div className='form-button-div'>
          <button
            type='submit'
            className="submit-button"
            onClick={handleEditTask}
          >
            Edit task
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

export default EditTaskForm;
