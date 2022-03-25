import React, { useState, useEffect } from 'react';
import MainNav from './MainNav';

import './NotFound.css'

const NotFound = () => {

  return (
    <>
      <div className='not-found-img'>
        <MainNav />
        <img
          src="https://i.pinimg.com/originals/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg"
          className='actual-image'
        />
        <button className='go-back-button'>
          Go Home
        </button>

      </div>
    </>
  );
}

export default NotFound;
