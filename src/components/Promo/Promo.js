import landingLogo from '../../images/promo/promo_landing-logo.png'

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <img className="promo__landing-logo" src={landingLogo} alt="Landing logo" />
                <p className="promo__description">Учебный проект студента факультета Веб-разработки.</p>
                <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <input className="promo__read-more-button" value="Узнать больше" type="button" />
            </div>
        </section>
    )
}