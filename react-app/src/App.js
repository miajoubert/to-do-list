import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserRoute from './components/auth/UserRoute';
import SplashPage from './components/SplashPage.js';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SignUpForm2 from './components/auth/SignupForm2';
import NavBar from './components/NavBar';
import MainApp from './components/MainApp';
import SearchResults from './components/SearchResults';
import ProjectForm from './components/Projects/ProjectForm';
import ProjectBody from './components/Projects/ProjectBody';
import TaskList from './components/Tasks/TaskList';
import MainNav from './components/MainNav';
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
        <UserRoute path='/' exact={true} >
          <SplashPage />
        </UserRoute>
        <UserRoute path='/login' exact={true}>
          <LoginForm />
        </UserRoute>
        <UserRoute path='/logout' exact={true}>
          <SplashPage />
        </UserRoute>
        <UserRoute path='/register' exact={true}>
          <SignUpForm />
        </UserRoute>
        <UserRoute path='/register/step_two' exact={true}>
          <SignUpForm2 />
        </UserRoute>
        <ProtectedRoute path={[
          '/app',
          '/app/projects/:id']}
          exact={true}
        >
          <MainApp />
        </ProtectedRoute>
        <ProtectedRoute path='/search' exact={true}>
          <SearchResults />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
