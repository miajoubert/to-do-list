import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './ProjectItem.css'

const ProjectItem = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id)

  return (
    <div className='project-div'>
      <div>{project.title}</div>
      <div className='button-div'>
        <button className='proj-sb-button'>
          <i class="fa fa-pencil-square-o"></i>
        </button>
        <button className='proj-sb-button'>
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default ProjectItem;
