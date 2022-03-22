import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MainNav from './MainNav';
import ProjectSidebar from './Projects/ProjectsSidebar';
import TaskList from './Tasks/TaskList';
import { addATask, getAllTasks } from '../store/tasks';

import './MainApp.css'

const MainApp = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const tasksState = useSelector(state => state.tasks)
  const [openSideBar, setOpenSideBar] = useState(false)
  const [project_id, setProjectId] = useState(0)
  const [task, setTask] = useState('Untitled task')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const tasks = Object.values(tasksState)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  const handleAddTask = () => {

    const payload = {
      project_id,
      task,
      description
    }

    dispatch(addATask(payload))
  }


  const handleNewTask = () => {
    return (
      <>
        <form
          className='new-project-form-container'
          onSubmit={handleAddTask}
        >
          <label className="new-input">
            Project Title
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </label>
        </form>
        <div className='form-button-div'>
          <button
            // onClick={handleClose}
            className='cancel-task-button'
          >
            Cancel
          </button>
          <button
            type='submit'
            className="submit-button"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      </>
    )
  }


  return (
    <>
      <div className='main-app-container'>
        <MainNav openSideBar={() => setOpenSideBar(!openSideBar)} />

        <div className='main-bottom'>
          <div
            className='bottom-left'
            style={openSideBar ? { 'width': "0px", 'margin-left': "150px" }
              : { 'width': "327px" }}
          >
            <div
              className="sidebar"
              style={openSideBar ? { transform: 'translateX(-328px)' } : {}}
            >
              <ProjectSidebar
                openSideBar={() => setOpenSideBar(!openSideBar)} />
            </div>
          </div>

          <div className='bottom-right'>
            <div className='task-list-title-container'>
              <div className='task-list-title'>
                Inbox
              </div>
            </div>
            <div className='primary-task-container'>
              <button
                className='add-task-circle'
                onClick={handleNewTask}
              >
                <i class="fas fa-plus main-add" />
                Add task
              </button>
              <ul className="task-list">
                {tasks?.map(task => {
                  return (
                    <li>
                      <TaskList task={task} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainApp;
