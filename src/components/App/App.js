import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import img from '../../images/moviesCard/movie_pic.png'
import MoviesCard from '../MoviesCard/MoviesCard';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Preloader from '../Preloader/Preloader'
import Navigation from '../Navigation/Navigation';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Navigation isOpen={false}/>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="movies" element={<MoviesCardList />}/>
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
