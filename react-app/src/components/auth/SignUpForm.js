import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {
  const userEmail = localStorage.user
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState(userEmail);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    localStorage.setItem('user', email)
    const data = await dispatch(signUp(email));
    if (data) {
      setErrors(data)
    } else {
      history.push("/register/step_two")
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className='signup-page-container'>
      <div className='signup-form-div'>
        <div className='form-left'>
          <a
            href="/"
            className='site-name'>
            <img
              height="32px"
              src="https://w7.pngwing.com/pngs/957/657/png-transparent-todoist-task-management-computer-software-task-management-errands-angle-logo-microsoft-store.png"
              className='form-logo'
            />
            <div className='form-name'>todolist</div>
          </a>
        </div>

        <form
          className='signup-form'
          onSubmit={onSignUp}
        >
          <h1 className='signup-title'>Sign up</h1>
          <div className='signup-div'>
            <label>Email</label>
            <div className='signup-error-div'>
              {errors.map((error, ind) => (
                <div key={ind}>
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                  {error}
                </div>
              ))}
            </div>
            <input
              className='signup-input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <button
            className='signup-button'
            type='submit'
          >
            Sign up with Email
          </button>
          <div className='su-form-add-text'>
            By continuing, you agree to Todolist's Terms of Service and Privacy Policy, which do not exist.
          </div>
        </form>
        <div className='su-form-bottom-section'>
          <hr className='form-hr' />
          <div className='form-switch-div'>Already signed up?
            <a
              href="/login"
              className='signup-login-link'
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
