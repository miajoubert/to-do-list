import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/SplashPage.js';
import NavBar from './components/NavBar';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SignUpForm2 from './components/auth/SignupForm2';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/logout' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/register' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/register/step_two' exact={true}>
          <SignUpForm2 />
        </Route>
        <ProtectedRoute path='/app' exact={true}>
          <NavBar />
        </ProtectedRoute>
        <ProtectedRoute path='/projects' exact={true}>
          <NavBar />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
