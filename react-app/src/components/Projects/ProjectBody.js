import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import ProjectSection from '../Sections/Section';
import AddSection from '../Sections/AddSection';
import CommentModal from '../Comments/CommentModal';
import { getAllTasks } from '../../store/tasks';
import { getAllSections } from '../../store/sections';

import './ProjectBody.css'

const ProjectBody = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const projectsState = useSelector(state => state.projects)
  const tasksState = useSelector(state => state.tasks)
  const sectionState = useSelector(state => state.sections)

  const [showProjectMenu, setShowProjectMenu] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showSectionForm, setShowSectionForm] = useState(false)

  const { projectId } = useParams();
  const dispatch = useDispatch();

  const tasks = Object.values(tasksState).filter((task) => {
    return (task?.project_id === +projectId && !task?.section_id)
  })

  const sections = Object.values(sectionState).filter((section) => {
    return (section?.project_id === +projectId)
  })

  useEffect(async () => {
    await dispatch(getAllTasks(sessionUser))
    await dispatch(getAllSections(projectId))
  }, [dispatch, projectId, sessionUser])

  return (
    <>
      <div className='task-list-title-container'>
        <div className='task-list-title'>
          {projectsState[projectId]?.title}
        </div>

        <div className='title-button-div'>
          <span
            className='fas fa-ellipsis-h proj-sb-button'
            onClick={() => setShowProjectMenu(!showProjectMenu)}
          />

          <div
            className={!showProjectMenu ? 'project-menu-container-hidden' : 'project-menu-container'}
            hidden={true}
          >
            <EditModal
              project={projectsState[projectId]}
              sb={false}
              closeMenu={() => setShowProjectMenu(false)}
            />

            <CommentModal
              closeMenu={() => setShowProjectMenu(false)} />

            <span
              className='proj-menu-button far fa-plus-square'
              onClick={() => {
                setShowSectionForm(true)
                setShowProjectMenu(false)
              }}
            >
              <div className='project-menu'>Add section</div>
            </span>

            <DeleteModal
              project={projectsState[projectId]}
              sb={false}
              closeMenu={() => setShowProjectMenu(false)}
            />
          </div>
        </div>
      </div >

      <div className='primary-task-container'>
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
            className='main-add'
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
            // sectionId={null}
            showTaskForm={() => setShowTaskForm(false)} />
        </div>

        <ul className="task-list">
          {sections?.map(section => {
            return (
              <li key={section?.id}>
                <ProjectSection
                  section={section}
                  projectId={projectId}
                />
              </li>
            )
          })}
        </ul>


        <div
          hidden={!showSectionForm}
        >
          <AddSection
            projectId={projectId}
            showSectionForm={() => setShowSectionForm(false)} />
        </div>
      </div>
    </>
  );
}

export default ProjectBody;
