import { useState, useEffect } from 'react';
import validator from 'validator'
import Header from '../Header/Header';
import mainApi from '../../utils/MainApi'

export default function Profile(props) {
    const [isValidForm, setIsValidForm] = useState(false)
    const [isValidName, setIsValidName] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')

    function handleChangeForm(evt) {
        if(evt.target.name === 'profile-input-name') {
            const regex = /^[a-zA-Zа-яА-Я0-9\s-]+$/gm
            setIsValidName(regex.test(evt.target.value))
            setInputName(evt.target.value)
        } else if (evt.target.name === 'profile-input-email') {
            setIsValidEmail(validator.isEmail(evt.target.value))
            setInputEmail(evt.target.value)
        }
    }

    function handleSubmitForm(evt) {
        evt.preventDefault()
        mainApi.createUser({
            name: inputName,
            email: inputEmail,
        })
            .then(res => {
                console.log(res)
            })
    }

    useEffect(()=>{
        if (isValidName && isValidEmail) {
            setIsValidForm(true)
        } else {
            setIsValidForm(false)
        }
    },[isValidName, isValidEmail, isValidForm])

    return(
        <>
            <Header />
            <section className="profile">
                <div className="profile__container">
                    <h2 className="profile__title">Привет, {props.userName}!</h2>
                    <form className="profile__form" onChange={handleChangeForm} onSubmit={handleSubmitForm}>
                        <label className="profile__input">
                            Имя
                            <input name="profile-input-name" placeholder={props.userName}></input>
                            {inputName && !isValidName && <span>Заполните имя</span>}
                        </label>
                        <label className="profile__input">
                            E-mail
                            <input name="profile-input-email" type="email" placeholder={props.userEmail}></input>
                            {inputEmail && !isValidEmail && <span>Введите корректный email</span>}
                        </label>
                        <input className="profile__submit-button" type="button" value="Редактировать"></input>
                        <span>Выйти из аккаунта</span>
                    </form>
                </div>
            </section>
        </>
    )
}