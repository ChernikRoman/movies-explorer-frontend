import './App.css';
import Main from '../Main/Main'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Navigation from '../Navigation/Navigation';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import reactDom from 'react-dom';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)


  function handleSignIn(data) {
    setCurrentUser(data)
    setIsAuth(true)
  }

  useEffect(()=>{
    mainApi.getMyUserData()
      .then(res => setCurrentUser({_id: res._id, name: res.name, email: res.email}))
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Navigation isOpen={false}/>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="movies" element={<ProtectedRoute component={
            <MoviesCardList />
          } isAuth={isAuth} />}/>
          <Route path="saved-movies" element={<ProtectedRoute component={
            <MoviesCardList />
          } isAuth={isAuth} />}/>
          <Route path="profile" element={<ProtectedRoute component={
            <Profile updateCurrentUser={handleSignIn}/>
          } isAuth={isAuth} />}/>
          <Route path="signin" element={<Login updateCurrentUser={handleSignIn} />}/>
          <Route path="signup" element={<Register updateCurrentUser={handleSignIn} />}/>
          <Route path="*" element={<Page404 />}/>
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;