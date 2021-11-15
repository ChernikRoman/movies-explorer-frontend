import MoviesCard from "../MoviesCard/MoviesCard"
import img from '../../images/moviesCard/movie_pic.png'
import SearchForm from "../SearchForm/SearchForm"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function MoviesCardList(props) {
    return (
        <>
            <Header />
            <SearchForm />
            <section className="moviesCardList">
                <div className="moviesCardList__container">
                    <MoviesCard name="33 слова о дизайне" duration="1ч 42м" img={img} status="normal"/> {/*В следующем этапе карточки будут браться с помощью API*/}
                </div>
                <button className="movieCardList__more-button">Еще</button>
            </section>     
            <Footer /> 
        </>
    )
}