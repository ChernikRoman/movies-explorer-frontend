import React from "react";
import { Link } from "react-router-dom";
import cross from "../../images/navigation/cross.png";
import linkButton from '../../images/header/link_button.png'

export default function Navigation(props) {
    function closeButtonHndler() {
        const navi = document.querySelector('.navigation');
        navi.style.right = '-520px';
    }

    return (
        <div className="navigation">
            <Link to="/">Главная</Link>
            <Link to="/movies">Фильмы</Link>
            <Link to="/saved-movies">Сохраненные фильмы</Link>
            <Link to='/profile'>
                    Аккаунт
                    <img className="navigation__menu-logo" src={linkButton} alt="Menu logo"/>
            </Link>
            <img className="navigation__close-button" src={cross} alt="cross" onClick={closeButtonHndler}/>
        </div>
    )
}