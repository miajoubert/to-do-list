import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp2 } from '../../store/session';
import './SignupForm2.css'

const SignUpForm2 = () => {
  const [errors, setErrors] = useState([]);
  const email = localStorage['user'];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onSignUp = async (e) => {
    e.preventDefault();
    let data = [];
    if (password === "Password" || password === "Password") {
      data = [`Password cannot be "${password}".`]
      setErrors(data)
    }
    if (password.length < 8) {
      data = [...data, "Password must be at least 8 characters."]
      setErrors(data)
    }
    if (password != confirm_password) {
      data = [...data, "Passwords must match."]
      setErrors(data)
    } else {
      console.log("GOT INTO MY FINAL STATEMENT!!!!!!!!!!!!")
      data = await dispatch(signUp2(
        email,
        username,
        password
      ));
      console.log("THE DATA IS _____________________", data)
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/app' />;
  }

  return (
    <div className='signup2-page-container'>
      <div className='signup2-form-div'>
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
        <div className='back-to-previous'>
          <a href="/register">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
            {email}
          </a>
        </div>
        <form
          className='signup2-form'
          onSubmit={onSignUp}
        >
          <h1 className='signup-title'>Almost there</h1>
          <div className='signup-error-div'>
            {errors.map((error, ind) => (
              <div key={ind}>
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
                {error}
              </div>
            ))}
          </div>
          <div className='signup-div'>
            <label>Your name</label>
            <input
              className='signup-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='signup-div'>
            <label>Password</label>
            <input
              className='signup-input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='signup-div'>
            <label>Confirm Password</label>
            <input
              className='signup-input'
              type='password'
              name='repeat_password'
              onChange={updateConfirmPassword}
              value={confirm_password}
              required={true}
            ></input>
          </div>
          <div className='form-password-text'>
            Your password must be at least 8 characters long. Avoid common words or patterns.
          </div>
          <button
            className='signup2-button'
            type='submit'
          >
            Sign up with Email
          </button>
          <div className='form-add-text'>Keep me logged in</div>
        </form>
        <div className='form2-bottom-section'>
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
      </div >
    </div >
  );
};

export default SignUpForm2;
