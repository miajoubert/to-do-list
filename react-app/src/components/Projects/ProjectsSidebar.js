import React from "react";
import "./ProjectsSidebar.css"

const ProjectSidebar = ({ hideSideBar }) => {


  return (
    <>
      <div
        hidden={hideSideBar}
        className="side-bar-container">PROJECT LIST SIDEBAR</div>
    </>
  );
}

export default ProjectSidebar;
