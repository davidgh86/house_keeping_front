export function isLoggedIn (state) {
    console.log("is logged in " + !!state.token )
    return !!state.token;
}

export function authStatus (state) {
    console.log("auth status " + state)
    return state.status;
}

export function getRole (state) {
    console.log("role "+ role)
    return state.role;
}
