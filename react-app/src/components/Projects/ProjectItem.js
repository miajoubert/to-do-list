import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

import './ProjectItem.css'

const ProjectItem = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const history = useHistory();

  const projectId = history.location?.pathname.split('/')[3]

  const color = "red"

  return (
    <div
      className={
        project?.id === +projectId
          ? "selected project-div"
          : "project-div"
      }
      onClick={() => history.push(`/app/projects/${project?.id}`)}
    >
      <div className='project-item-div'>
        <svg
          width="10"
          height="30"
          viewBox="0 0 10 10"
        >
          <circle cx="4" cy="4" r="4" fill={color} />
        </svg>
        <div className='project-link'>
          {project?.title}
        </div>
      </div>
      <div className='button-div'>
        <EditModal project={project} sb={true} />
        <DeleteModal project={project} sb={true} />
      </div>
    </div>
  );
}

export default ProjectItem;
