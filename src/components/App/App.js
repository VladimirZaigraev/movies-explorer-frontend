import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register'
import { Profile } from '../Profile/Profile';
import { Error } from '../Error/Error';
import './index.sass';

function App() {
  return (
    <div className="app">
      <Switch>

        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/error">
          <Error />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>


      </Switch>
    </div>
  );
}

export default App;
