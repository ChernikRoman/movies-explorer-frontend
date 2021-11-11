import MoviesCard from "../MoviesCard/MoviesCard"
import img from '../../images/moviesCard/movie_pic.png'
import SearchForm from "../SearchForm/SearchForm"

export default function MoviesCardList(props) {
    return (
        <>
            <SearchForm />
            <section className="moviesCardList">
                <div className="moviesCardList__container">
                    <MoviesCard name="33 слова о дизайне" duration="1ч 42м" img={img}/> {/*В следующем этапе карточки будут браться с помощью API*/}
                    <button className="movieCardList__more-button">Еще</button>
                </div>
            </section>        
        </>
    )
}