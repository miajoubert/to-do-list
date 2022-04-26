import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { getAllTasks } from '../../store/tasks';
import { deleteASection } from '../../store/sections';

const DeleteSection = ({ section }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const tasksState = useSelector(state => state.tasks)
  const tasks = Object.values(tasksState)
    .filter(task => {
      return task.section_id === section.id
    })

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAllTasks())
  }, [dispatch, sessionUser])

  const handleDeleteSection = (e) => {
    e.preventDefault();

    dispatch(deleteASection(section?.id))
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
      <span
        className="far fa-trash-alt"
        onClick={() => setShowModal(true)}>
        Delete section
      </span>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ul className="errorsAuth">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>

          <div className='confirmation'>
            Are you sure you want to delete {section?.section} and its {tasks.length} tasks?
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
              onClick={handleDeleteSection}
            >
              Delete section
            </button>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default DeleteSection;
