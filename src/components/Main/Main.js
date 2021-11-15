import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Main() {
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