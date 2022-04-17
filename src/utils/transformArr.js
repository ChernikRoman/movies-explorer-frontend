export default function transform (arr) {
    let newArr = arr.map((item) => {
        const imageUrl = item.image;
        const thumbnailUrl = item.thumbnail;
        return {
            country: item.country,
            director: item.director,
            duration: item.duration,
            year: item.year,
            description: item.description,
            image: {
                url: imageUrl.replace('https://api.nomoreparties.co', ''),
                formats: {
                    thumbnail: {
                        url: thumbnailUrl.replace('https://api.nomoreparties.co', ''),
                    }
                }
            },
            trailerLink: item.trailer,
            id: item.movieId,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
        }
    })
    return newArr
}