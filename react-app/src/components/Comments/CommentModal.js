import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { addAComment, getAllComments } from '../../store/comments';

import './CommentModal.css'
import './CommentForm.css'

const CommentModal = ({ closeMenu }) => {
  const sessionUser = useSelector(state => state.session?.user);
  const commentsState = useSelector(state => state.comments)
  const projects = useSelector(state => state.projects)
  const dispatch = useDispatch();
  const projectId = useParams();
  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [project_id, setProjectId] = useState(projectId.projectId)
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);

  const comments = Object.values(commentsState)
    .filter(comment => {
      console.log("COMM ID vs comment ID", comment.project_id, project_id)
      return comment.project_id === +project_id
    })

  useEffect(async () => {
    setProjectId(projectId.projectId)
    await dispatch(getAllComments(sessionUser))
  }, [sessionUser, projectId])


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
        <div className='project-menu'>Project comments</div>
      </span>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='modal-comments-container'>
            <div>
              <div className='comments-proj-title-div'>
                <div className='comments-proj-title'>
                  {projects[project_id].title}
                </div>
                <span
                  className='close-span'
                  onClick={handleCancel}>
                  <svg
                    className='close-svg'
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                  >
                    <line x1='0' y1='0' x2='15' y2='15' stroke='gray' strokeWidth='1.5' />
                    <line x1='0' y1='15' x2='15' y2='0' stroke='gray' strokeWidth='1.5' />
                  </svg>
                </span>
              </div>

              <div className='comments-list'>
                {comments.length ?
                  comments?.map((comment) => {
                    return (
                      <div className='individual-comment-div'>
                        <div className='user-button' id="comment-user">
                          {sessionUser['username']?.charAt(0)}
                        </div>
                        <div className='comment-div'>
                          <div className='comment-div-header'>
                            {sessionUser.username}
                          </div>
                          <div className='comment-div-body'> {comment.comment}</div>
                        </div>
                      </div>
                    )
                  })
                  :

                  <div className='comments-no-comments'>
                    <i class="far fa-comments"></i>
                    <div className='no-comments-text'>
                      Keep all your high-level information organized here with project comments.
                    </div>
                  </div>}
              </div>
            </div>

            <form
              className='modal-new-comment-form'
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
                className='modal-comment-textarea'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ref={inputRef}
                required
                placeholder="Comment"
              />
              <div className='add-comment-button-div'>
                <button
                  className="submit-add-button"
                  id="comment-add-button"
                  type='submit'
                  onClick={handleAddComment}
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )
      }
    </>
  );
}

export default CommentModal;
