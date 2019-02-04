export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ADD_USER_ANSWERED = 'ADD_USER_ANSWERED';

export function receiveUsers (users) {
	return {
		type: RECEIVE_USERS,
		users
	}
}

export function addQuestionToUser (question) {
	return {
		type: ADD_USER_QUESTION,
		question
	}
}

export function addAnsweredToUser (question) {
	return {
		type: ADD_USER_ANSWERED,
		question
	}
}
