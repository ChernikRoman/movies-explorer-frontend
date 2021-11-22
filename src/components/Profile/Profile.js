import { useState, useEffect, useContext } from 'react';
import validator from 'validator'
import Header from '../Header/Header';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function Profile(props) {
    const [isValidForm, setIsValidForm] = useState(false)
    const [isValidName, setIsValidName] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')

    const currentUser = useContext(CurrentUserContext)

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
                    <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                    <form className="profile__form" onChange={handleChangeForm} onSubmit={(evt) => {props.onPatch(evt, {name: inputName, email: inputEmail})}}>
                        <label className="profile__input">
                            Имя
                            <input name="profile-input-name" placeholder={currentUser.name} required></input>
                            {inputName && !isValidName && <span>Заполните имя</span>}
                        </label>
                        <label className="profile__input">
                            E-mail
                            <input name="profile-input-email" type="email" placeholder={currentUser.email} required></input>
                            {inputEmail && !isValidEmail && <span>Введите корректный email</span>}
                        </label>
                        {isValidForm
                            ?<input className="profile__submit-button" type="submit" value="Редактировать"></input>
                            :<input className="profile__submit-button" type="submit" value="Редактировать" disabled></input>
                        }
                        <span onClick={props.onExit}>Выйти из аккаунта</span>
                    </form>
                </div>
            </section>
        </>
    )
}