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

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setloggedIn] = useState(false)

  const navigation = useNavigate()

  function handleSignIn(data) {
    setCurrentUser(data)
    setloggedIn(true)
  }

  function handleSignOut() {
    mainApi.logout()
        .then((res)=>{
            localStorage.removeItem('movies')
            setCurrentUser({})
            navigation('/')

        })
  }

  function handlePatchUserData(evt, data) {
    evt.preventDefault()
    mainApi.patchMyUserData({
        name: data.name,
        email: data.email,
    })
        .then(res => {
            setCurrentUser({name: res.name, email: res.email})
        })
}

  useEffect(()=>{
    mainApi.getMyUserData()
      .then(res => {
        setCurrentUser({_id: res._id, name: res.name, email: res.email})
        setloggedIn(true)
      })
      .catch(err => console.log(err))
  },[])

  return (
    <>
      <button onClick={()=>{

        mainApi.logout().then(res=> console.log(res))
        }}>Button</button>
        <span style={{color: 'blue'}}>User: name:{currentUser.name} email: {currentUser.email}</span>
      <CurrentUserContext.Provider value={currentUser}>
        <Navigation isOpen={false}/>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <MoviesCardList />
            </ProtectedRoute>
          }/>
          <Route path="saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <MoviesCardList />
            </ProtectedRoute>
          }/>
          <Route path="profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile updateCurrentUser={handleSignIn} onExit={handleSignOut} onPatch={handlePatchUserData}/>
            </ProtectedRoute>
          }/>
          <Route path="signin" element={<Login updateCurrentUser={handleSignIn} />}/>
          <Route path="signup" element={<Register updateCurrentUser={handleSignIn} />}/>
          <Route path="*" element={<Page404 />}/>
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;