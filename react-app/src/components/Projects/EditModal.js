import React, { useEffect, useState } from 'react';
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

  const handleEditProject = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      id: project?.id,
      title
    }

    const data = await dispatch(editAProject(payload))

    if (data) {
      setErrors(data)
    } else {
      setTitle(project?.title)
      setShowModal(false)
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setTitle(project?.title)
    setErrors([])
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
          <div className='modal-title'>Edit project</div>
          <form
            className='new-project-form-container'
            onSubmit={handleEditProject}
          >
            <div className='signup-error-div'>
              {errors.map((error, ind) => (
                <div key={ind}>
                  <i className="fa fa-exclamation-circle" aria-hidden="true" />
                  {error}
                </div>
              ))}
            </div>
            <label className="input-container">
              <div className='input-label'>Name</div>
              <input
                className="new-input"
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
              Save
            </button>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default EditModal;
