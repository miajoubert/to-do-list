const GET_TASKS = 'tasks/GET_TASKS';
const GET_PROJ_TASKS = 'tasks/GET_PROJ_TASKS';
const ADD_TASK = 'tasks/ADD_TASK';
const EDIT_TASK = 'tasks/EDIT_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';
const COMPLETE_TASK = 'tasks/COMPLETE_TASK';

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

const completeTask = (task) => ({
  type: COMPLETE_TASK,
  task
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
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
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
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['A server error occurred. Please try again.']
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

export const completeATask = (id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(completeTask(data))

  } else {
    window.alert("There was a server error; please try again.")
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
    case COMPLETE_TASK:
      newState = { ...state };
      newState[action.task?.id] = action.task;
      return newState
    default:
      return state;
  }
}
