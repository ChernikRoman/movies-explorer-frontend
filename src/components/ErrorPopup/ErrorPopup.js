import { useState, useEffect } from "react"

export default function ErrorPopup(props) {

    const wuthoutKeyWords = 'Нужно ввести ключевое слово'
    const notFoundMovie = 'Ничего не найдено'
    const serverError = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'

    useEffect(()=>{
        const errorPopup = document.querySelector('.error-popup')
        errorPopup.addEventListener('click', ()=>{
            errorPopup.classList.remove('error-popup_active')
            
        })
    }, [])

    return (
        <div className={`error-popup ${props.isOpen ?'error-popup_active' :''}`}>
            Ошибка: 
            <br />
            {props.errorMessage}
            <br />
            <span>Кликните, чтобы скрыть.</span>
        </div>
    )
}