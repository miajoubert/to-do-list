const GET_NOTES = 'notes/GET_NOTES';
const GET_NOTE = 'notes/GET_NOTE';
const ADD_NOTE = 'notes/ADD_NOTE';
const EDIT_NOTE = 'notes/EDIT_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';


const getNotes = (notes) => ({
  type: GET_NOTES,
  notes
});

const getNote = (note) => ({
  type: GET_NOTE,
  note
})

const addNote = (note) => ({
  type: ADD_NOTE,
  note
})

const editNote = (note) => ({
  type: EDIT_NOTE,
  note
})

const deleteNote = (id) => ({
  type: DELETE_NOTE,
  id
})


export const getAllNotes = () => async (dispatch) => {
  const res = await fetch('/api/notes')
  if (res.ok) {
    const data = await res.json()
    dispatch(getNotes(data.notes))
    return data.notes
  }
}

export const getANote = (id) => async (dispatch) => {
  const res = await fetch(`/api/notes/${id}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getNote(data))
    return data
  }
}


export const addANote = (note) => async (dispatch) => {
  const res = await fetch('/api/notes/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(addNote(data))
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
  }
}

export const editANote = (note) => async (dispatch) => {
  const res = await fetch(`/api/notes/${note.id}/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(editNote(data))
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
  }
}

export const deleteANote = (id) => async (dispatch) => {
  const res = await fetch(`/api/notes/${id}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(deleteNote(id))
    return res
  }
}


export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_NOTES:
      newState = { ...state };
      action.notes.forEach((note) => {
        newState[note?.id] = note
      });
      return newState;
    case GET_NOTE:
      newState = { ...state };
      newState[action.note?.id] = action.note;
      return newState;
    case ADD_NOTE:
      newState = { ...state };
      newState[action.note?.id] = action.note;
      return newState;
    case EDIT_NOTE:
      newState = { ...state };
      newState[action.note?.id] = action.note;
      return newState
    case DELETE_NOTE:
      newState = { ...state };
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}
