import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CurrentUserContext from "../../context/CurrentUserContext";
import { useEffect, useContext } from 'react';

export default function Main() {
    let currentUser = useContext(CurrentUserContext)

    useEffect(()=> {
        console.log(currentUser)
    })

    return (
        <>
            <Header />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer /> 
        </>
    )
}