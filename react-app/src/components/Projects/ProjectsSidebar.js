import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/projects";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";
import "./ProjectsSidebar.css"

const ProjectSidebar = ({ openSideBar }) => {
  const projectsState = useSelector(state => state.projects)
  const dispatch = useDispatch()

  const projectItems = Object.values(projectsState)
  console.log("THIS IS MY SIDEBAR PROJ", projectItems)
  projectItems.shift()
  console.log("THESE ARE MY NEW PROJECTS", projectItems)

  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])


  return (
    <>
      <div className="side-bar-container">
        <div className="project-title-container">
          <div className="project-sb-title">Projects</div>
          <ProjectForm />
        </div>
        <ul className="project-list">
          {projectItems?.map(project => {
            return (
              <ProjectItem
                key={project?.id}
                project={project}
              />)
          })}
        </ul>
      </div>

    </>
  );
}

export default ProjectSidebar;
