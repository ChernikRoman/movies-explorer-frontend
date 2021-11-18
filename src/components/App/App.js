import './App.css';
import Main from '../Main/Main'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Navigation from '../Navigation/Navigation';
import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../context/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({})

  const navigation = useNavigate();

  function handleSignUp(data) {
    setCurrentUser(data)
  }

  useEffect(()=>{
    console.log(currentUser)
  }, [currentUser])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Navigation isOpen={false}/>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="movies" element={<MoviesCardList  />}/>
          <Route path="saved-movies" element={<MoviesCardList  />}/>
          <Route path="profile" element={<Profile updateCurrentUser={handleSignUp} />}/>
          <Route path="signin" element={<Login updateCurrentUser={handleSignUp} />}/>
          <Route path="signup" element={<Register updateCurrentUser={handleSignUp} />}/>
          <Route path="*" element={<Page404 />}/>
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;