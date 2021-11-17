import { useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import moviesApi from "../../utils/MoviesApi"
import RenderedCards from "../RenderedCards/RenderedCards"
import Preloader from "../Preloader/Preloader"

export default function MoviesCardList(props) {
    const [moviesList, setMoviesList] = useState([]);
    const [numberOfCards, setNumberOfCards] = useState(95);
    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);


    function submitSearchForm(evt) {
        evt.preventDefault();
        setPreloaderIsOpen(true)
        moviesApi.getMovies()
            .then(res => {
                setPreloaderIsOpen(false)
                setMoviesList(res)
            })
    }

    function handleMoreButtonClick() {
        if(moviesList.length > numberOfCards) {
            setNumberOfCards(numberOfCards + 3)
        } else {
            alert('done')
        }
    }

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
            <Footer /> 
        </>
    )
}