import logo from '../../images/header/header_logo.png'

export default function Header (props) {
    return (
        <header className='header'>
            <div className="header__container">
                <img src={logo} className="header__logo" alt="Header logo"/>
                <div className="header__auth">
                    <input className="header__signup-button" type="button" value="Регистрация"/>
                    <input className="header__signin-button" type="button" value="Войти"/>
                </div>
            </div>
        </header>
    )
}
