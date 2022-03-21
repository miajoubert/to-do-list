import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAProject } from '../../store/projects';

import './ProjectItem.css'

const ProjectItem = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const projectLink = async () => {
    await dispatch(getAProject(project?.id))
    history.push(`/app/projects/${project?.id}`)
  }

  return (
    <div
      className='project-div'
      onClick={projectLink}
    >
      <div className='project-item-div'>
        <a
          className='project-link'

        >
          {project.title}
        </a>
      </div>
      <div className='button-div'>
        <a className='proj-sb-button'>
          <i class="far fa-edit tooltip">
            <span className='tooltiptext'>Edit</span>
          </i>
        </a>
        <a className='proj-sb-button'>
          <i class="far fa-trash-alt tooltip">
            <span className='tooltiptext'>Delete</span>
          </i>
        </a>
      </div>
    </div>
  );
}

export default ProjectItem;
