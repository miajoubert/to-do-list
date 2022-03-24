import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { deleteATask } from '../../store/tasks';

import './DeleteTask.css'

const DeleteTask = ({ task }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();


  const handleDeleteTask = (e) => {
    e.preventDefault();
    dispatch(deleteATask(task?.id))
      .catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
    setShowModal(false)
    return
  }

  return (
    <>
      <a
        className='task-delete-button'
        onClick={() => setShowModal(true)}
      >
        <i className="far fa-trash-alt tooltip">
          <span className='tooltiptext'>Delete</span>
        </i>
      </a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ul className="errorsAuth">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>

          <div className='confirmation'>
            Are you sure you want to delete {task?.task}?
          </div>

          <div className='modal-button-div'>
            <button
              onClick={() => setShowModal(false)}
              className='cancel-button'
            >
              Cancel
            </button>
            <button
              className="submit-button"
              onClick={handleDeleteTask}
            >
              Delete task
            </button>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default DeleteTask;
