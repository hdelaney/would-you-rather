export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function setLoggedUser (id) {
	return {
		type: SET_AUTHED_USER,
		id
	}
}

export function loginLoggedUser (id) {
	return {
		type: LOGIN_USER,
		id
	}
}

export function logoutLoggedUser() {
	return {
		type: LOGOUT_USER
	}
}


export function loginUser (username) {
	return (dispatch => {
		return dispatch(loginLoggedUser(username));
	})
}

export function logoutUser () {
	return (dispatch => {
		return dispatch(logoutLoggedUser());
	})
}