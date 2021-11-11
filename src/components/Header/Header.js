import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../images/header/header_logo.png';
import linkButton from '../../images/header/link_button.png'
import menuButton from '../../images/header/menu_button.png'
import Navigation from '../Navigation/Navigation';
import ReactDOM from 'react-dom';

export default function Header (props) {
    const [windowWidth, setWindowWidth] = React.useState();

    const location = useLocation();
    const backgroundColor = location.pathname === '/' ?'#073042' :'#222222'

    function menuButtonClickHandler() {
       const navi = document.querySelector('.navigation');
       navi.style.right = 0;
    }

    React.useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setWindowWidth(document.documentElement.clientWidth);
            console.log(windowWidth)
        })
    })

    return (
        //устанавливаем background для header
        <header className='header' style={{backgroundColor: backgroundColor}}>
            <div className="header__container">
                <img src={logo} className="header__logo" alt="Header logo"/>
                
                {/* Выбирам содержимое header в зависимоти от pathname */}
                {location.pathname === '/'
                    ?<div className="header__auth">
                        <input className="header__signup-button" type="button" value="Регистрация"/>
                        <input className="header__signin-button" type="button" value="Войти"/>
                    </div>
                    :
                    <>
                    <div className="header__nav-links">
                        <Link to="/movies">Фильмы</Link>
                        <Link to="/saved-movies">Сохраненные фильмы</Link>
                    </div>

                    {/* Выбирам кнопку в зависимоти от ширины экрана */}
                    {document.documentElement.clientWidth > 850
                    ?<Link className="header__link-button" to="profile">
                        Аккаунт
                        <img className="header__link-logo" src={linkButton} alt="Menu logo"/>
                    </Link>
                    :<img src={menuButton} alt="Menu button" onClick={menuButtonClickHandler}/>
                    }
                    </>
                }
            </div>
        </header>
    )
}
