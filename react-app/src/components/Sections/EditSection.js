import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editASection } from '../../store/sections';


const EditSection = ({ currentSection, showEditForm, showSectionMenu }) => {
  const sessionUser = useSelector(state => state.session?.user.id);

  const [errors, setErrors] = useState([]);
  const [section_id, setSectionId] = useState(currentSection.id)
  const [section, setSection] = useState(currentSection?.section);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  console.log("CURRENT SECTION", section_id)

  useEffect(() => {
    setSectionId(currentSection.id)
    setErrors([])
  }, [section_id]);

  useEffect(() => {
    inputRef.current?.focus()
  }, [showEditForm]);

  const handleEditSection = async (e) => {
    e.preventDefault();
    setErrors([])

    const payload = {
      ...currentSection,
      section
    }

    const data = await dispatch(editASection(payload))

    if (data) {
      setErrors(data)
    }
    else {
      setSection('')
      setErrors([])
      showEditForm()
      showSectionMenu()
    }
  };

  const handleCancel = () => {
    showEditForm()
    showSectionMenu()
    setSection('')
    setErrors([])
  };

  return (
    <>
      <div className='new-task-container'>
        <form
          className='new-task-form'
          onSubmit={handleEditSection}
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
            // id={focusField}
            // ref={inputRef}
            required
          />
        </form>
        <div className='form-task-button-div'>
          <button
            type='submit'
            className="submit-task-button"
            onClick={handleEditSection}
          >
            Edit section
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

export default EditSection;
