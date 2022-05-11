import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies'
import { Login } from '../Login/Login';
import { Register } from '../Register/Register'
import { Profile } from '../Profile/Profile';
import { Error } from '../Error/Error';
import './App.sass';

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route path="/movies" element={<Movies />} />

          <Route path="/saved-movies" element={<SavedMovies />} />

          <Route path="/signin" element={<Login />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/signup" element={<Register />} />

          <Route path="*" element={<Error />} />

        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;
