import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/projects";
import ProjectItem from "./ProjectItem";
import "./ProjectsSidebar.css"

const ProjectSidebar = ({ openSideBar }) => {
  const projectsState = useSelector(state => state.projects)
  const dispatch = useDispatch()
  console.log("my current projects!!!!!", projectsState)

  const projectItems = Object.values(projectsState)

  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])

  return (
    <>
      <div className="side-bar-container">
        <div className="project-sb-title">Projects</div>
        <ul className="project-list">
          {projectItems?.map(project => <ProjectItem key={project?.id} project={project} />)}

        </ul>
      </div>

    </>
  );
}

export default ProjectSidebar;
