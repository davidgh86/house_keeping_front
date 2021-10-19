import axios from "axios";

class BackendClient {
    constructor (store) {
        this.baseUrl = process.env.API_REST_URL;
        this.client = axios.create({
            baseURL: process.env.API_REST_URL || "http://localhost:3000",
        });

        const token = localStorage.getItem('token')
        if (token) {
            this.client.defaults.headers.common['Authorization'] = "Bearer " + token
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
                this.client.defaults.headers.common['Authorization'] = "Bearer " + response.data.token
                // create options panel to edit time zone in case needed
                this.client.defaults.headers.common['Time-Zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
                resolve(response.data)
            }, (error) => {
                reject(error)
            })
        })
    }

    setAuthenticationHeaders(token){
        this.client.defaults.headers.common['Authorization'] = "Bearer " + token
        this.client.defaults.headers.common['Time-Zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    logout() {
        delete this.client.defaults.headers.common['Authorization']
        delete this.client.defaults.headers.common['Time-Zone']
    }

    getAllApartments(offset, limit){
        return new Promise((resolve, reject) => {
            this.client.get(process.env.API_REST_URL+'/apartment', 
                                            { params: { offset: offset, limit: limit } })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default BackendClient