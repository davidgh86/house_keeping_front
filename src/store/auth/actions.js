import axios from 'axios'

export function login ({commit}, user) {
    return new Promise((resolve, reject) => {
        commit('auth_request')

        console.log("aqui si")

        axios.post(process.env.API_REST_URL+'/user/login', {
            username: user.usr,
            password: user.pwd
        })
        .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            const role = response.data.role;
            localStorage.setItem('token', token)
            commit('auth_success', token, user, role)
            resolve({token, user, role})
        })
        .catch((err) => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
        })
    })

    // TODO register 
    // return new Promise((resolve, reject) => {
    //     commit('auth_request')
    //     backendClient.register(user.username, user.password)
    //     .then((response) => {
    //         const token = response.token;
    //         const user = response.user;
    //         const role = response.role;
    //         localStorage.setItem('token', token)
    //         commit('auth_success', token, user, role)
    //         resolve(response)
    //     })
    //     .catch((err) => {
    //         commit('auth_error')
    //         localStorage.removeItem('token')
    //         reject(err)
    //     })
    // })
}

export function logout({commit}, client){
    client.logout()
}

