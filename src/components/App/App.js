import './App.css';
import Main from '../Main/Main'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Navigation from '../Navigation/Navigation';
import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../context/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({})

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Navigation isOpen={false}/>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="movies" element={<MoviesCardList  />}/>
          <Route path="saved-movies" element={<MoviesCardList  />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="signin" element={<Login />}/>
          <Route path="signup" element={<Register />}/>
          <Route path="*" element={<Page404 />}/>
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;