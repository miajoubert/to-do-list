const GET_SECTIONS = 'sections/GET_SECTIONS';
const GET_SECTION = 'sections/GET_SECTION';
const ADD_SECTION = 'sections/ADD_SECTION';
const EDIT_SECTION = 'sections/EDIT_SECTION';
const DELETE_SECTION = 'sections/DELETE_SECTION';


const getSections = (sections) => ({
  type: GET_SECTIONS,
  sections
});

const getSection = (section) => ({
  type: GET_SECTION,
  section
})

const addSection = (section) => ({
  type: ADD_SECTION,
  section
})

const editSection = (section) => ({
  type: EDIT_SECTION,
  section
})

const deleteSection = (id) => ({
  type: DELETE_SECTION,
  id
})


export const getAllSections = () => async (dispatch) => {
  const res = await fetch('/api/sections')
  if (res.ok) {
    const data = await res.json()
    dispatch(getSections(data.sections))
    return data.sections
  }
}

export const getASection = (id) => async (dispatch) => {
  const res = await fetch(`/api/sections/${id}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getSection(data))
    return data
  }
}

export const addASection = (section) => async (dispatch) => {
  const res = await fetch('/api/sections/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(section)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(addSection(data))
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
  }
}

export const editASection = (section) => async (dispatch) => {
  const res = await fetch(`/api/sections/${section.id}/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(section)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(editSection(data))
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
  }
}

export const deleteASection = (id) => async (dispatch) => {
  const res = await fetch(`/api/sections/${id}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(deleteSection(id))
    return res
  }
}


export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_SECTIONS:
      newState = { ...state };
      action.sections.forEach((section) => {
        newState[section?.id] = section
      });
      return newState;
    case GET_SECTION:
      newState = { ...state };
      newState[action.section?.id] = action.section;
      return newState;
    case ADD_SECTION:
      newState = { ...state };
      newState[action.section?.id] = action.section;
      return newState;
    case EDIT_SECTION:
      newState = { ...state };
      newState[action.section?.id] = action.section;
      return newState
    case DELETE_SECTION:
      newState = { ...state };
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}
