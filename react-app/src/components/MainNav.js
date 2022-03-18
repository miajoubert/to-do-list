import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ProjectSidebar from './Projects/ProjectsSidebar';

import './MainNav.css'

const MainNav = () => {
  const sessionUser = useSelector(state => state.session.user)
  // localStorage.setItem('sidebar', hideSideBar)

  let sessionNav;
  if (sessionUser) {
    sessionNav = (
      <nav className='nav-bar'>
        <div className='nav-bar-container'>
          <div className='nav-bar-left'>
            {/* <div className='nav-bar-item nav-link'>
              <svg
                className='burger-menu'
                // onClick={() => setHideSideBar(!hideSideBar)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" fillRule="evenodd" d="M4.5 5h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1z"></path>
              </svg>
            </div> */}
            <div className='nav-bar-item'>
              <NavLink to='/app' exact={true}
                className="nav-link"
                activeClassName='active'>
                {/* <i className="fa fa-home" aria-hidden="true"></i> */}
                <svg
                  className='burger-menu'
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M12.527 3.075c.35.104.64.263 1.27.876L19.1 9.123c.374.364.49.505.601.678.11.174.185.351.232.552.042.178.062.34.066.742L20 17.718c0 .446-.046.607-.134.77a.906.906 0 01-.378.378c-.163.088-.324.134-.77.134H14v-4.718c0-.446-.046-.607-.134-.77a.906.906 0 00-.378-.378c-.142-.077-.284-.122-.616-.132L12.718 13h-1.436c-.446 0-.607.046-.77.134a.906.906 0 00-.378.378c-.077.142-.122.284-.132.616l-.002.154V19H5.282c-.446 0-.607-.046-.77-.134a.906.906 0 01-.378-.378c-.088-.163-.134-.324-.134-.77v-6.462c0-.522.02-.703.067-.903.047-.2.121-.378.232-.552l.077-.113c.098-.134.233-.282.524-.565l5.304-5.172c.629-.613.92-.772 1.269-.876a1.82 1.82 0 011.054 0zm-.286.958a.825.825 0 00-.482 0c-.18.054-.326.139-.63.418l-.227.216L5.598 9.84c-.3.293-.385.39-.456.5a.76.76 0 00-.102.242c-.026.112-.037.224-.04.531l.002 6.807.005.073.074.006L8.999 18 9 14.268l.003-.17c.013-.448.083-.749.249-1.058a1.9 1.9 0 01.788-.788c.306-.164.6-.234 1.043-.249l.199-.003h1.45l.17.003c.448.013.749.083 1.058.249.337.18.608.45.788.788.164.306.234.6.249 1.043l.003.199L14.999 18l3.92-.002.073-.006.006-.073.002-.2v-6.615l-.005-.218a1.494 1.494 0 00-.035-.305.747.747 0 00-.102-.242l-.059-.084a3.571 3.571 0 00-.294-.315l-5.407-5.273c-.425-.414-.604-.545-.798-.615l-.06-.019z"></path>
                </svg>
              </NavLink>
            </div>
            <div className='nav-bar-item search' >
              <NavLink to='/search' exact={true}
                className="nav-link"
                activeClassName='active'>
                {/* <i className="fa fa-search" aria-hidden="true"></i> */}
                <svg
                  className="search-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.502.502 0 01-.708.708l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1a6.5 6.5 0 100 13 6.5 6.5 0 000-13z" fill="currentColor"></path>
                </svg>
                <input
                  placeholder="Search"
                  className='search-input'>
                </input>
              </NavLink>
            </div>
          </div>
          <div className='nav-bar-right'>
            <div className='nav-bar-item'>
              <NavLink to='/api/tasks/new' exact={true}
                className="nav-link"
                activeClassName='active'>
                <svg
                  className='burger-menu'
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd" transform="translate(4 3)">
                    <mask id="jd4FBg" fill="#fff">
                      <path d="M9 8h7a.5.5 0 1 1 0 1H9v7a.5.5 0 1 1-1 0V9H1a.5.5 0 0 1 0-1h7V1a.5.5 0 0 1 1 0v7z">
                      </path>
                    </mask>
                    <g mask="url(#jd4FBg)">
                      <path fill="currentColor" d="M-4-3h24v24H-4z">
                      </path>
                    </g>
                  </g>
                </svg>
                <path fill="currentColor" d="M-4-3h24v24H-4z"></path>
              </NavLink>
            </div>
            {/* <div className='nav-bar-item'>
              <NavLink to='/profile' exact={true}
                className="nav-link burger-menu"
                activeClassName='active'>
                Users
              </NavLink>
            </div> */}
            <div logout-div>
              <NavLink to='/logout' exact={true}
                activeClassName='active'>
                <LogoutButton />
              </NavLink>
            </div>
          </div>
        </div>
      </nav >
    )
  }

  return (
    <>
      {sessionNav}
    </>
  );
}

export default MainNav;