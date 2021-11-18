import { useContext, useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import moviesApi from "../../utils/MoviesApi"
import RenderedCards from "../RenderedCards/RenderedCards"
import Preloader from "../Preloader/Preloader"
import ErrorPopup from "../ErrorPopup/ErrorPopup"
import CurrentUserContext from "../../context/CurrentUserContext"

export default function MoviesCardList(props) {
    const [moviesList, setMoviesList] = useState([]);
    const [numberOfCards, setNumberOfCards] = useState(7);
    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);
    const [keyWords, setKeyWords] = useState('');
    const [showError, setShowError] =useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    let curuse = useContext(CurrentUserContext)

    curuse = 'awdawdaw'

    function submitSearchForm(evt) {
        evt.preventDefault();
        const searchingString = evt.target.querySelector('input').value;
        if (searchingString) {
            setPreloaderIsOpen(true)
            setKeyWords(searchingString.split('-'))
            moviesApi.getMovies()
                .then(res => {
                    setPreloaderIsOpen(false)
                    setMoviesList(res)
                })
        } else {
            setShowError(true)
            setErrorMessage('Нужно ввести ключевое слово')
        }
    }

    function handleMoreButtonClick() {
        if(moviesList.length > numberOfCards) {
            setNumberOfCards(numberOfCards + 7)
        } else {
            alert('done')
        }
    }

    useEffect(()=>{
        console.log(curuse)
    })

    return (
        <>
            <Header />
            <SearchForm onSubmitSearchForm={submitSearchForm} />
            <section className="moviesCardList">
                <Preloader isOpen={preloaderIsOpen}/>
                <div className="moviesCardList__container">
                    <RenderedCards cards={moviesList} numberOfCards={numberOfCards}/>
                </div>
                {
                    numberOfCards <= moviesList.length
                    ?<button className="movieCardList__more-button" onClick={handleMoreButtonClick}>Еще</button>
                    :''
                }
            </section>
            <ErrorPopup isOpen={showError} errorMessage={errorMessage} />
            <Footer /> 
        </>
    )
}