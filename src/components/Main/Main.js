import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CurrentUserContext from "../../context/CurrentUserContext";
import { useEffect, useContext } from 'react';

export default function Main(props) {
    let currentUser = useContext(CurrentUserContext)

    return (
        <>
            <Header windowWidth={props.windowWidth} loggedIn={props.loggedIn} />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer /> 
        </>
    )
}