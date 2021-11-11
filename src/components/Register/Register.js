import logo from '../../images/header/header_logo.png'

export default function Register(props) {
    return (
        <section className="register">
            <div className="register__container">
                <img className="register__register-logo" src={logo} alt="Register logo" />
                <h2 className="register__title">Добро пожаловать!</h2>
                <form className="register__form">
                    <label className="register__input">
                        Имя
                        <input name="register-input-name" placeholder="Введите имя"></input>
                        <span>Что-то пошло не так...</span>
                    </label>
                    <label className="register__input">
                        E-mail
                        <input name="register-input-email" type="email" placeholder="Введите email"></input>
                        <span>Что-то пошло не так...</span>
                    </label>
                    <label className="register__input">
                        Пароль
                        <input name="register-input-password" type="password" placeholder="Введите пароль"></input>
                        <span>Что-то пошло не так...</span>
                    </label>
                    <input className="register__submit-button" type="submit"></input>
                    <span>Уже зарегистрированы? Войти</span>
                </form>
            </div>
        </section>
    )
}