import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAProject, editAProject, deleteAProject } from '../../store/projects';
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

import './ProjectItem.css'

const ProjectItem = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const projectLink = async () => {
    await dispatch(getAProject(project?.id))
    history.push(`/app/projects/${project?.id}`)
  }

  const handleProjectDelete = async () => {
    await dispatch(deleteAProject(project?.id))
  }

  return (
    <div
      className='project-div'
      onClick={projectLink}
    >
      <div className='project-item-div'>
        <a
          className='project-link'
        // onClick={}
        >
          {project?.title}
        </a>
      </div>
      <div className='button-div'>
        <EditModal project={project} />
        <DeleteModal project={project} />
      </div>
    </div>
  );
}

export default ProjectItem;
