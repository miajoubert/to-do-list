import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Draggable from 'react-draggable'
import EditSection from './EditSection';
import DeleteSection from './DeleteSection';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import { getAllSections } from '../../store/sections';
import { getAllTasks } from '../../store/tasks';

import './Section.css'

const ProjectSection = ({ section, projectId }) => {
  const sessionUser = useSelector(state => state.session.user.id);
  const tasksState = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [showSectionMenu, setShowSectionMenu] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)

  const tasks = Object.values(tasksState).filter((task) => {
    return (task?.section_id === section.id)
  })

  useEffect(() => {
    setShowSectionMenu(false)
    setShowEdit(false)
  }, [inputRef])

  useEffect(async () => {
    await dispatch(getAllSections(sessionUser))
    await dispatch(getAllTasks(sessionUser))
  }, [dispatch, sessionUser])

  return (
    <>
      {/* <Draggable> */}
      <div hidden={showEdit}>
        <div className='section-container' >
          <b>{section?.section}</b>

          <div>
            <span
              className='fas fa-ellipsis-h'
              id='section-button'
              onClick={() => setShowSectionMenu(!showSectionMenu)}
            />

            <div
              className={!showSectionMenu ? 'hidden' : 'section-menu-div'}
              hidden={!showSectionMenu}
            >

              <div
                className='section-menu'
                onClick={() => setShowEdit(true)}
              >
                <span className="far fa-edit" />
                <div className='project-menu'>
                  Edit section
                </div>
              </div>

              <DeleteSection
                section={section} />

            </div>
          </div>
        </div>
      </div >

      < div
        hidden={!showEdit}
      >
        <EditSection
          currentSection={section}
          showEditForm={() => setShowEdit(false)}
          showSectionMenu={() => setShowSectionMenu(false)}
        />
      </div>


      <ul className="task-list">
        {tasks?.map(task => {
          return (
            <li key={task?.id}>
              <TaskList task={task} />
            </li>
          )
        })}
      </ul>

      <div hidden={showTaskForm}>
        <a
          className='section-add'
          onClick={() => setShowTaskForm(true)}
        >
          <svg
            className='add-task-circle'
            onClick={() => setShowTaskForm(true)}

          >
            <g transform='translate(-.25 0)'>
              <line x1='3' y1='10' x2='18' y2='10' stroke='white' strokeWidth='1.5' />
              <line x1='10.5' y1='3' x2='10.5' y2='17' stroke='white' strokeWidth='1.5' />
              <g mask='url(#ahat)'>
                <line x1='3' y1='10' x2='18' y2='10' stroke='currentcolor' strokeWidth='1.5' />
                <line x1='10.5' y1='3' x2='10.5' y2='17' stroke='currentcolor' strokeWidth='1.5' />
              </g>
            </g>
          </svg>
          <div className='add-task'>Add Task</div>
        </a>
      </div>

      <div
        hidden={!showTaskForm}
      >
        <TaskForm
          projectId={projectId}
          sectionId={section.id}
          showTaskForm={() => setShowTaskForm(false)} />
      </div>
      {/* </Draggable> */}


    </>
  );
}

export default ProjectSection;
