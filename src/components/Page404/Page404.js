import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <section className="page404">
            <span className="page404__error-code">
                404
                <span className="page404__description">Страница не найдена</span>
            </span>
            <Link className="page404__back-link" to="/">Назад</Link>
        </section>
    )
}