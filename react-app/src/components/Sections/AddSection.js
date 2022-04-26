import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addASection } from '../../store/sections';


const AddSection = ({ currentSection, showSectionForm, projectId, focusField }) => {
  const sessionUser = useSelector(state => state.session?.user.id);
  const projectsState = useSelector(state => state.projects);

  const projects = Object.values(projectsState);
  if (!projectId) projectId = projects[0]?.id;

  const [errors, setErrors] = useState([]);
  const [project_id, setProjectId] = useState(projectId);
  const [section, setSection] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef(null);

  useEffect(() => {
    setProjectId(projectId)
    setErrors([])
  }, [projectId]);

  useEffect(() => {
    inputRef.current?.focus()
  }, [showSectionForm]);

  const handleAddSection = async (e) => {
    e.preventDefault();
    setErrors([])

    const payload = {
      project_id,
      section
    }

    const data = await dispatch(addASection(payload))

    if (data) {
      setErrors(data)
    }
    else {
      showSectionForm()
      setSection('')
      setErrors([])
    }
  };

  const handleCancel = () => {
    showSectionForm()
    setSection('')
    setErrors([])
  };

  return (
    <>
      <div className='new-task-container'>
        <form
          className='new-task-form'
          onSubmit={handleAddSection}
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
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Name this section"
            className='task-form-name'
            id={focusField}
            ref={inputRef}
            required
          />
        </form>
        <div className='form-task-button-div'>
          <button
            type='submit'
            className="submit-task-button"
            onClick={handleAddSection}
          >
            Add section
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

export default AddSection;
