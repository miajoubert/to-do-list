const GET_PROJECTS = 'session/GET_PROJECTS';
const GET_PROJECT = 'session/GET_PROJECT';
const ADD_PROJECT = 'session/ADD_PROJECT';
const EDIT_PROJECT = 'session/EDIT_PROJECT';
const DELETE_PROJECT = 'session/DELETE_PROJECT';


const getProjects = (projects) => ({
  type: GET_PROJECTS,
  projects
});

const getProject = (project) => ({
  type: GET_PROJECT,
  project
})

const addProject = (project) => ({
  type: GET_PROJECT,
  project
})

const editProject = (project) => ({
  type: GET_PROJECT,
  project
})

const deleteProject = (id) => ({
  type: GET_PROJECT,
  id
})


export const getAllProjects = () => async (dispatch) => {
  const res = await fetch('/api/projects')
  if (res.ok) {
    const data = await res.json()
    dispatch(getProjects(data.projects))
    return data.projects
  }
}

export const getAProject = (id) => async (dispatch) => {
  const res = await fetch(`/api/projects/${id}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getProject(data))
    return data
  }
}


export const addAProject = () => async (dispatch) => {
  const res = await fetch('/api/projects/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(addProject(data))
    return data
  }
}

export const editAProject = () => async (dispatch) => {
  const res = await fetch('/api/projects')
  if (res.ok) {
    const data = await res.json()
    dispatch(editProject(data.projects))
    return data.projects
  }
}

export const deleteAProject = () => async (dispatch) => {
  const res = await fetch('/api/projects')
  if (res.ok) {
    const data = await res.json()
    dispatch(deleteProject(data.projects))
    return data.projects
  }
}


export default function reducer(state = {}, action) {
  let newState = state;
  switch (action.type) {
    case GET_PROJECTS:
      return newState
    case GET_PROJECT:
      return newState
    case ADD_PROJECT:
      return newState
    case EDIT_PROJECT:
      return newState
    case DELETE_PROJECT:
      return newState
    default:
      return state;
  }
}
