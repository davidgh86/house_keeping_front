import axios from "axios";

class BackendClient {
    constructor () {
        this.baseUrl = process.env.API_REST_URL;
        this.client = axios.create({
            baseURL: process.env.API_REST_URL || "http://localhost:3000",
        });
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            this.client.post(process.env.API_REST_URL+'/user/login', {
                username: username,
                password: password
            })
            .then((response) => {
                resolve(response.data)
            }, (error) => {
                reject(error)
            })
        })
    }
}