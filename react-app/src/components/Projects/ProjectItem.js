import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

import './ProjectItem.css'

const ProjectItem = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const dispatch = useDispatch();
  const history = useHistory();


  return (
    <div
      className='project-div'
    >
      <div className='project-item-div'>
        <div
          className='project-link'
          onClick={() => history.push(`/app/projects/${project?.id}`)}
        >
          {project?.title}
        </div>
      </div>
      <div className='button-div'>
        <EditModal project={project} />
        <DeleteModal project={project} />
      </div>
    </div>
  );
}

export default ProjectItem;
