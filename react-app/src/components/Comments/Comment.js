import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentEdit from './CommentEdit';
import CommentDelete from './CommentDelete';

import './Comment.css'

const Comment = ({ comment, handleClose }) => {
  const sessionUser = useSelector(state => state.session?.user)

  const [showEdit, setShowEdit] = useState(false)

  return (
    <>
      <div className='individual-comment-div'>
        <div className='user-button' id="comment-user">
          {sessionUser['username']?.charAt(0)}
        </div>

        <div className={!showEdit ? 'comment-div' : 'edit-div'}>
          <div className='comment-div-header'>
            <div className='header-left'>
              <div className='comment-username'>
                {sessionUser?.username}
              </div>
              <div className='comment-timestamp'>
                {new Date(comment?.updated_at).toDateString().split(" ")[1]}&nbsp;
                {new Date(comment?.updated_at).toDateString().split(" ")[2]}&nbsp;
                {new Date(comment?.updated_at).getHours() > 12 ?
                  new Date(comment?.updated_at).getHours() - 12 :
                  new Date(comment?.updated_at).getHours()}:
                {new Date(comment?.updated_at).getMinutes()}&nbsp;
                {new Date(comment?.updated_at).getHours() > 12 ? 'PM' : 'AM'}
              </div>
            </div>
            <div>
              <span
                className='far fa-edit comment-button'
                onClick={() => setShowEdit(true)}
              />
              <CommentDelete comment={comment} />
            </div>
          </div>
          <div className='comment-div-body'> {comment?.comment}</div>
        </div>

        <div className={showEdit ? 'edit-comment-div' : 'edit-div'}>
          <CommentEdit
            currentComment={comment}
            showEditForm={() => setShowEdit(false)}
          />
        </div>
      </div>
    </>
  );
}

export default Comment;
