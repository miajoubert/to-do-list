import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editATask } from '../../store/tasks';
import './EditTaskForm.css';

const EditTaskForm = ({ currentTask, showEditForm }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const projectsState = useSelector(state => state.projects);
  const sectionsState = useSelector(state => state.sections);

  const [project_id, setProjectId] = useState(currentTask?.project_id);
  const [section_id, setSectionId] = useState(currentTask?.section_id);
  const [task, setTask] = useState(currentTask?.task);
  const [description, setDescription] = useState(currentTask?.description);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const projects = Object.values(projectsState);
  const sections = Object.values(sectionsState)
    .filter(section => {
      return section?.project_id === +project_id
    });
  sections.unshift({ id: null, section: "---" })

  useEffect(() => {
    setTask(currentTask?.task)
    setDescription(currentTask?.description)
    setSectionId(currentTask?.section_id)
    setErrors([])
  }, [currentTask]);

  useEffect(() => {
    inputRef.current?.focus()
  }, [showEditForm]);

  const handleEditTask = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      ...currentTask,
      project_id,
      section_id,
      task,
      description
    }

    const data = await dispatch(editATask(payload))

    if (data) {
      setErrors(data)
    }
    else {
      setTask(currentTask?.task)
      setDescription(currentTask?.description)
      showEditForm(false)
    }
  };

  const handleCancel = () => {
    showEditForm()
    setTask(currentTask?.task)
    setDescription(currentTask?.description)
    setErrors([])
  };

  return (
    <>
      <div className='new-task-container'>
        <form
          className='new-task-form'
          onSubmit={handleEditTask}
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
            ref={inputRef}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className='task-form-description'
            required
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
          </div>
        </form>
        <div className='form-task-button-div'>
          <button
            type='submit'
            className="submit-task-button"
            onClick={handleEditTask}
          >
            Save
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

export default EditTaskForm;
