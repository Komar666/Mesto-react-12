class AuthApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) { return res.json(); }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async fetchUserMe ({ token }) {
        /** Success result:
        {
            "_id":"1f525cf06e02630312f3fed7",
            "email":"email@email.ru"
        }
        */
      return fetch(this._baseUrl + '/users/me', {
          headers: { "Authorization": `Bearer ${token}`, ...this._headers },
      }).then((r) => { return this._checkStatus(r) })
    }


    async authorize({ email, password }) {
        /** Success result:
        {
            "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
        }
        */
        return fetch(this._baseUrl + '/signin', {
          method: 'POST',
          headers: { ...this._headers },
          body: JSON.stringify({ email, password })
        }).then((r) => {
          return this._checkStatus(r)
      })
    }

    async register({ email, password }) {
        /** Success result:
        {
            "data": {
                "_id": "5f5204c577488bcaa8b7bdf2",,
                "email": "email@yandex.ru"
            }
        }
        */
        return fetch(this._baseUrl + '/signup', {
          method: 'POST',
          headers: { ...this._headers },
          body: JSON.stringify({ email, password })
        }).then((r) => { return this._checkStatus(r) })
    }

}



const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: { 'Content-Type': 'application/json' }
});

export default authApi;
