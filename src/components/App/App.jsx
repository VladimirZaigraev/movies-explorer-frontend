import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register'
import './index.sass';
//import { Footer } from '../Footer/Footer';
import { Error } from '../Error/Error';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/">
          <Main />
        </Route>
        <Route
          path="/movies">
          <Movies />
        </Route>
        <Route
          path="/signin">
          <Login />
        </Route>
        <Route
          path="/signup">
          <Register />
        </Route>
        <Route
          path="/error">
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
