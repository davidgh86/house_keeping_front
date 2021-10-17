export function auth_request (state) {
    state.status = 'loading'
}

export function auth_success(state, userData){
    state.status = 'success'
    state.token = userData.token
    state.user = userData.user
    state.role = userData.role
}

export function auth_error(state){
    state.status = 'error'
}

export function logout(state){
    state.status = ''
    state.token = ''
    state.role = ''
}
