import logo from '../../images/header/link_button.svg';
import './blocks/safariPage.css'

export default function SafariPage() {
    return(
        <div className="safari">
            <img className="header__logo" src={logo} alt="Лого" />
            <p className="safari__description">
                Кажется, вы используете Safari 🧭. В данный момент сервер аутентификации пользователей располагается на другом домене и файлы куки,
                необходимые для авторизации, блокированы Вашим браузером. Не переживайте, просто используйте альтернативный браузер Google, Firefox,
                Opera, а мы пока займемся починкой.
            </p>

        </div>
    )
}