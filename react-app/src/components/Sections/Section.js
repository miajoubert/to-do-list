import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable'
import EditSection from './EditSection';
import { getAllSections } from '../../store/sections';

import './Section.css'
import TaskList from '../Tasks/TaskList';
import { getAllTasks } from '../../store/tasks';

const ProjectSection = ({ handleClose, section }) => {
  const sessionUser = useSelector(state => state.session.user.id)
  const tasksState = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const [showSectionMenu, setShowSectionMenu] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const tasks = Object.values(tasksState).filter((task) => {
    return (task?.section_id === section.id)
  })

  useEffect(async () => {
    await dispatch(getAllSections(sessionUser))
    await dispatch(getAllTasks(sessionUser))
  }, [dispatch, sessionUser])

  return (
    <>
      {/* <Draggable> */}
      <div hidden={showEdit}>
        <div className='name-description-container' >
          <b>{section?.section}</b>

          <span
            className='fas fa-ellipsis-h'
            onClick={() => setShowSectionMenu(!showSectionMenu)}
          />

          <div
            className='section-menu-div'
            hidden={!showSectionMenu}
          >

            <div
              className='proj-sb-button'
              onClick={() => setShowEdit(true)}
            >
              <span className="far fa-edit tooltip">
                Edit section
              </span>
            </div>

            <div
              className='proj-sb-button'
              onClick={() => setShowDelete(true)}
            >
              <span className="far fa-edit tooltip">
                Delete section
              </span>
            </div>
          </div>
        </div>
      </div>

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

      {/* </Draggable> */}
    </>
  );
}

export default ProjectSection;
