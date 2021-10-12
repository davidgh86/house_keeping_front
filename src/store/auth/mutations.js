export function auth_request (state) {
    state.status = 'loading'
}

export function auth_success(state, token, user, role){
    state.status = 'success'
    state.token = token
    state.user = user
    state.role = role
}

export function auth_error(state){
    state.status = 'error'
}

export function logout(state){
    state.status = ''
    state.token = ''
    state.role = ''
}
