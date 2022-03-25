import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllProjects } from "../../store/projects";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";
import "./ProjectsSidebar.css"

const ProjectSidebar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const projectsState = useSelector(state => state.projects)
  const dispatch = useDispatch()
  const history = useHistory();
  const { projectId } = useParams();

  const projectItems = Object.values(projectsState)
  projectItems.shift()

  const currentWindow = window.location.href.search("/app/archive")

  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch, sessionUser])

  if (projectItems.length < 1) return (
    <>
      <div className="side-bar-container">
        <div className="project-title-container">
          <div className="project-sb-title">Projects</div>
          <ProjectForm />
        </div>
        <div className="add-new-list-div">
          <i className="fas fa-plus new-project" />
          <div>
            Add a new project list above to get started!
          </div>
        </div>
        <ul className="project-list">
          <div className="archive-container">
            <div className={
              (currentWindow > 0) ? "selected project-div"
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
      </div >
    </>
  )

  else return (
    <>
      <div className="side-bar-container">
        <div className="project-title-container">
          <div className="project-sb-title">Projects</div>
          <ProjectForm />
        </div>

        <ul className="project-list">
          {projectItems && projectItems?.map(project => {
            return (
              <ProjectItem
                key={project?.id}
                project={project}
              />)
          })}

          <div className="archive-container">
            <div className={
              (currentWindow > 0) ? "selected project-div"
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
      </div >
    </>
  );
}

export default ProjectSidebar;
