import ico from '../../images/searchForm/search.svg'

export default function SearchForm(props) {
    return (
        <section className="searchForm">
            <div className="searchForm__container">
                <figure className="searchForm__background" />
                <form className="searchForm__form" name="serachForm" onSubmit={props.onSubmit} onChange={props.onChange} noValidate>
                    <img src={ico} className="searchForm__ico" alt="Serach ico" />
                    <input className="searchForm__search-string" type="search" placeholder="Фильм" required/>
                    <button className="searchForm__submit-button" type="submit">Найти</button>
                </form>
                <label className="searchForm__shortFilm-tumbler">
                    <span className="searchForm__slider" />
                    <input type="checkbox" />
                    Короткометражки
                </label>
            </div>
        </section>
    )
}
