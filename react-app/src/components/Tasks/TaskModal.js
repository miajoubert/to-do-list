import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { addATask } from '../../store/tasks';
import DeleteTask from './DeleteTask';

import './TaskModal.css'

const TaskModal = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [showModal, setShowModal] = useState(false);
  const [project_id, setProjectId] = useState(0)
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();

    const payload = {

    }

    dispatch(addATask(payload))
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
      <div className='nav-bar-item'>
        <div className="nav-link">
          <svg
            className='burger-menu'
            onClick={() => setShowModal(true)}
          >
            <line x1='4' y1='11.5' x2='20' y2='11.5' stroke='white' strokeWidth='1' />
            <line x1='11.5' y1='4' x2='11.5' y2='20' stroke='white' strokeWidth='1' />
          </svg>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <>
            <div className='task-container'>
              <input
                value={completed}
                type="checkbox"
                className='completed-circle'
              />
              {task?.completed}

              <div>
                <div className='task-name'>{task?.task}</div>
                <div className='task-description'>{task?.description}</div>
                <div className='task-buttons-div'>
                  <DeleteTask />
                </div>
              </div>
            </div >
          </>
        </Modal>
      )
      }
    </>
  );
}

export default TaskModal;
