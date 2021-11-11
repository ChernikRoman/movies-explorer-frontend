import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../images/header/header_logo.png';
import linkButton from '../../images/header/link_button.png'
import menuButton from '../../images/header/menu_button.png'

export default function Header (props) {
    const [windowWidth, setWindowWidth] = React.useState();

    const location = useLocation();
    const backgroundColor = location.pathname === '/' ?'#073042' :'#222222'

    function menuButtonClickHandler() {
        alert(850);
    }

    React.useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setWindowWidth(document.documentElement.clientWidth);
            console.log(windowWidth)
        })
    })

    return (
        <header className='header' style={{backgroundColor: backgroundColor}}>
            <div className="header__container">
                <img src={logo} className="header__logo" alt="Header logo"/>
                {location.pathname === '/'
                    ?<div className="header__auth">
                        <input className="header__signup-button" type="button" value="Регистрация"/>
                        <input className="header__signin-button" type="button" value="Войти"/>
                    </div>
                    :
                    <>
                    <div className="header__nav-links">
                        <Link to="/q">Фильмы</Link>
                        <Link to="/q">Сохраненные фильмы</Link>
                    </div>
                    {document.documentElement.clientWidth > 850
                    ?<label className="header__menu-button" onClick={menuButtonClickHandler}>
                        Аккаунт
                        <img className="header__menu-logo" src={linkButton} alt="Menu logo"/>
                    </label>
                    :<img src={menuButton} alt="Menu button" onClick={()=>{alert('menu')}}/>
                    }
                    </>
                }
            </div>
        </header>
    )
}
