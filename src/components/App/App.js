import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register'
import { Profile } from '../Profile/Profile';
import { Error } from '../Error/Error';
import { Footer } from '../Footer/Footer';
import './App.sass';

function App() {
  // const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="app">
      <Switch>

        <Route exact path="/">
          <Header isLogin={false} />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <Header isLogin={true} />
          <Movies />
          <Footer />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/profile">
          <Header isLogin={true} />
          <Profile />
        </Route>

        <Route path="*">
          <Error />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
