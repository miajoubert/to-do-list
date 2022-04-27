import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAComment } from '../../store/comments';

import './CommentForm.css'

const CommentEdit = ({ currentComment, showEditForm }) => {
  const sessionUser = useSelector(state => state.session?.user.id);

  const [errors, setErrors] = useState([]);
  const [comment, setComment] = useState(currentComment?.comment);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    setErrors([])
    setComment(currentComment?.comment)
  }, [currentComment]);

  useEffect(() => {
    inputRef.current?.focus()
    setComment(currentComment?.comment)
  }, [showEditForm]);

  const handleEditComment = async (e) => {
    e.preventDefault();
    setErrors([])

    const payload = {
      ...currentComment,
      comment
    }

    const data = await dispatch(editAComment(payload))

    if (data) {
      setErrors(data)
    }
    else {
      setErrors([])
      setComment('')
      showEditForm()
    }
  };

  const handleCancel = () => {
    setErrors([])
    setComment(currentComment?.comment)
    showEditForm()
  };

  return (
    <>
      <form
        className='modal-new-comment-form'
        onSubmit={handleEditComment}
      >
        <div className='signup-error-div'>
          {errors.map((error, ind) => (
            <div key={ind}>
              <i className="fa fa-exclamation-circle" aria-hidden="true" />
              {error}
            </div>
          ))}
        </div>
        <textarea
          className='modal-comment-textarea'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={inputRef}
          required
          placeholder="Comment"
        />
      </form>
      <div className='edit-comment-button-div'>
        <button
          onClick={handleCancel}
          className='cancel-task-button'
          id="comment-edit-buttons"
        >
          Cancel
        </button>
        <button
          type='submit'
          className="submit-task-button"
          id="comment-edit-buttons"
          onClick={handleEditComment}
        >
          Update
        </button>
      </div>
    </>
  );
}

export default CommentEdit;
