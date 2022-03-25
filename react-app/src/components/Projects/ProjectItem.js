import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

import './ProjectItem.css'

const ProjectItem = ({ project }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const projectId = history.location?.pathname.split('/')[3]

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
        <div className='project-link'>
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
