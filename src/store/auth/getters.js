export function isLoggedIn (state) {
    return !!state.token;
}

export function authStatus (state) {
    return state.status;
}

export function getRole (state) {
    return state.role;
}
