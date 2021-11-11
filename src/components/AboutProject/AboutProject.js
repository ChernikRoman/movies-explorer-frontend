export default function AboutProject() {
    return (
        <section className="aboutProject" id="about">
            <div className="aboutProject__container">
                <p className="aboutProject__title">О проекте</p>
                <div className="aboutProject__grid">
                    <h3 className="aboutProject__grid-title">Дипломный проект включал 5 этапов</h3>

                    <p className="aboutProject__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="aboutProject__grid">
                    <h3 className="aboutProject__grid-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutProject__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
                <div className="aboutProject__track">
                    <p>1 неделя</p>
                    <p>4 недели</p>
                    <p>Back-end</p>
                    <p>Front-end</p>
                </div>
            </div>
        </section>
    )
}