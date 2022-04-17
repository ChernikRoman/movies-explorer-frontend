import studentPhoto from '../../images/aboutMe/student-photo.jpeg'

export default function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <p className="about-me__student-name">Роман</p>
                <p className="about-me__description">Фронтенд-разработчик, 27 лет</p>
                <p className="about-me__text">
                    Я родился и жил в Кранодарском крае, там же закончил факультет транспортной логистики в Новороссийске.
                    Я люблю слушать музыку, а ещё увлекаюсь автомобилями. С 2019 года работал в аэропорту "Шереметьево".
                    После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                </p>
                <div className="about-me__link">
                    <a href="http://facebook.com">Facebook</a>
                    <a href="https://github.com/Roman017">GitHub</a>
                </div>
                <img className="about-me__photo" src={studentPhoto} alt="Student photography" />
            </div>
        </section>
    )
}
