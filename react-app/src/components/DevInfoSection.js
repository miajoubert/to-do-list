import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from '../components/auth/LogoutButton'
import "./DevInfoSection.css"

const DevInfoSection = () => {
  return (
    <>
      <div className='user-dropdown-div'>
        <div className="split-section logout-section">
          <div className="logout-button-container">
            <NavLink
              className={"logout-navlink"}
              to='/logout' exact={true}>
              <LogoutButton />
            </NavLink>
          </div>
        </div>

        <div className="dev-info">
          <div className="dev-line-div">Developer Information: </div>
          <div className="split-section">
            <a
              href='https://www.linkedin.com/in/miajoubert/'
              target='_blank'
              rel='noopener noreferrer'
              className="linkedin-main-footer"
            >
              <i className="fab fa-linkedin space-name main-linkedin" />
              Mia Joubert
            </a>
          </div>

          <div className="split-section">
            <a
              href='https://github.com/miajoubert'
              target='_blank'
              rel='noopener noreferrer'
              className="github-main-footer"
            >
              <i className="fab fa-github space-name main-github" />
              Mia Joubert
            </a>
          </div>

          <div className="split-section">
            <a
              href='https://github.com/miajoubert/to-do-list'
              target='_blank'
              rel='noopener noreferrer'
              className="github-footer"
            >
              <i className="fab fa-github space-name tdl-github"></i>
              Todolist
            </a>
          </div>
        </div>

        <div className='drop-down-copyright'>
          © 2022 Todoist Clone
        </div>
      </div>
    </>
  );
}

export default DevInfoSection;
