import { RECEIVE_QUESTIONS } from '../actions/questions';
import { ADD_QUESTION } from '../actions/questions';
import { ANSWER_QUESTION } from '../actions/questions';

export default function questions (state = {}, action) {
	switch(action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION :
			return {
				...state,
				[action.question.id]: action.question
			}
		case ANSWER_QUESTION :
			return {
				...state,
				[action.question.qid]: {
					...state[action.question.qid],
					[action.question.answer]: {
						...state[action.question.answer],
						text: state[action.question.qid][action.question.answer].text,
						votes: state[action.question.qid][action.question.answer].votes.concat(action.question.loggedUser)
					}
				}
			}
		default :
			return state
	}
}