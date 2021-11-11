import React from 'react'
import logo from '../../images/header/header_logo.png'

export default function Profile() {
    const {userName = 'Default Name', setUserName} = React.useState('');
    const {userEmail = 'Default Email', setUserEmail} = React.useState('');

    return(
        <section className="profile">
        <div className="profile__container">
            <h2 className="profile__title">Привет, {userName}!</h2>
            <form className="profile__form">
                <label className="profile__input">
                     Имя
                    <input name="profile-input-name" placeholder={userName}></input>
                </label>
                <label className="profile__input">
                    E-mail
                    <input name="profile-input-email" type="email" placeholder={userEmail}></input>
                </label>
                <input className="profile__submit-button" type="button" value="Редактировать"></input>
                <span>Выйти из аккаунта</span>
            </form>
        </div>
    </section>
    )
}