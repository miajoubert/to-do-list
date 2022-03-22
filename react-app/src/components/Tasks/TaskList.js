import React from 'react';

import './TaskList.css'

const TaskList = ({ task }) => {

  return (
    <div className='task-container'>
      <div>{task?.task}</div>
      <div>{task?.description}</div>
      <div>BUTTONS</div>
      <div>------</div>
    </div>
  );
}

export default TaskList;
