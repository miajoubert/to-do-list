import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { editAProject } from '../../store/projects';

import './EditModal.css'

const EditModal = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(project?.title)
  const dispatch = useDispatch();

  const handleEditProject = (e) => {
    e.preventDefault();

    project = {
      id: project?.id,
      title
    }

    dispatch(editAProject(project))
      .catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
    setShowModal(false)
    return
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <a
        className='proj-sb-button'
        onClick={() => setShowModal(true)}
      >
        <i className="far fa-edit tooltip">
          <span className='tooltiptext'>Edit</span>
        </i>
      </a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form
            className='new-project-form-container'
            onSubmit={handleEditProject}
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
              onClick={handleEditProject}
            >
              Edit
            </button>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default EditModal;
