import './App.css';
import Main from '../Main/Main'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Navigation from '../Navigation/Navigation';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import SafariPage from '../SafariPage/SafariPage';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setloggedIn] = useState(false)
  const [viewportWidth, setviewportWidth] = useState(window.innerWidth)
  const [isLoaded, setIsLoaded] =useState(false);

  const navigation = useNavigate()

  function handleSignIn(data) {
    setCurrentUser(data)
    setloggedIn(true)
  }

  function handleSignOut() {
    mainApi.logout()
        .then((res)=>{
            localStorage.removeItem('movies')
            localStorage.removeItem('currentUser')
            setCurrentUser({})
            setloggedIn(false)
            navigation('/')
        })
  }

  function updateCurrentUser(data) {
    setCurrentUser(data)
  }

  useEffect(()=>{
    if(window.navigator.vendor.includes('Apple')) {
      navigation('safari');
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      setCurrentUser({_id: currentUser._id, name: currentUser.name, email: currentUser.email})
      setloggedIn(true)
      setIsLoaded(true)
    }
    setIsLoaded(true)
    window.addEventListener('resize', ()=>{ setTimeout(()=>{ setviewportWidth(window.innerWidth) }, 1000) })
  },[])

  return (
    isLoaded
    ? <>
      <CurrentUserContext.Provider value={currentUser}>
        <Navigation isOpen={false}/>
        <Routes>
          <Route path="/" element={<Main windowWidth={viewportWidth} loggedIn={loggedIn}/>}/>
          <Route path="movies" element={
            <ProtectedRoute loggedIn={loggedIn} isLoaded={isLoaded}>
              <MoviesCardList viewportWidth={viewportWidth} loggedIn={loggedIn}/>
            </ProtectedRoute>
          }/>
          <Route path="saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn} isLoaded={isLoaded}>
              <SavedMoviesCardList viewportWidth={viewportWidth} loggedIn={loggedIn} />
            </ProtectedRoute>
          }/>
          <Route path="profile" element={
            <ProtectedRoute loggedIn={loggedIn} isLoaded={isLoaded}>
              <Profile currentUser={currentUser} updateCurrentUser={handleSignIn} onExit={handleSignOut} onUpdateCurrentUser={updateCurrentUser} windowWidth={viewportWidth} loggedIn={loggedIn}/>
            </ProtectedRoute>
          }/>
          <Route path="signin" element={<Login updateCurrentUser={handleSignIn} isLoggedIn={loggedIn} />}/>
          <Route path="signup" element={<Register updateCurrentUser={handleSignIn} isLoggedIn={loggedIn} />}/>
          <Route path="safari" element={<SafariPage />}/>
          <Route path="*" element={<Page404 />}/>
        </Routes>
      </CurrentUserContext.Provider>
    </>
    :null
  );
}

export default App;