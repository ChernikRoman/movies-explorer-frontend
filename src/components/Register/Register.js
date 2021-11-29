import { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import validator from 'validator'
import logo from '../../images/header/header_logo.svg'
import mainApi from '../../utils/MainApi'

export default function Register(props) {
    const [isValidForm, setIsValidForm] = useState(false)
    const [isValidName, setIsValidName] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [errorCode, setErrorCode] = useState('')

    const navigation = useNavigate();

    function handleChangeForm(evt) {
        if(evt.target.name === 'register-input-name') {
            const regex = /^[a-zA-Zа-яА-Я0-9\s-]+$/gm
            setIsValidName(regex.test(evt.target.value))
            setInputName(evt.target.value)
        } else if (evt.target.name === 'register-input-email') {
            setIsValidEmail(validator.isEmail(evt.target.value))
            setInputEmail(evt.target.value)
        } else if (evt.target.name === 'register-input-password') {
            setIsValidPassword(evt.target.value.length >= 3)
            setInputPassword(evt.target.value)
        }
    }

    function handleSubmitForm(evt) {
        evt.preventDefault()
        setErrorCode('')
        mainApi.createUser({
            name: inputName,
            email: inputEmail,
            password: inputPassword
        })
            .then(() => {
                mainApi.login({ email: inputEmail, password: inputPassword })
                .then((data) => {
                    props.updateCurrentUser(data)
                    navigation('/movies')
                })
            })
            .catch((err) => {
                setErrorCode(`Произошла ошибка: ${err.statusText + ' ' + err.status}`)
            })
    }

    useEffect(()=>{
        if (isValidName && isValidEmail && isValidPassword) {
            setIsValidForm(true)
        } else {
            setIsValidForm(false)
        }
    },[isValidName, isValidEmail, isValidPassword, isValidForm])

    return (
        props.isLoggedIn
        ? <Navigate replace to="/" />
        : <section className="register">
        <div className="register__container">
            <Link to="/">
                <img className="register__register-logo" src={logo} alt="Register logo" />
            </Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" onChange={handleChangeForm} onSubmit={handleSubmitForm}>
                <label className="register__input">
                    Имя
                    <input name="register-input-name" placeholder="Введите имя" required ></input>
                    {inputName && !isValidName && <span>Заполните имя</span>}
                </label>
                <label className="register__input">
                    E-mail
                    <input name="register-input-email" type="email" placeholder="Введите email" required></input>
                    {inputEmail && !isValidEmail && <span>Введите корректный email</span>}
                </label>
                <label className="register__input">
                    Пароль
                    <input name="register-input-password" type="password" placeholder="Введите пароль" required></input>
                    {inputPassword && !isValidPassword && <span>Пароль не менее 8 символов</span>}
                </label>
                {
                    errorCode
                }
                {
                    isValidForm
                        ?<button className="register__submit-button" type="submit">Отправить</button>
                        :<button className="register__submit-button register__submit-button_disabled" type="submit" disabled>Отправить</button>
                }
                <span>Уже зарегистрированы? <Link to="/signin">Войти</Link> </span>
            </form>
        </div>
    </section>
    )
}