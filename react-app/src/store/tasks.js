const GET_TASKS = 'session/GET_TASKS';
const GET_TASK = 'session/GET_TASK';
const ADD_TASK = 'session/ADD_TASK';
const EDIT_TASK = 'session/EDIT_TASK';
const DELETE_TASK = 'session/DELETE_TASK';


const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks
});

const getTask = (task) => ({
  type: GET_TASK,
  task
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

export const getATask = (id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${id}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getTask(data))
    return data
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
    case GET_TASK:
      newState = { ...state };
      newState[action.task?.id] = action.task;
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
