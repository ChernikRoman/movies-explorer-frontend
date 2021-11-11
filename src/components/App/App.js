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

function App() {
  return (
    <>
    <Page404 />
    {/* <Login/> */}
      {/* <Register />
      <Header />
      <Main />
      <SearchForm />
      <MoviesCardList>
        <MoviesCard name="Name movie" img={img} duration="01:17"/>
      </MoviesCardList>
      <Footer /> */}
    </>
  );
}

export default App;
