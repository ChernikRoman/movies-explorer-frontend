import React from 'react'
import { Link } from 'react-router-dom'
import likeLogo from '../../images/moviesCard/like.svg'
import likeLogoActive from '../../images/moviesCard/like-active.svg';
import cross from '../../images/moviesCard/cross.svg';
import timeConverter from "../../utils/timeConverter" 

export default function MoviesCard(props) {
    const [cardStatus, setCardStatus] = React.useState(props.status);
    const [imgSource, setImgSource] = React.useState(likeLogo);

    React.useEffect(()=>{
        if (cardStatus !== 'normal') {
        setImgSource(likeLogo)
        cardStatus === 'liked' ? setImgSource(likeLogoActive) : setImgSource(cross);
        }
    }, [])

    function changeCardStatus() {
        if(cardStatus === 'normal') {
            setImgSource(likeLogoActive)
            setCardStatus('liked')
        }
        if(cardStatus === 'liked') {
            setImgSource(likeLogo)
            setCardStatus('normal')
        }
    }

    function trailerRedirectHandler(evt) {
        if (!evt.target.className.includes('moviesCard__status-button')) {
            window.open(props.trailerLink);
        }
    }

    return(
        <section className="moviesCard" onClick={trailerRedirectHandler}>
            <div className="moviesCard__movie-info">
                <h3 className="moviesCard__movie-name">{props.name}</h3>
                <span className="moviesCard__movie-duration">{timeConverter(props.duration)}</span>
                <img className="moviesCard__status-button" src={imgSource} alt="status button" onClick={changeCardStatus}/>
            </div>
            <img className="movieCard__movie-logo" src={props.img} alt="movie logo" />
        </section>
    )
}