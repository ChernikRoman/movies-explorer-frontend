import { useState, useEffect, useContext } from 'react';
import validator from 'validator'
import Header from '../Header/Header';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function Profile(props) {
    const [isValidForm, setIsValidForm] = useState(false)
    const [isValidName, setIsValidName] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [resultMessage, setResultMessage] = useState('')

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

    function handlePatchUserData(evt, data) {
        evt.preventDefault()
        setResultMessage('')
        if (currentUser.name !== inputName || currentUser.email !== inputEmail) {
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
      }

    useEffect(()=>{
        if (isValidName && isValidEmail) {
            setIsValidForm(true)
        } else {
            setIsValidForm(false)
        }
    },[isValidName, isValidEmail, isValidForm])

    useEffect(() => {
        setInputName(currentUser.name)
        setInputEmail(currentUser.email)
    }, [currentUser.email, currentUser.name])

    return(
        <>
            <Header windowWidth={props.windowWidth} loggedIn={props.loggedIn}/>
            <section className="profile">
                <div className="profile__container">
                    <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                    <form className="profile__form" onChange={handleChangeForm} onSubmit={(evt) => {handlePatchUserData(evt, {name: inputName, email: inputEmail})}}>
                        <label className="profile__input">
                            Имя
                            <input name="profile-input-name" value={inputName} onChange={(evt) => setInputName(evt.target.value)} required></input>
                            {inputName && !isValidName && <span>Заполните имя</span>}
                        </label>
                        <label className="profile__input">
                            E-mail
                            <input name="profile-input-email" type="email" value={inputEmail} onChange={(evt) => {setInputEmail(evt.target.value)}} required></input>
                            {inputEmail && !isValidEmail && <span>Введите корректный email</span>}
                        </label>
                        {
                            resultMessage
                        }
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