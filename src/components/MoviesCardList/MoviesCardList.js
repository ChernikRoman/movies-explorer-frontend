export default function MoviesCardList(props) {
    return (
        <section className="moviesCardList">
            <div className="moviesCardList__container">
                {props.children}
                <button className="movieCardList__more-button">Еще</button>
            </div>
        </section>
    )
}