import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal'
import { deleteAComment } from '../../store/comments';

import './CommentModal.css'

const DeleteComment = ({ comment }) => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleDeleteComment = (e) => {
    e.preventDefault();
    dispatch(deleteAComment(comment?.id))
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
        className='far fa-trash-alt comment-button'
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ul className="errorsAuth">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>

          <div className='confirmation'>
            Are you sure you want to delete this comment?
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
              onClick={handleDeleteComment}
            >
              Delete comment
            </button>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default DeleteComment;
