import React from "react";
import './SplashPage.css'

const SplashPage = () => {
  return (
    <>
      <div className="splash-container">
        <h1 className="splash-main-text">
          Organize it all with Todolist
        </h1>
        <a href="/register" >
          <button className="get-started">
            Get Started
          </button>
        </a>
      </div>
      <div className="splash-main-pic">
        <img
          width="100%"
          src="https://todoist.com/_next/static/images/header@2x_b52d8f7c7bf19d6c702569d1072ed6a2.webp"
        />
        <div className="screenshot-splash">
          <img
            width="100%"
            src="https://todoist.com/_next/static/images/header-bg@2x_d49daad6e384274c19f96f6aad65a615.webp"
          />
          <img
            width="100%"
            src="https://todoist.com/_next/static/images/screenshot@2x_44c1cf78bc12457546d889573e04345a.webp"
          />
        </div>
        <div className="final-pic">
        </div>
      </div>
    </>
  )
}

export default SplashPage;
