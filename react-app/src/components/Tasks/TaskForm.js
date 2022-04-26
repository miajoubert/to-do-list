import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllProjects } from '../../store/projects';
import { getAllSections } from '../../store/sections';
import { addATask } from '../../store/tasks';
import './TaskForm.css';

const TaskForm = ({ currentTask, showTaskForm, projectId, sectionId, focusField }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const projectsState = useSelector(state => state.projects);
  const sectionsState = useSelector(state => state.sections)

  const [errors, setErrors] = useState([]);
  const [project_id, setProjectId] = useState(projectId);
  const [section_id, setSectionId] = useState(sectionId);
  const [task, setTask] = useState(currentTask?.task);
  const [description, setDescription] = useState(currentTask?.description);
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef(null);

  const projects = Object.values(projectsState);
  if (!projectId) projectId = projects[0]?.id;

  const sections = Object.values(sectionsState)
    .filter(section => {
      return section?.project_id === +project_id
    });
  sections.unshift({ id: null, section: "---" })

  useEffect(async () => {
    await dispatch(getAllProjects())
    await dispatch(getAllSections())
  }, [dispatch]);

  useEffect(() => {
    setProjectId(projectId)
    setSectionId(sectionId)
    setErrors([])
  }, [projectId, sectionId]);

  useEffect(() => {
    inputRef.current?.focus()
  }, [showTaskForm]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setErrors([])

    const payload = {
      project_id,
      section_id,
      task,
      description
    }

    const data = await dispatch(addATask(payload))

    if (data) {
      setErrors(data)
    }
    else {
      setTask('')
      setDescription('')
      setSectionId(sectionId)
      setErrors([])
    }
  };

  const handleCancel = () => {
    showTaskForm()
    setTask('')
    setDescription('')
    setErrors([])
  };

  return (
    <>
      <div className='new-task-container'>
        <form
          className='new-task-form'
          onSubmit={handleAddTask}
        >
          <div className='signup-error-div'>
            {errors.map((error, ind) => (
              <div key={ind}>
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
                {error}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., Pick up groceries"
            className='task-form-name'
            id={focusField}
            ref={inputRef}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className='task-form-description'
          />
          <div className='selects-container'>
            <select
              className='select-project'
              value={project_id}
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects?.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            {sections.length ?
              <select
                className='select-project'
                value={section_id}
                onChange={(e) => setSectionId(e.target.value)}
              >
                {sections?.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.section}
                  </option>
                ))}
              </select>
              : <div></div>}
          </div>
        </form>
        <div className='form-task-button-div'>
          <button
            type='submit'
            className="submit-task-button"
            onClick={handleAddTask}
          >
            Add task
          </button>
          <button
            onClick={handleCancel}
            className='cancel-task-button'
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskForm;
