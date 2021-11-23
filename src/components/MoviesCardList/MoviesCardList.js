import { useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import moviesApi from "../../utils/MoviesApi"
import RenderedCards from "../RenderedCards/RenderedCards"
import Preloader from "../Preloader/Preloader"
import mainApi from "../../utils/MainApi"

export default function MoviesCardList(props) {
    const [moviesList, setMoviesList] = useState([]);
    const [numberOfCards, setNumberOfCards] = useState(95);
    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);
    const [keyWords, setKeyWords] = useState('');
    const [error, setError] = useState('');

    function submitSearchForm(evt) {
        evt.preventDefault();
        const searchingString = evt.target.querySelector('input').value;
        if (searchingString) {
            setPreloaderIsOpen(true)
            setKeyWords(searchingString.split(' '))
            moviesApi.getMovies()
                .then(res => {
                    setPreloaderIsOpen(false)
                    localStorage.setItem('movies', JSON.stringify(res))
                    setMoviesList(JSON.parse(localStorage.getItem('movies')))
                })
                .catch(()=>{
                    setError(`«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
                    Подождите немного и попробуйте ещё раз»`)
                })
        } else {
            console.log('Нужно ввести ключевое слово')
        }
    }

    function handleMoreButtonClick() {
        if(moviesList.length > numberOfCards) {
            setNumberOfCards(numberOfCards + 7)
        } else {
            alert('done')
        }
    }

    function handleSaveMovie(data) {
            mainApi.createMovie(data)
              .then(res => {
                let movie = JSON.parse(localStorage.getItem('movies'))
                movie[res.movieId - 1]._id = res._id
                localStorage.setItem('movies', JSON.stringify(movie))
                console.log(JSON.parse(localStorage.getItem('movies')))
                })
              .catch(err => console.log('Ошибка: ' + err))
    }

    function handleDeleteMovie(data) {
        mainApi.deleteMovie(data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        const localStorageMovies = JSON.parse(localStorage.getItem('movies'));
        if (localStorageMovies) {
            setMoviesList(localStorageMovies)
        }
        if (props.viewportWidth <= 580) {
            setNumberOfCards(5)
        } else {
            setNumberOfCards(7)
        }
    }, [])

    return (
        <>
            <Header windowWidth={props.viewportWidth}/>
            <SearchForm onSubmitSearchForm={submitSearchForm} />
            <section className="moviesCardList">
                <Preloader isOpen={preloaderIsOpen}/>
                <div className="moviesCardList__container">
                    <RenderedCards cards={moviesList} numberOfCards={numberOfCards} onSave={handleSaveMovie} onDelete={handleDeleteMovie}/>
                </div>
                {
                    error,
                    numberOfCards <= moviesList.length
                    ?<button className="movieCardList__more-button" onClick={handleMoreButtonClick}>Еще</button>
                    :''
                }
            </section>
            <Footer /> 
        </>
    )
}