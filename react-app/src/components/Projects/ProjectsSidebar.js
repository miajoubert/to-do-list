import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProjects } from "../../store/projects";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";
import "./ProjectsSidebar.css"

const ProjectSidebar = ({ showTaskForm }) => {
  const projectsState = useSelector(state => state.projects)
  const dispatch = useDispatch()
  const history = useHistory();

  const projectItems = Object.values(projectsState)
  projectItems.shift()

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
          <div className="archive-container">
            <div className={
              window.location.href.search("/app/archive") > 0
                ? "selected project-div"
                : "project-div"
            }
              onClick={() => history.push("/app/archive")}
            >
              <div className="project-item-div ">
                <i>Completed Tasks</i>
              </div>
            </div>
          </div>
        </ul>
      </div>

    </>
  );
}

export default ProjectSidebar;
