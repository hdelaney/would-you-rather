import { SET_AUTHED_USER } from '../actions/loggedUser';
import { LOGIN_USER } from '../actions/loggedUser';
import { LOGOUT_USER } from '../actions/loggedUser';

export default function authedUser (state = null, action) {
	switch (action.type) {
		case SET_AUTHED_USER :
			return action.id
		case LOGIN_USER :
			return action.id
		case LOGOUT_USER :
			return null
		default :
			return state
	}
}