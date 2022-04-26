const GET_COMMENTS = 'comments/GET_COMMENTS';
const GET_COMMENT = 'comments/GET_COMMENT';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';


const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments
});

const getComment = (comment) => ({
  type: GET_COMMENT,
  comment
})

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
})

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
})


export const getAllComments = () => async (dispatch) => {
  const res = await fetch('/api/comments')

  console.log("THIS IS MY COMMENTSSSSSSSS", res)
  if (res.ok) {
    const data = await res.json()
    dispatch(getComments(data.comments))
    return data.comments
  }
}

export const getAComment = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getComment(data))
    return data
  }
}


export const addAComment = (comment) => async (dispatch) => {
  const res = await fetch('/api/comments/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(addComment(data))
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
  }
}

export const editAComment = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(editComment(data))
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
  }
}

export const deleteAComment = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(deleteComment(id))
    return res
  }
}


export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = { ...state };
      action.comments.forEach((comment) => {
        newState[comment?.id] = comment
      });
      return newState;
    case GET_COMMENT:
      newState = { ...state };
      newState[action.comment?.id] = action.comment;
      return newState;
    case ADD_COMMENT:
      newState = { ...state };
      newState[action.comment?.id] = action.comment;
      return newState;
    case EDIT_COMMENT:
      newState = { ...state };
      newState[action.comment?.id] = action.comment;
      return newState
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}
