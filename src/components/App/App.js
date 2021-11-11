import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import img from '../../images/moviesCard/movie_pic.png'
import MoviesCard from '../MoviesCard/MoviesCard';
import Register from '../Register/Register';

function App() {
  return (
    <>
      <Register />
      {/* <Header />
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
