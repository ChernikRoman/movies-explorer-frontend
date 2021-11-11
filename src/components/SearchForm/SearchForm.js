import ico from '../../images/searchForm/icon.png'

export default function SearchForm() {
    return (
        <section className="searchForm">
            <div className="searchForm__container">
                <figure className="searchForm__background" />
                <form className="searchForm__form" name="serachForm" noValidate>
                    <img src={ico} className="searchForm__ico" alt="Serach ico" />
                    <input  type="search" className="searchForm__search-string" placeholder="Фильм" />
                    <input className="searchForm__submit-button" type="button" value="Найти" />
                </form>
                <label className="searchForm__shortFilm-tumbler">
                    <input type="checkbox" />
                    Короткометражки
                </label>
            </div>
        </section>
    )
}
