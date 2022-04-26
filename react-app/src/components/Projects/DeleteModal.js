import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Modal } from '../../context/Modal'
import { deleteAProject } from '../../store/projects';

import './DeleteModal.css'

const DeleteModal = ({ project, sb, closeMenu }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleDeleteProject = (e) => {
    e.preventDefault();
    dispatch(deleteAProject(project?.id))
      .catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
    setShowModal(false)
    history.push('/app')
    return
  }

  return (
    <>
      <a
        hidden={!sb}
        className='proj-sb-button'
        onClick={() => setShowModal(true)}
      >
        <i className="far fa-trash-alt tooltip">
          <span className='tooltiptext'>Delete</span>
        </i>
      </a>

      <span
        className={sb ? 'hide' : 'proj-menu-button far fa-trash-alt'}
        onClick={() => {
          setShowModal(true)
          closeMenu()
        }}
      >
        <div className='project-menu'>Delete project</div>
      </span>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ul className="errorsAuth">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>

          <div className='confirmation'>
            Are you sure you want to delete {project?.title}?
          </div>

          <div className='modal-button-div'>
            <button
              onClick={() => setShowModal(false)}
              className='cancel-delete-button'
            >
              Cancel
            </button>
            <button
              className="submit-button"
              onClick={handleDeleteProject}
            >
              Delete
            </button>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default DeleteModal;
