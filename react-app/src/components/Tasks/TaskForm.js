import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './TaskForm.css'

const TaskForm = () => {
  const sessionUser = useSelector(state => state.session?.user.id)


  return (
    <div> TASK FORM </div>
  );
}

export default TaskForm;
