import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Form.css';

const FormContext = React.createContext();

export function FormProvider({ children }) {
  const formRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(formRef.current);
  }, [])

  return (
    <>
      <FormContext.Provider value={value}>
        {children}
      </FormContext.Provider>
      <div ref={formRef} />
    </>
  );
}

export function Form({ onClose, children }) {
  const formNode = useContext(FormContext);
  if (!formNode) return null;

  return ReactDOM.createPortal(
    <div id="form-context">
      <div id="form-content">
        {children}
      </div>
      <div className='buttons'>
        <button>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>,
    formNode
  );
}
