export function auth_request (state) {
    console.log("state loading")
    state.status = 'loading'
}

export function auth_success(state, token, user, role){
    console.log("state success")
    state.status = 'success'
    state.token = token
    state.user = user
    state.role = role
}

export function auth_error(state){
    console.log("state error")
    state.status = 'error'
}

export function logout(state){
    console.log("state logout")
    state.status = ''
    state.token = ''
    state.role = ''
}
