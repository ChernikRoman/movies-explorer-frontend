import MoviesCard from "../MoviesCard/MoviesCard"

export default function RenderedCards (props) {
    return (
        <>
            {
                props.cards.slice(0, props.numberOfCards).map(movie => {
                    return <MoviesCard key={movie.id} data={movie} onSave={props.onSave} onDelete={props.onDelete}/>
                })  
            }
        </>
    )
}

