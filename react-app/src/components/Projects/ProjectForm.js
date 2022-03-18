import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './ProjectForm.css'

const ProjectForm = () => {
  const sessionUser = useSelector(state => state.session?.user.id)


  return (
    <div> PROJECT FORM </div>
  );
}

export default ProjectForm;
