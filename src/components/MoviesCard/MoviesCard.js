import React from 'react'
import likeLogo from '../../images/moviesCard/like.png'

export default function MoviesCard(props) {

    return(
        <section className="moviesCard">
            <div className="moviesCard__movie-info">
                <h3 className="moviesCard__movie-name">{props.name}</h3>
                <span className="moviesCard__movie-duration">{props.duration}</span>
                <img className="moviesCard__like-button" src={likeLogo} alt="like button" />
            </div>
            <img className="movieCard__movie-logo" src={props.img} alt="movie logo" />
        </section>
    )
}