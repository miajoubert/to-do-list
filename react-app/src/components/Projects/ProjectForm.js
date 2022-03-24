import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { addAProject } from '../../store/projects';

import './ProjectForm.css'

const ProjectForm = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('')
  const dispatch = useDispatch();

  const handleNewProject = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(addAProject({ title }))
      .catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
    setTitle('')
    setShowModal(false)
  }

  const handleClose = () => {
    setShowModal(false)
    setTitle('')
  }


  return (
    <>
      <a
        onClick={() => setShowModal(true)}>
        <i className="fas fa-plus" />
      </a>
      {showModal && (
        <Modal onClose={handleClose}>
          <form
            className='new-project-form-container'
            onSubmit={handleNewProject}
          >
            <ul className="errorsAuth">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
            <label className="new-input">
              Project Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </form>
          <div className='form-button-div'>
            <button
              onClick={handleClose}
              className='cancel-button'
            >
              Cancel
            </button>
            <button
              type='submit'
              className="submit-button"
              onClick={handleNewProject}
            >
              Add
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProjectForm;
