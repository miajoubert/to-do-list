import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { addATask } from '../../store/tasks';

import './AddTaskModal.css'

const AddTaskModal = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const projects = Object.values(projectsState)
  const projectId = projects[0]?.id

  const [showModal, setShowModal] = useState(false);
  const [project_id, setProjectId] = useState(projectId)
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();

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
    setShowModal(false)
    return
  }

  return (
    <>
      <div className='nav-bar-item'>
        <div className="nav-link">
          <svg
            className='burger-menu tooltip'
            onClick={() => setShowModal(true)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd" transform="translate(4 3)">
              <mask id="jd4FBg" fill="#fff">
                <path
                  d="M9 8h7a.5.5 0 1 1 0 1H9v7a.5.5 0 1 1-1 0V9H1a.5.5 0 0 1 0-1h7V1a.5.5 0 0 1 1 0v7z"
                >
                </path>
              </mask>
              <g mask="url(#jd4FBg)">
                <path fill="currentColor" d="M-4-3h24v24H-4z">
                </path>
              </g>
            </g>
          </svg>
          <path fill="currentColor" d="M-4-3h24v24H-4z"></path>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className='task-form-description'
                required
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
            <div className='add-modal-button-div'>
              <button
                type='submit'
                className="submit-add-button"
                onClick={handleAddTask}
              >
                Add task
              </button>
              <button
                onClick={() => setShowModal(false)}
                className='cancel-add-button'
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default AddTaskModal;
