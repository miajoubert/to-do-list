import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './DeleteConfirmation.css'

const DeleteConfirmation = () => {
  const sessionUser = useSelector(state => state.session?.user.id)


  return (
    <div> Are you sure you want to delete THIS TASK? </div>
  );
}

export default DeleteConfirmation;
