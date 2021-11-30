import { useState, useEffect } from 'react';
import validator from 'validator'
import Header from '../Header/Header';
import mainApi from '../../utils/MainApi';

export default function Profile(props) {
    const [isValidForm, setIsValidForm] = useState(false)
    const [isValidName, setIsValidName] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [activeButton, setActiveButton] = useState(false)
    const [inputName, setInputName] = useState(props.currentUser.name)
    const [inputEmail, setInputEmail] = useState(props.currentUser.email)
    const [resultMessage, setResultMessage] = useState('')

    function handlePatchUserData(evt, data) {
        evt.preventDefault()
        setResultMessage('')
        mainApi.patchMyUserData({
            name: data.name,
            email: data.email,
        })
            .then(res => {
                props.updateCurrentUser({name: res.name, email: res.email})
                setResultMessage('Информация обновлена')
                setTimeout(()=>setResultMessage(''), 3000)
            })
            .catch((err) => {
                setResultMessage(`Произошла ошибка: ${err.statusText + ' ' + err.status}`)
                setTimeout(()=>setResultMessage(''), 3000)
            } )
      }

      function handleChangeInputName(evt) {
        setInputName(evt.target.value);
        const regex = /^[a-zA-Zа-яА-Я0-9\s-]{2,30}$/gm
        setIsValidName(regex.test(evt.target.value))
      }

      function handleChangeInputEmail(evt) {
        setInputEmail(evt.target.value);
        setIsValidEmail(validator.isEmail(evt.target.value))
      }

    useEffect(() => {
        if (isValidName === true && isValidEmail === true) {
            setIsValidForm(true)
        } else {
            setIsValidForm(false)
        }
    }, [isValidName, isValidEmail])

    useEffect(() => {
        if ((props.currentUser.name !== inputName || props.currentUser.email !== inputEmail) && isValidForm) {
            setActiveButton(true)
        } else {
            setActiveButton(false)
        }
    }, [inputEmail, inputName, isValidForm, props.currentUser.email, props.currentUser.name])

    return(
        <>
            <Header windowWidth={props.windowWidth} loggedIn={props.loggedIn}/>
            <section className="profile">
                <div className="profile__container">
                    <h2 className="profile__title">Привет, {props.currentUser.name}!</h2>
                    <form className="profile__form" onSubmit={(evt) => {handlePatchUserData(evt, {name: inputName, email: inputEmail})}}>
                        <label className="profile__input">
                            Имя
                            <input name="profile-input-name" value={inputName} onChange={(evt) => handleChangeInputName(evt)} required></input>
                            {inputName && !isValidName && <span>Заполните имя</span>}
                        </label>
                        <label className="profile__input">
                            E-mail
                            <input name="profile-input-email" type="email" value={inputEmail} onChange={(evt) => {handleChangeInputEmail(evt)}} required></input>
                            {inputEmail && !isValidEmail && <span>Введите корректный email</span>}
                        </label>
                        {
                            resultMessage
                        }
                        {activeButton
                            ?<input className="profile__submit-button" type="submit" value="Редактировать"></input>
                            :<input className="profile__submit-button profile__submit-button_disabled" type="submit" value="Редактировать" disabled></input>
                        }
                        <span onClick={props.onExit}>Выйти из аккаунта</span>
                    </form>
                </div>
            </section>
        </>
    )
}