import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import linkButton from '../../images/header/link_button.svg'
import menuButton from '../../images/header/menu_button.svg'

export default function Header (props) {
    const location = useLocation();
    const backgroundColor = location.pathname === '/' ?'#073042' :'#202020'

    function menuButtonClickHandler() {
       const navi = document.querySelector('.navigation');
       navi.style.right = 0;
    }

    React.useEffect(()=>{

    }, [])

    return (
        //устанавливаем background для header
        <header className='header' style={{backgroundColor: backgroundColor}}>
            <div className="header__container">
                <Link className="header__logo" to="/" />
                {/* Выбирам содержимое header в зависимоти от pathname */}
                {location.pathname === '/'
                    ?<div className="header__auth">
                        <Link className="header__signup-button" to="/signup">Регистрация</Link>
                        <Link className="header__signin-button" to="/signin">Войти</Link>
                    </div>
                    :
                    <>
                    <div className="header__nav-links">
                        <Link to="/movies">Фильмы</Link>
                        <Link to="/saved-movies">Сохраненные фильмы</Link>
                    </div>

                    {/* Выбирам кнопку в зависимоти от ширины экрана */}
                    {props.windowWidth > 850
                    ?<Link className="header__link-button" to="/profile">
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
