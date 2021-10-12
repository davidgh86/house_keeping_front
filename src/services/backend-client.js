import axios from "axios";

class BackendClient {
    constructor (store) {
        this.baseUrl = process.env.API_REST_URL;
        this.client = axios.create({
            baseURL: process.env.API_REST_URL || "http://localhost:3000",
        });

        const token = localStorage.getItem('token')
        if (token) {
            this.client.defaults.headers.common['Authorization'] = token
        }

        this.client.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
            if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                store.dispatch('logout')
            }
            throw err;
            });
        });
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            this.client.post(process.env.API_REST_URL+'/user/login', {
                username: username,
                password: password
            })
            .then((response) => {
                this.client.defaults.headers.common['Authorization'] = response.data.token
                resolve(response.data)
            }, (error) => {
                reject(error)
            })
        })
    }

    setAuthenticationHeaders(token){
        this.client.defaults.headers.common['Authorization'] = token
    }

    logout() {
        delete this.client.defaults.headers.common['Authorization']
    }
}

export default BackendClient