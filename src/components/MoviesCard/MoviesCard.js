import React, { useContext } from 'react'
import likeLogo from '../../images/moviesCard/like.svg'
import likeLogoActive from '../../images/moviesCard/like-active.svg';
import cross from '../../images/moviesCard/cross.svg';
import timeConverter from "../../utils/timeConverter"
import CurrentUserContext from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';

export default function MoviesCard(props) {
    const [cardStatus, setCardStatus] = React.useState('normal');
    const [imgSource, setImgSource] = React.useState('');

    const currentUser = useContext(CurrentUserContext)

    React.useEffect(()=>{
        if (props.data.status === 'normal') {
            setImgSource(likeLogo)
        } else if (props.data.status === 'liked') {
            setImgSource(likeLogoActive)
        } else if (props.data.status === 'saved') {
            setImgSource(cross)
        }
    },[])

    function changeCardStatus() {
        if(cardStatus === 'normal') {
            mainApi.createMovie({
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
            })
              .then(res => {
                setImgSource(likeLogoActive)
                setCardStatus('liked')
                let movie = JSON.parse(localStorage.getItem('movies'))
                movie[props.data.id - 1]._id = res._id
                movie[props.data.id - 1].status = 'liked'
                localStorage.setItem('movies', JSON.stringify(movie))
                console.log(res)
                })
              .catch(err => console.log('Ошибка' + err))
        }
        if(props.data.status === 'liked') {
            const movie = JSON.parse(localStorage.getItem('movies'))
            console.log(movie[props.data.id - 1] )
            // mainApi.deleteMovie(props.data.id)
            //   .then((res) => {
            //     setImgSource(likeLogo)
            //     setCardStatus('normal')
            //   })
            //   .catch(err => console.log(err))
        }
    }

    function handleCardClick(evt) {
        if (!evt.target.className.includes('moviesCard__status-button')) {
            window.open(props.data.trailerLink);
        }
    }

    return(
        <section className="moviesCard" onClick={handleCardClick}>
            <div className="moviesCard__movie-info">
                <h3 className="moviesCard__movie-name">{props.data.nameRU}</h3>
                <span className="moviesCard__movie-duration">{timeConverter(props.data.duration)}</span>
                <img className="moviesCard__status-button" src={imgSource} alt="status button" onClick={changeCardStatus}/>
            </div>
            <img className="movieCard__movie-logo" src={'https://api.nomoreparties.co' + props.data.image.url} alt="movie logo" />
            {cardStatus}
        </section>
    )
}