import logo from '../../images/header/header_logo.png'

export default function Header (props) {
    return (
        <header className='header'>
            <div>
                <img src={logo} className="header__logo" alt="Header logo"/>
                <div className="header__auth">
                    <p className="header__signup-button">Регистрация</p>
                    <button className="header__signin-button">Войти</button>
                </div>
            </div>
        </header>
    )
}
