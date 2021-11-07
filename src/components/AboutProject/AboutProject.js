export default function AboutProject() {
    return (
        <section className="aboutProject">
            <div className="aboutProject__container">
                <p className="aboutProject__title">О проекте</p>
                <p className="aboutProject__text">
                    Дипломный проект включал 5 этапов
                    <span />
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>
                <p className="aboutProject__text">
                    На выполнение диплома ушло 5 недель
                    <span />
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </p>
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