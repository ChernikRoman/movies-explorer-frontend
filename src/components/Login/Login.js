import logo from '../../images/header/header_logo.png'

export default function Login(props) {
    return (
        <section className="login">
            <div className="login__container">
                <img className="login__login-logo" src={logo} alt="Register logo" />
                <h2 className="login__title">Рады видеть!</h2>
                <form className="login__form">
                    <label className="login__input">
                        E-mail
                        <input name="login-input-email" type="email" placeholder="Введите email"></input>
                        <span>Что-то пошло не так...</span>
                    </label>
                    <label className="login__input">
                        Пароль
                        <input name="login-input-password" type="password" placeholder="Введите пароль"></input>
                        <span>Что-то пошло не так...</span>
                    </label>
                    <input className="login__submit-button" type="submit"></input>
                    <span>Уже зарегистрированы? Войти</span>
                </form>
            </div>
        </section>
    )
}