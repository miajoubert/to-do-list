import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css'

const LogoutButton = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button
    className='logout-button'
    onClick={onLogout}
  >
    {sessionUser['username'].charAt(0)}
  </button>;
};

export default LogoutButton;
