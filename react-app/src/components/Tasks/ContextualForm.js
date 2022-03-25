import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addATask } from '../../store/tasks'

import { Form } from '../../context/Form';

import './TaskForm.css'
import './ContextualForm.css'

const ContextualTaskForm = ({ currentTask, projectId }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)

  const projects = Object.values(projectsState)
  if (!projectId) projectId = projects[0]?.id

  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState([])
  const [project_id, setProjectId] = useState(projectId)
  const [task, setTask] = useState(currentTask?.task)
  const [description, setDescription] = useState(currentTask?.description)
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    setProjectId(projectId)
    setErrors([])
  }, [projectId])

  const handleAddTask = async (e) => {
    e.preventDefault();
    setErrors([])

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

  const handleOpenForm = () => {
    if (showForm) setShowForm(false).then(setShowForm(true))
    else setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setTask('')
    setDescription('')
    setErrors([])
  }

  return (
    <>
      <a
        className='main-add'
        onClick={handleOpenForm}
      >
        <svg
          className='add-task-circle'
          width="20"
          height="20"
        >
          <g fill="none" fillRule="evenodd" transform="translate(2 1)">
            <mask id="jd4FBg" fill="#fff">
              <path d="M9 8h7a.5.5 0 1 1 0 1H9v7a.5.5 0 1 1-1 0V9H1a.5.5 0 0 1 0-1h7V1a.5.5 0 0 1 1 0v7z">
              </path>
            </mask>
            <g mask="url(#jd4FBg)">
              <path fill="currentColor" d="M-4-3h24v24H-4z">
              </path>
            </g>
          </g>
        </svg>
        <path fill="currentColor" d="M-4-3h24v24H-4z"></path>
        <a className='add-task'>Add Task</a>
      </a>

      {showForm && (
        <Form onClose={() => setShowForm(false)}>
          <div className='new-open-task-container'>
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
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className='task-form-description'
              />
              <select
                className='select-project'
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
            <div className='form-task-button-div'>
              <button
                type='submit'
                className="submit-task-button"
                onClick={handleAddTask}
              >
                Add task
              </button>
              <button
                onClick={handleCancel}
                className='cancel-task-button'
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}

export default ContextualTaskForm;
