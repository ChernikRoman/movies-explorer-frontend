import { useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import moviesApi from "../../utils/MoviesApi"
import RenderedCards from "../RenderedCards/RenderedCards"
import Preloader from "../Preloader/Preloader"
import mainApi from "../../utils/MainApi"
import checkUnuque from "../../utils/checkUnique"
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
        const localStorageMovie = JSON.parse(localStorage.getItem('movies'));
        if (!localStorageMovie) {
            moviesApi.getMovies()
                .then(res => {
                    res.forEach((obj)=>{
                        if (obj.nameRU.toLowerCase().includes(searchingString.trim().toLowerCase())) {
                            filteredCard.push(obj)
                        }
                    })
                    localStorage.setItem('movies', JSON.stringify(res))
                    if (shortMovieTumbler) {
                        setMoviesList(filteringByLenght(filteredCard))
                        if (filteringByLenght(filteredCard).length === 0) setError('Ничего не найдено')
                    } else {
                        setMoviesList(filteredCard)
                        if (filteredCard.length === 0) setError('Ничего не найдено')
                    }
                    setPreloaderIsOpen(false)
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
              .catch(err => console.log(err))
    }

    function handleDeleteMovie(data) {
        mainApi.deleteMovie(data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        if (props.viewportWidth <= 580) {
            setNumberOfCards(5)
        } else {
            setNumberOfCards(7)
        }
    }, [props.viewportWidth])

    useEffect(()=>{
        console.log(buferMovies)
    }, [buferMovies])

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