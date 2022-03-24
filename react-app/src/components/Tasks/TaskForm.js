import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addATask } from '../../store/tasks'

import './TaskForm.css'

const TaskForm = ({ currentTask, showTaskForm }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)

  const projects = Object.values(projectsState)
  let { projectId } = useParams()
  if (!projectId) projectId = projects[0]?.id

  const [errors, setErrors] = useState([])
  const [project_id, setProjectId] = useState(projectId)
  const [task, setTask] = useState(currentTask?.task)
  const [description, setDescription] = useState(currentTask?.description)
  const dispatch = useDispatch();


  useEffect(() => {

  }, [projectId])

  const handleAddTask = async (e) => {
    e.preventDefault();

    const payload = {
      project_id,
      task,
      description
    }

    const data = await dispatch(addATask(payload))

    if (data) {
      setErrors(data)
    }
    else {
      setTask('')
      setDescription('')
      setErrors([])
    }
  }

  console.log("THESEE ARE MY ERRORS", errors)

  return (
    <>
      <div className='new-task-container'>
        <form
          className='new-task-form'
          onSubmit={handleAddTask}
        >
          <div className='signup-error-div'>
            {errors.map((error, ind) => (
              <div key={ind}>
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
                {error}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., Pick up groceries"
            className='task-form-name'
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className='task-form-description'
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
