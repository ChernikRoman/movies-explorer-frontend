import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import likeLogo from '../../images/moviesCard/like.svg'
import likeLogoActive from '../../images/moviesCard/like-active.svg';
import cross from '../../images/moviesCard/cross.svg';
import timeConverter from "../../utils/timeConverter"
import CurrentUserContext from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';

export default function MoviesCard(props) {
    const [isSaved, setIsSaved] = useState(false);

    const location = useLocation();

    useEffect(()=>{
        props.data._id === undefined ? setIsSaved(false) : setIsSaved(true);
    }, [props.data._id])

    function handleCardClick(evt) {
        if (!evt.target.className.includes('moviesCard__status-button')) {
            window.open(props.data.trailerLink);
        }
    }

    function handleStatusButtonClick() {
        if (!isSaved === true) {
            props.onSave({
                country: props.data.country,
                director: props.data.director,
                duration: props.data.duration,
                year: props.data.year,
                description: props.data.description,
                image: `https://api.nomoreparties.co/${props.data.image.url}`,
                trailer: props.data.trailerLink,
                thumbnail: `https://api.nomoreparties.co/${props.data.image.formats.thumbnail.url}`,
                movieId: props.data.id,
                nameRU: props.data.nameRU,
                nameEN: props.data.nameEN,
            });
            setIsSaved(!isSaved)
        } else {
            props.onDelete(props.data._id);
            setIsSaved(!isSaved)
        }
    }

    return(
        <section className="moviesCard" onClick={handleCardClick}>
            <div className="moviesCard__movie-info">
                <h3 className="moviesCard__movie-name">{props.data.nameRU}</h3>
                <span className="moviesCard__movie-duration">{timeConverter(props.data.duration)}</span>
                <img className="moviesCard__status-button" src={isSaved ? (location.pathname === '/movies' ? likeLogoActive : cross) : likeLogo} alt="status button" onClick={handleStatusButtonClick}/>
            </div>
            <img className="movieCard__movie-logo" src={'https://api.nomoreparties.co' + props.data.image.url} alt="movie logo" />
        </section>
    )
}