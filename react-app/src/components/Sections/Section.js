import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable'
import EditSection from './EditSection';
import { getAllSections } from '../../store/sections';

import './Section.css'

const ProjectSection = ({ handleClose }) => {
  const sessionUser = useSelector(state => state.session.user.id)
  const sectionsList = useSelector(state => state.sections)
  const projectId = useParams()
  const dispatch = useDispatch()

  const [showSectionMenu, setShowSectionMenu] = useState(false)

  useEffect(async () => {
    await dispatch(getAllSections(sessionUser))
  }, [dispatch, sessionUser])

  const sections = Object.values(sectionsList)
    .filter(section => {
      section?.project_id === projectId
    })

  if (!sections) {
    return null
  } else return (
    <>
      {/* <div hidden={showEditForm}> */}
      <div className='section-container'>

        {sections.map(section => {
          return (
            <>
              <Draggable>
                <div className='name-description-container' >
                  <div className='task-name'>{section?.section}</div>
                </div>

                <div>
                  <span
                    className='fas fa-ellipsis-h'
                    onClick={() => setShowSectionMenu(!showSectionMenu)}
                  />
                </div>

                <div
                  className='section-menu-div'
                  hidden={!showSectionMenu}
                >

                  <a
                    className='proj-sb-button'
                    onClick={() => setShowEditForm(true)}
                  >
                    <i className="far fa-edit tooltip">
                      <span className='tooltiptext'>Edit section</span>
                    </i>
                  </a>

                  <DeleteTask task={task} />
                </div>

                < div
                  hidden={!showEditForm}
                  onClick={handleClose}
                >
                  <EditSection
                    currentTask={task}
                    showEditForm={() => setShowEditForm(false)}
                  />
                </div>
              </Draggable>
            </>
          )
        })}
      </div>
    </>
  );
}

export default ProjectSection;
