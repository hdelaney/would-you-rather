import { RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWERED } from '../actions/users';

export default function users (state = {}, action) {
	switch(action.type) {
		case RECEIVE_USERS :
			return {
				...state,
				...action.users
			}
		case ADD_USER_QUESTION :
			console.log('State!: ',state);
			console.log(action);
			return {
				...state,
				[action.question.author]: {
					...state[action.question.author],
					questions: state[action.question.author].questions.concat(action.question.id)
				}
			}
		case ADD_USER_ANSWERED :
			console.log(action);
			return {
				...state,
				[action.question.loggedUser]: {
					...state[action.question.loggedUser],
						answers: {
							...state[action.question.loggedUser].answers,
							[action.question.qid]: action.question.answer
						}
				}
			}
		default :
			return state
	}
}

