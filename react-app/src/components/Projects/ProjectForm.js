import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { addAProject } from '../../store/projects';
import './ProjectForm.css';

const ProjectForm = () => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus()
  }, [showModal]);

  const handleNewProject = async (e) => {
    e.preventDefault();

    const data = await dispatch(addAProject({ title }))

    if (data) {
      setErrors(data)
    }
    else {
      setTitle('')
      setShowModal(false)
      setErrors([])
    }
  };

  const handleClose = () => {
    setShowModal(false)
    setTitle('')
  };


  return (
    <>
      <svg
        className='project-plus'
        onClick={() => setShowModal(true)}
      >
        <g>
          <mask id='pf'>
            <line x1='4' y1='11.5' x2='20' y2='11.5' stroke='white' strokeWidth='1.5' />
            <line x1='12' y1='4' x2='12' y2='20' stroke='white' strokeWidth='1.5' />
          </mask>
          <g mask='url(#pf)'>
            <line x1='4' y1='11.5' x2='20' y2='11.5' stroke='currentcolor' strokeWidth='1.5' />
            <line x1='12' y1='4' x2='12' y2='20' stroke='currentcolor' strokeWidth='1.5' />
          </g>
        </g>
      </svg>

      {
        showModal && (
          <Modal onClose={handleClose}>
            <div className='modal-title'>Add project</div>
            <form
              className='new-project-form-container'
              onSubmit={handleNewProject}
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
                  ref={inputRef}
                  required
                />
              </label>

              <label className="input-container">
                <div className='input-label'>Color</div>
                <div className='dropdown-colors-list'>
                  <div>
                    <span className='fas fa-circle' style={{ color: "#B8255F", fontSize: "12px", margin: "8px 6px" }} />
                    Strawberry Red
                  </div>
                  <div>
                    <span className='fas fa-circle' style={{ color: "#DB4025", fontSize: "12px", margin: "8px 6px" }} />
                    Red
                  </div>
                  <div>
                    <span className='fas fa-circle' style={{ color: "#FF9933", fontSize: "12px", margin: "8px 6px" }} />
                    Orange
                  </div>
                </div>
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
        )
      }
    </>
  );
}

export default ProjectForm;
