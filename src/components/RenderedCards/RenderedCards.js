import MoviesCard from "../MoviesCard/MoviesCard"

export default function RenderedCards (props) {
    return (
        <>
            {
                props.cards.slice(0, props.numberOfCards).map(movie => {
                    return <MoviesCard key={movie.id} name={movie.nameRU} duration={movie.duration} img={'https://api.nomoreparties.co' + movie.image.url} status="normal" trailerLink={movie.trailerLink}/>
                })  
            }
        </>
    )
}

