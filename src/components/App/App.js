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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)

  const navigation = useNavigate();

  function handleSignIn(data) {
    setCurrentUser(data)
    setIsAuth(true)
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