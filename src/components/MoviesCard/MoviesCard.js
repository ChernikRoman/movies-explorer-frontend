import React from 'react'
import likeLogo from '../../images/moviesCard/like.svg'
import likeLogoActive from '../../images/moviesCard/like-active.svg';
import cross from '../../images/moviesCard/cross.svg';

export default function MoviesCard(props) {

    const [cardStatus, setCardStatus] = React.useState(props.status);

    const [imgSource, setImgSource] = React.useState(likeLogo);

    React.useEffect(()=>{
        if (cardStatus !== 'normal')    //карточке можно передать 3 статуса 'normal', 'liked', 'saved'
        cardStatus === 'liked' ? setImgSource(likeLogoActive) : setImgSource(cross);
    })

    return(
        <section className="moviesCard">
            <div className="moviesCard__movie-info">
                <h3 className="moviesCard__movie-name">{props.name}</h3>
                <span className="moviesCard__movie-duration">{props.duration}</span>
                <img className="moviesCard__status-button" src={imgSource} alt="status button" />
            </div>
            <img className="movieCard__movie-logo" src={props.img} alt="movie logo" />
        </section>
    )
}