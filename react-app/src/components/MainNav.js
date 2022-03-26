import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import AddTaskModal from './Tasks/AddTaskModal';
import DevInfoSection from './DevInfoSection';

import './MainNav.css'

const MainNav = ({ closeSideBar }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [openUserDrop, setOpenUserDrop] = useState(false)
  const history = useHistory()

  const searchSubmit = () => {
    history.push('/search')
  }

  return (
    <>
      <nav className='nav-bar'>
        <div className='nav-bar-container'>
          <div className='nav-bar-left'>
            <div className='nav-bar-item nav-link'>
              <svg
                className='burger-menu'
                onClick={closeSideBar}
              >
                <line x1='4' y1='5' x2='20' y2='5' stroke='white' stroke-width='1' />
                <line x1='4' y1='11.5' x2='20' y2='11.5' stroke='white' stroke-width='1' />
                <line x1='4' y1='18' x2='20' y2='18' stroke='white' stroke-width='1' />
              </svg>
            </div>
            <div className='nav-bar-item'>
              <NavLink to='/app' exact={true}
                className="nav-link"
              >
                {/* <i className="fa fa-home" aria-hidden="true"></i> */}
                <svg
                  className='burger-menu'
                >
                  <line x1='4' y1='11.5' x2='12' y2='4' stroke='white' stroke-width='1' />
                  <line x1='4' y1='11.5' x2='4' y2='19' stroke='white' stroke-width='1' />
                  <line x1='10' y1='19' x2='4' y2='19' stroke='white' stroke-width='1' />
                  <line x1='10' y1='19' x2='10' y2='12' stroke='white' stroke-width='1' />
                  <line x1='12' y1='4' x2='20' y2='11.5' stroke='white' stroke-width='1' />
                  <line x1='20' y1='19' x2='20' y2='11.5' stroke='white' stroke-width='1' />
                  <line x1='20' y1='19' x2='14' y2='19' stroke='white' stroke-width='1' />
                  <line x1='14' y1='12' x2='14' y2='19' stroke='white' stroke-width='1' />
                  <line x1='14' y1='12' x2='10' y2='12' stroke='white' stroke-width='1' />
                </svg>
              </NavLink>
            </div>
            <div className='nav-bar-item search' >
              {/* <div to='/search' exact={true}
                className="nav-link"
              > */}
              {/* <i className="fa fa-search" aria-hidden="true"></i> */}
              {/* <svg
                  className="search-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.502.502 0 01-.708.708l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1a6.5 6.5 0 100 13 6.5 6.5 0 000-13z" fill="currentColor"></path>
                </svg> */}
              {/* <input
                  type='text'
                  placeholder="Search"
                  className='search-input'
                  onSubmit={searchSubmit}
                >
                </input> */}
              {/* </div> */}
            </div>
          </div>

          <div className='nav-bar-right'>
            <AddTaskModal />

            <div className='user-button-drop-down-container'>
              <button
                className='user-button'
                onClick={() => setOpenUserDrop(!openUserDrop)}
              >
                {sessionUser['username']?.charAt(0)}
              </button>
              <div
                className='user-dropdown'
                hidden={!openUserDrop}>
                <DevInfoSection />
              </div>
            </div>

          </div>
        </div>
      </nav >
    </>
  );
}

export default MainNav;
