import { useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import moviesApi from "../../utils/MoviesApi"
import RenderedCards from "../RenderedCards/RenderedCards"
import Preloader from "../Preloader/Preloader"
import mainApi from "../../utils/MainApi"
import checkUnuque from "../../utils/checkUnique"
import transform from "../../utils/transformArr"

export default function SavedMoviesCardList(props) {
    const [moviesList, setMoviesList] = useState([]);
    const [numberOfCards, setNumberOfCards] = useState(7);
    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);
    const [searchingString, setSearchingString] = useState('')
    const [error, setError] = useState('');

    function handleSubmitForm(evt) {
        evt.preventDefault();
        if (searchingString.length >= 3) {
            setError('')
            setPreloaderIsOpen(true)
            const keyWords = searchingString.split(' ')
            const filteredCard = []
            mainApi.getSavedMovies()
                .then(res => {
                    setPreloaderIsOpen(false)
                    keyWords.forEach((word)=>{
                        let regExp = new RegExp(word, 'i')

                        res.forEach((obj)=>{
                            if (regExp.test(obj.nameRU)) {
                                filteredCard.push(obj)
                            }
                        })
                    })
                    setMoviesList(transform(filteredCard))
                })
                .catch(()=>{
                    setError(`«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
                    Подождите немного и попробуйте ещё раз»`)
                })                
        } else {
            setError('Введите запрос длиннее 3х символов')
        }
    }

    function handleChangeSerachform(evt) {
        setSearchingString(evt.target.value)
    }

    function handleMoreButtonClick() {
        if(moviesList.length > numberOfCards) {
            setNumberOfCards(numberOfCards + 7)
        } else {
            alert('done')
        }
    }

    function handleDeleteMovie(data, id) {
        mainApi.deleteMovie(data)
            .then(res => {
                let moviesArrUpdated = moviesList.filter((element) => {
                    return element.movieId !== id
                })
                setMoviesList(moviesArrUpdated)
                const localStorageMovie = JSON.parse(localStorage.getItem('movies'))
                delete localStorageMovie[id -1]._id
                localStorage.setItem('movies', JSON.stringify(localStorageMovie))
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        if (props.viewportWidth <= 580) {
            setNumberOfCards(5)
        } else {
            setNumberOfCards(7)
        }
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
            <SearchForm onSubmit={handleSubmitForm} onChange={handleChangeSerachform}/>
            <section className="savedMoviesCardList">
                <Preloader isOpen={preloaderIsOpen}/>
                <div className="savedMoviesCardList__container">
                    <span>{error}</span>
                    <RenderedCards cards={moviesList} numberOfCards={numberOfCards} onDelete={handleDeleteMovie}/>
                </div>
                {
                    numberOfCards <= moviesList.length
                    ?<button className="savedMovieCardList__more-button" onClick={handleMoreButtonClick}>Еще</button>
                    :''
                }
            </section>
            <Footer /> 
        </>
    )
}