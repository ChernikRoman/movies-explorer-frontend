class MoviesApi {
    constructor({baseURL, headers}) {
        this.baseURL = baseURL;
        this.headers = headers;
    }

    _checkResponse(response) {
        if(response.ok) {
          return response.json();
        } else {
          return Promise.reject(response.status);
        }
      }

    getMovies() {
        return fetch(`${this.baseURL}`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({
    baseURL: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default moviesApi;