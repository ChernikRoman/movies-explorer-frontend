import { useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import moviesApi from "../../utils/MoviesApi"
import RenderedCards from "../RenderedCards/RenderedCards"
import Preloader from "../Preloader/Preloader"
import mainApi from "../../utils/MainApi"
import filteringByLenght from "../../utils/filteringByLenght"
import setLikedCards from "../../utils/setLikedCards"

export default function MoviesCardList(props) {
    const [moviesList, setMoviesList] = useState([]);
    const [numberOfCards, setNumberOfCards] = useState(7);
    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);
    const [searchingString, setSearchingString] = useState('');
    const [shortMovieTumbler, setShortMovieTumbler] = useState(false);
    const [buferMovies, setBuferMovies] = useState([]);
    const [error, setError] = useState('');

    function handleSubmitForm(evt) {
        evt.preventDefault();
        setError('')
        setPreloaderIsOpen(true)
        const filteredCard = []
        const localStorageMovie = JSON.parse(localStorage.getItem('movies'));
        if (!localStorageMovie) {
            moviesApi.getMovies()
                .then(movies => {
                    mainApi.getSavedMovies()
                        .then((savedMovies)=>{
                            const updatedCard = setLikedCards(savedMovies, movies)
                            localStorage.setItem('movies', JSON.stringify(updatedCard))
                            return updatedCard
                        })
                        .then((cards) => {
                            cards.forEach((obj)=>{
                                if (obj.nameRU.toLowerCase().includes(searchingString.trim().toLowerCase())) {
                                    filteredCard.push(obj)
                                }
                            })
                            if (shortMovieTumbler) {
                                setMoviesList(filteringByLenght(filteredCard))
                                if (filteringByLenght(filteredCard).length === 0) {
                                    setError('Ничего не найдено')
                                    setTimeout(() => {
                                        setError('')
                                    }, 3000);
                                }
                            } else {
                                setMoviesList(filteredCard)
                                if (filteredCard.length === 0) setError('Ничего не найдено')
                            }   
                            setPreloaderIsOpen(false)                            
                        })
                })
                .catch(()=>{
                    setError(`«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
                    Подождите немного и попробуйте ещё раз»`)
                })                
        } else {
            localStorageMovie.forEach((obj)=>{
                if (obj.nameRU.toLowerCase().includes(searchingString.trim().toLowerCase())) {
                    filteredCard.push(obj)
                }
            })
            setBuferMovies(filteredCard)
            if (shortMovieTumbler) {
                setMoviesList(filteringByLenght(filteredCard))
                if (filteringByLenght(filteredCard).length === 0) setError('Ничего не найдено')
            } else {
                setMoviesList(filteredCard)
                if (filteredCard.length === 0) setError('Ничего не найдено')
            }
            setPreloaderIsOpen(false)
        }
    }

    function handleChangeSerachform(evt) {
        setSearchingString(evt.target.value)
    }

    function handleChangeShortMovieTumbler() {
        setShortMovieTumbler(!shortMovieTumbler)
        setError('')
        if (shortMovieTumbler === false) {
            setBuferMovies(moviesList)
            setMoviesList(filteringByLenght(moviesList))
        } else {
            setMoviesList(buferMovies)
            setBuferMovies([])
        }
    }

    function handleMoreButtonClick() {
        if(moviesList.length > numberOfCards) {
            setNumberOfCards(numberOfCards + 7)
        }
    }

    function handleSaveMovie(data) {
            mainApi.createMovie(data)
              .then(res => {
                let movies = JSON.parse(localStorage.getItem('movies'))
                const movieIndex = movies.findIndex((movie) => { return movie.id === res.movieId })
                movies[movieIndex]._id = res._id
                localStorage.setItem('movies', JSON.stringify(movies))
                })
              .catch(err => console.log(err))
    }

    function handleDeleteMovie(cardId) {
        const movies = JSON.parse(localStorage.getItem('movies'))
        const movieIndex = movies.findIndex((movie) => { return movie.id === cardId })
        mainApi.deleteMovie(movies[movieIndex]._id)
            .then(res => {
                delete movies[movieIndex]._id
                localStorage.setItem('movies', JSON.stringify(movies))
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        if (props.viewportWidth <= 580) {
            setNumberOfCards(5)
        } else {
            setNumberOfCards(7)
        }
    }, [props.viewportWidth])

    return (
        <>
            <Header windowWidth={props.viewportWidth} loggedIn={props.loggedIn} />
            <SearchForm onSubmit={handleSubmitForm} onChange={handleChangeSerachform} onChangeTumbler={handleChangeShortMovieTumbler}/>
            <section className="moviesCardList">
                <Preloader isOpen={preloaderIsOpen}/>
                <div className="moviesCardList__container">
                    <span>{error}</span>
                    <RenderedCards cards={moviesList} numberOfCards={numberOfCards} onSave={handleSaveMovie} onDelete={handleDeleteMovie}/>
                </div>
                {
                    numberOfCards <= moviesList.length
                    ?<button className="movieCardList__more-button" onClick={handleMoreButtonClick}>Еще</button>
                    :''
                }
            </section>
            <Footer /> 
        </>
    )
}