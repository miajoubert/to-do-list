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
  type: ADD_PROJECT,
  project
})

const editProject = (project) => ({
  type: EDIT_PROJECT,
  project
})

const deleteProject = (id) => ({
  type: DELETE_PROJECT,
  id
})


export const getAllProjects = () => async (dispatch) => {
  const res = await fetch('/projects')
  if (res.ok) {
    const data = await res.json()
    dispatch(getProjects(data.projects))
    return data.projects
  }
}

export const getAProject = (id) => async (dispatch) => {
  const res = await fetch(`/projects/${id}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getProject(data))
    return data
  }
}


export const addAProject = (project) => async (dispatch) => {
  const res = await fetch('/projects/add', {
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

export const editAProject = (project) => async (dispatch) => {
  const res = await fetch(`/projects/${project.id}/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(editProject(data))
    return data
  }
}

export const deleteAProject = (id) => async (dispatch) => {
  const res = await fetch(`/projects/${id}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(deleteProject(id))
    return res
  }
}


export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_PROJECTS:
      newState = { ...state };
      action.projects.forEach((project) => {
        newState[project?.id] = project
      });
      return newState;
    case GET_PROJECT:
      newState = { ...state };
      newState[action.project?.id] = action.project;
      return newState;
    case ADD_PROJECT:
      newState = { ...state };
      newState[action.project?.id] = action.project;
      return newState;
    case EDIT_PROJECT:
      newState = { ...state };
      newState[action.project?.id] = action.project;
      return newState
    case DELETE_PROJECT:
      newState = { ...state };
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}
