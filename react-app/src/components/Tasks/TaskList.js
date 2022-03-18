import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './TaskList.css'

const TaskList = () => {
  const sessionUser = useSelector(state => state.session?.user.id)


  return (
    <div> TASK LIST </div>
  );
}

export default TaskList;
