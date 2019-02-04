import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { addQuestion } from '../actions/questions';
import { answerQuestion } from './questions';
import { addQuestionToUser, addAnsweredToUser } from './users';


export function handleInitialData () {
	return (dispatch) => {
		return getInitialData()
			.then(({users, questions}) => {
				dispatch(receiveUsers(users));
				dispatch(receiveQuestions(questions));
			})
	}
}

//Non-optimistic update
export function handleAddQuestion (optionOneText, optionTwoText, author) {
	return (dispatch, getState) => {
		const { loggedUser } = getState();

		return saveQuestion({
			optionOneText,
			optionTwoText,
			author: loggedUser
		}).then((question) => {
			dispatch(addQuestion(question));
			dispatch(addQuestionToUser(question));
		}).catch((e) => {
			console.warn('Error in handleAddQuestion: ', e);
			alert('There was an error adding the question. Please login and try again.')
		})
	}
}

//Optimistic update
export function handleAnswerQuestion (info) {
	return (dispatch, getState) => {
		dispatch(answerQuestion(info))
		dispatch(addAnsweredToUser(info))

		return saveQuestionAnswer(info)
			.catch((e) => {
				console.warn('Error in handleAnswerQuestion: ', e)
				alert('There was an error answering the question. Please login and try again.')
			})
	}
}
