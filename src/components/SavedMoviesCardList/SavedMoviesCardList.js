import { useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import RenderedCards from "../RenderedCards/RenderedCards"
import Preloader from "../Preloader/Preloader"
import mainApi from "../../utils/MainApi"
import transform from '../../utils/transformArr'
import filteringByLenght from "../../utils/filteringByLenght"

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
        mainApi.getSavedMovies()
            .then(res => {
                res.forEach((obj)=>{
                    if (obj.nameRU.toLowerCase().includes(searchingString.trim().toLowerCase())) {
                        filteredCard.push(obj)
                    }
                })
                setBuferMovies(transform(filteredCard))
                if (shortMovieTumbler) {
                    setMoviesList(transform(filteringByLenght(filteredCard)))
                    if (filteringByLenght(filteredCard).length === 0) setError('Ничего не найдено')
                } else {
                    setMoviesList(transform(filteredCard))
                    if (filteredCard.length === 0) setError('Ничего не найдено')
                }
                setPreloaderIsOpen(false)
            })
            .catch(()=>{
                setError(`«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
                Подождите немного и попробуйте ещё раз»`)
            })
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

    function handleDeleteMovie(cardId) {
        const movies = JSON.parse(localStorage.getItem('movies'))
        const movieIndex = movies.findIndex((movie) => { return movie.id === cardId })
        mainApi.deleteMovie(movies[movieIndex]._id)
            .then(res => {
                delete movies[movieIndex]._id
                localStorage.setItem('movies', JSON.stringify(movies))
                let moviesArrUpdated = moviesList.filter((element) => {
                    console.log(element)
                    return element.id !== cardId
                })
                setMoviesList(moviesArrUpdated)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.viewportWidth <= 580) {
            setNumberOfCards(5)
        } else {
            setNumberOfCards(7)
        }
    }, [props.viewportWidth])

    useEffect(() => {
        mainApi.getSavedMovies()
            .then((res) => {
                setMoviesList(transform(res))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <Header windowWidth={props.viewportWidth} loggedIn={props.loggedIn} />
            <SearchForm onSubmit={handleSubmitForm} onChange={handleChangeSerachform} onChangeTumbler={handleChangeShortMovieTumbler}/>
            <section className="savedMoviesCardList">
                <Preloader isOpen={preloaderIsOpen}/>
                <div className="savedMoviesCardList__container">
                    <span>{error}</span>
                    <RenderedCards cards={moviesList} numberOfCards={numberOfCards} onDelete={handleDeleteMovie}/>
                </div>
                {
                    numberOfCards < moviesList.length
                    ?<button className="savedMovieCardList__more-button" onClick={handleMoreButtonClick}>Еще</button>
                    :''
                }
            </section>
            <Footer /> 
        </>
    )
}