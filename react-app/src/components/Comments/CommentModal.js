import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { addAComment, getAllComments } from '../../store/comments';

const CommentModal = ({ closeMenu }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const commentsState = useSelector(state => state.comments)
  const projects = useSelector(state => state.projects)
  const dispatch = useDispatch();
  const projectId = useParams()
  const inputRef = useRef(null);

  console.log("THIS IS THE NOTE PROJ ID", projectId)

  const [showModal, setShowModal] = useState(false);
  const [project_id, setProjectId] = useState(projectId)
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);

  const comments = Object.values(commentsState)
    .filter(comment => {
      return comment.project_id === +projectId
    })

  useEffect(async () => {
    await dispatch(getAllComments(sessionUser))
  }, [sessionUser])

  useEffect(() => {
    inputRef.current?.focus()
  }, [showModal]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      project_id,
      comment
    }

    const data = await dispatch(addAComment(payload))

    if (data) {
      setErrors(data)
    }
    else {
      setComment('')
      setErrors([])
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setComment('')
    setErrors([])
  }

  return (
    <>
      <span
        className='proj-menu-button far fa-comment-alt'
        onClick={() => {
          setShowModal(true)
          closeMenu()
        }}
      >
        <div className='project-menu'>Add project note</div>
      </span>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='modal-notes-container'>
            <div className='note-title-div'>
              <div className='note-title'>
                {projects[projectId].title}
              </div>
              <span
                className='fas fa-times'
                onClick={handleCancel} />
            </div>

            <div className='comments-list'>
              {comments.map}
            </div>

            <div>
              NOTES FORM
              <form
                className='modal-new-task-form'
                onSubmit={handleAddComment}
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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comment"
                  className='modal-task-form-description'
                />
              </form>
              <div className='add-modal-button-div'>
                <button
                  type='submit'
                  className="submit-add-button"
                  onClick={handleAddComment}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default CommentModal;
