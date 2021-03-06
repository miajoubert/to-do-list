import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainNav from './MainNav';

import './NotFound.css'

const NotFound = () => {
  const history = useHistory()

  return (
    <>
      <div className='not-found-img'>
        <MainNav />
        <img
          src="https://i.pinimg.com/originals/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg"
          className='actual-image'
        />
        <button
          className='go-back-button'
          onClick={() => history.push('/app')}
        >
          Go Home
        </button>

      </div>
    </>
  );
}

export default NotFound;
