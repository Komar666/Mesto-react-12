class AuthApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async fetchUserMe ({ token }) {
        /** Success result:
        {
            {
                "_id":"1f525cf06e02630312f3fed7",
                "email":"email@email.ru"
            }
        }
        */
        const response = await fetch(this._baseUrl + '/signup', {
            headers: { "Authorization": `Bearer ${token}` },
        })
        return this._checkStatus(response)
    }


    async authorize({ email, password }) {
        /** Success result:
        {
            "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
        }
        */
        const response = await fetch(this._baseUrl + '/signin', {
            method: 'POST',
            headers: {},
            body: { email, password }
        })
        return this._checkStatus(response)
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
        const response = await fetch(this._baseUrl + '/signup', {
            headers: {},
            body: { email, password }
        })
        return this._checkStatus(response)
    }

}



const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co/',
    headers: { 'Content-Type': 'application/json' }
});

export default authApi;
