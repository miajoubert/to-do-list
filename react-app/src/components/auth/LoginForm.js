import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors([data[0]]);
    }
  };

  const demoLogin = async () => {
    await dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/app' />;
  }

  return (
    <div className='login-page-container'>
      <div className='login-form-div'>
        <div className='login-form-left'>
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
          className='login-form'
          onSubmit={onLogin}
        >
          <h1 className='login-title'>Log in</h1>
          <div className='login-error-div'>
            {errors.map((error, ind) => (
              <div key={ind}>
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
                {error}
              </div>
            ))}
          </div>
          <div className='input-div'>
            <label htmlFor='email'>Email</label>
            <input
              className='login-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='input-div'>
            <label htmlFor='password'>Password</label>
            <input
              className='login-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />

          </div>
          <button
            className='login-button'
            type='submit'
          >
            Login
          </button>
          <div className='form-add-links-logged'>Keep me logged in</div>
          <div className='form-add-links-pass'>Forgot your password?</div>
        </form>
        <div className='form-bottom-section'>
          <hr className='form-hr' />
          <div className='form-switch-div'>Don't have an account?
            <a
              href="/register"
              className='login-register-link'
            >
              Sign up
            </a>
            <div>
              Not ready to commit?
              <a
                onClick={demoLogin}
                className='login-register-link'
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
