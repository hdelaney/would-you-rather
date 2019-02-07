import React from 'react';
import { connect } from 'react-redux';
import AnswerQuestionCard from './AnswerQuestionCard';
import PollCard from './PollCard';
import ErrorMessage from './ErrorMessage';


//wrapper for determining whether a clicked QuestionCard is associated with
//an answered question (display a PollCard)
//or an unaswered question (display an AnswerQuestionCard)
const QandPWrapper = (props) => {

		const { id, question, answered } = props;

		if ( question === null ) {
			return <ErrorMessage />
		}

		return (
			<div className='auq-button-wrapper'>
				{answered ? (
					<PollCard id={id} />
					) : (
						<AnswerQuestionCard id={id} />
					)}
			</div>
		)
}

function mapStateToProps({ loggedUser, questions }, props) {
	const { id } = props.match.params;
	const question = questions[id];
	let answered;

	if (!question) {
		answered = false;
	} else {
		if (question.optionOne.votes.includes(loggedUser) ||
			question.optionTwo.votes.includes(loggedUser)) {
			answered = true;
		}
	}

	return {
		id,
		answered,
		question: question ? question : null
	}
}

export default connect(mapStateToProps)(QandPWrapper);