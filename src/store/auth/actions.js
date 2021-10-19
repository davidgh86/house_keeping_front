import axios from 'axios'

export function login ({commit}, usr) {
    return new Promise((resolve, reject) => {
        commit('auth_request')

        axios.post(process.env.API_REST_URL+'/user/login', {}, { headers : { Authorization: getBase64Credentials(usr)}})
        .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            const role = response.data.role;
            localStorage.setItem('token', token)
            localStorage.setItem('username', user)
            localStorage.setItem('role', role)
            commit('auth_success', {token, user, role})
            resolve({token, user, role})
        })
        .catch((err) => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('role')
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

function getBase64Credentials(usr) {
    return "Basic " + utf8_to_b64(usr.usr + ":" +usr.pwd)
};

function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
  

export function logout({commit}, client){
    client.logout()
}

