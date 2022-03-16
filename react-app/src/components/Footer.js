import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <>
      <hr className="footer-hr" />
      <div className='footer-container'>
        <div className='footer-top'>
          <img
            width="33%"
            src="https://todoist.com/_next/static/images/peace@2x_158f4453627629ae1dd3ec115a559630.webp"
          />
          <div className='resources'>
            <p className="footer-header">RESOURCES</p>
            <ul className="footer-ul">
              <li>Alembic</li>
              <li>CSS</li>
              <li>Flask</li>
              <li>JavaScript</li>
              <li>PostgreSQL</li>
              <li>SQLAlchemy</li>
              <li>React</li>
              <li>Redux</li>
            </ul>
          </div>
          <div className="resources">
            <p>COMPANY</p>
            <ul className="footer-ul">
              <li>
                <a
                  href='https://github.com/miajoubert'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="fab fa-github footer-links"
                >Mia Joubert</a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/in/miajoubert/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="fab fa-linkedin footer-links"
                >Mia Joubert</a>
              </li>
            </ul>
          </div>
        </div>

        <div className='footer-bottom'>
          <div>
            <a
              href='https://github.com/miajoubert/to-do-list'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
          <div className='copyright'>
            © 2022 Todoist Clone
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
