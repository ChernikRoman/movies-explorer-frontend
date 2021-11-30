export default function setLikedCards(arr, movies) {
    arr.forEach(savedMovie => {
        movies.forEach((movie) => {
            if (movie.id === savedMovie.movieId) {
                movie._id = savedMovie._id
            }
        })
    });
    return movies
}