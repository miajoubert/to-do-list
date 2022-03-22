const GET_TASKS = 'session/GET_TASKS';
const GET_PROJ_TASKS = 'session/GET_PROJ_TASKS';
const ADD_TASK = 'session/ADD_TASK';
const EDIT_TASK = 'session/EDIT_TASK';
const DELETE_TASK = 'session/DELETE_TASK';


const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks
});

const getProjectTasks = (tasks) => ({
  type: GET_PROJ_TASKS,
  tasks
})

const addTask = (task) => ({
  type: ADD_TASK,
  task
})

const editTask = (task) => ({
  type: EDIT_TASK,
  task
})

const deleteTask = (id) => ({
  type: DELETE_TASK,
  id
})


export const getAllTasks = () => async (dispatch) => {
  const res = await fetch('/api/tasks')
  if (res.ok) {
    const data = await res.json()
    dispatch(getTasks(data.tasks))
    return data.tasks
  }
}

export const getProjTasks = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${projectId}`)
  console.log("THIS IS MY RESPONSE!!!!", res)
  if (res.ok) {
    const data = await res.json()
    dispatch(getProjectTasks(data.tasks))
    return data.tasks
  }
}


export const addATask = (task) => async (dispatch) => {
  const res = await fetch('/api/tasks/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(addTask(data))
    return data
  }
}

export const editATask = (task) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${task.id}/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(editTask(data))
    return data
  }
}

export const deleteATask = (id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${id}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(deleteTask(id))
    return res
  }
}


export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_TASKS:
      newState = { ...state };
      action.tasks.forEach((task) => {
        newState[task?.id] = task
      });
      return newState;
    case GET_PROJ_TASKS:
      newState = { ...state };
      console.log("MY TASKS ACTION ----------", action)
      action.tasks.forEach((task) => {
        newState[task?.id] = task
      });
      return newState;
    case ADD_TASK:
      newState = { ...state };
      newState[action.task?.id] = action.task;
      return newState;
    case EDIT_TASK:
      newState = { ...state };
      newState[action.task?.id] = action.task;
      return newState
    case DELETE_TASK:
      newState = { ...state };
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}
