import './App.css';
import Main from '../Main/Main'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Navigation from '../Navigation/Navigation';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';

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
            setCurrentUser({})
            setloggedIn(false)
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

  function submitSearchForm(searchingString, ) {
    if (searchingString.length >= 3) {
        // setPreloaderIsOpen(true)
        // setKeyWords()
        // console.log(keyWords)
        // moviesApi.getMovies()
        //     .then(res => {
        //         setPreloaderIsOpen(false)
        //         localStorage.setItem('movies', JSON.stringify(res))
        //         setMoviesList(JSON.parse(localStorage.getItem('movies')))
        //     })
        //     .catch(()=>{
        //         setError(`«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
        //         Подождите немного и попробуйте ещё раз»`)
    //         })
    // } else {
    //     console.log('Нужно ввести ключевое слово не меньше 3х символов')
    }
}

  useEffect(()=>{
    mainApi.getMyUserData()
      .then(res => {
        setCurrentUser({_id: res._id, name: res.name, email: res.email})
        setloggedIn(true)
        setIsLoaded(true)
      })
      .catch(err => {
        setIsLoaded(true)
        console.log(err)
      })
      window.addEventListener('resize', ()=>{ setTimeout(()=>{ setviewportWidth(window.innerWidth) }, 1000) })
  },[])

  return (
    <>
      <button onClick={()=>{
          setIsLoaded(true)
        }}>Button</button>
        <span style={{color: 'blue'}}>User: name:{currentUser.name} email: {currentUser.email} isLoaded={isLoaded ?'v' :'x'} loggedIn={loggedIn ?'v' :'x'}</span>
      <CurrentUserContext.Provider value={currentUser}>
        <Navigation isOpen={false}/>
        <Routes>
          <Route path="/" element={<Main windowWidth={viewportWidth} loggedIn={loggedIn}/>}/>
          <Route path="movies" element={
            <ProtectedRoute loggedIn={loggedIn} isLoaded={isLoaded}>
              <MoviesCardList viewportWidth={viewportWidth} onSumbitForm={submitSearchForm} loggedIn={loggedIn}/>
            </ProtectedRoute>
          }/>
          <Route path="saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn} isLoaded={isLoaded}>
              <MoviesCardList viewportWidth={viewportWidth} />
            </ProtectedRoute>
          }/>
          <Route path="profile" element={
            <ProtectedRoute loggedIn={loggedIn} isLoaded={isLoaded}>
              <Profile updateCurrentUser={handleSignIn} onExit={handleSignOut} onPatch={handlePatchUserData} windowWidth={viewportWidth} loggedIn={loggedIn}/>
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