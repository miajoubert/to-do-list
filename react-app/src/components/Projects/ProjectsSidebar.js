import React from "react";
import { useSelector } from "react-redux";
import "./ProjectsSidebar.css"

const ProjectSidebar = ({ openSideBar }) => {
  const projectsState = useSelector(state => state.projects)


  return (
    <>
      <div
        className="side-bar-container">PROJECT LIST SIDEBAR</div>
    </>
  );
}

export default ProjectSidebar;
