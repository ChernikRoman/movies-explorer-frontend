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
            <span>Главная</span>
            <span>Фильмы</span>
            <span>Сохраненные фильмы</span>
            <Link className="navigation__link" to='/'>
                    Аккаунт
                    <img className="navigation__menu-logo" src={linkButton} alt="Menu logo"/>
            </Link>
            <img className="navigation__close-button" src={cross} alt="cross" onClick={closeButtonHndler}/>
        </div>
    )
}