import axios from "axios";

class BackendClient {
    constructor (store) {
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.baseUrl = process.env.API_REST_URL;
        this.client = axios.create({
            baseURL: process.env.API_REST_URL || "http://localhost:3000",
        });
        this.wsHost = process.env.API_WS_URL || "ws://localhost:3000"

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

    getWsPath() {
        return this.wsHost;
    }

    getUploadPath() {
        return this.baseUrl + "/interval/upload"
    }

    getTimeZone(){
        return this.timeZone;
    }

    getToken() {
        return this.client.defaults.headers.common['Authorization']
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            this.client.post('/user/login', {
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

    getAllUsers(offset, limit){
        return new Promise((resolve, reject) => {
            this.client.get('/user', { params: { offset: offset, limit: limit } })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    removeUser(username) {
        return new Promise((resolve, reject) => {
            this.client.delete('/user/'+username)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    modifyUser(username, userData) {
        return new Promise((resolve, reject) => {
            this.client.put('/user/'+username, userData)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    createNewUser(user) {
        return new Promise((resolve, reject) => {
            this.client.post('/user/register', user)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    createNewApartment(apartment) {
        return new Promise((resolve, reject) => {
            this.client.post('/apartment', apartment)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    modifyApartment(id, apartment) {
        return new Promise((resolve, reject) => {
            this.client.put('/apartment/'+id, apartment)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    removeApartment(id) {
        return new Promise((resolve, reject) => {
            this.client.delete('/apartment/'+id)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    getApartments(offset, limit){

        return new Promise((resolve, reject) => {
            this.client.get('/apartment', { params: { offset: offset, limit: limit } })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    getAllApartments(){
        return new Promise((resolve, reject) => {
            this.client.get('/apartment/all')
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    createNewBooking(booking) {
        return new Promise((resolve, reject) => {
            this.client.post('/arrival', booking)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    getCurrentIntervals(){
        return new Promise((resolve, reject) => {
            this.client.get('/interval')
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }
}

export default BackendClient