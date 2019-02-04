import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';


//for questions to be answered
//displays the two Would You Rather options for the question
//along with which user asked the question
class AnswerQuestionCard extends Component {

	state = {
		answer: ''
	}

	handleAnswerChange = (e) => {
		const answer = e.target.value;

		this.setState({
			answer
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { answer } = this.state;
		const { dispatch, loggedUser, id } = this.props;

		dispatch(handleAnswerQuestion({
			loggedUser: loggedUser,
			qid: id,
			answer: answer
		}));

		this.setState({
			answer: ''
		});
	}

	render() {

		const { avatar, question } = this.props;
		const { author, optionOne, optionTwo } = question;

		return (
			<div className='strd-card'>
				<div className='qwrap-flex'>
					<div className='avatar-wrapper'>
						<img alt='user avatar' className='avatar' src={avatar} />
					</div>
					<div className='question-wrapper'>
						<h3 className='zero-top-margin'>{author} asks:</h3>
						<p>Would you rather...</p>
						<form onSubmit={this.handleSubmit}>
							<label>
								<input
									type='radio'
									name='would-you-rather'
									value='optionOne'
									checked={this.state.answer === 'optionOne'}
									onChange={this.handleAnswerChange}
								/>
								&nbsp;{optionOne.text}
							</label>
							<br/><br/>
							<label>
								<input
									type='radio'
									name='would-you-rather'
									value='optionTwo'
									checked={this.state.answer === 'optionTwo'}
									onChange={this.handleAnswerChange}
								/>
								&nbsp;{optionTwo.text}
							</label>
							<br/><br/>
							<button type='submit' className='dflt-button'>Submit Answer</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}


function mapStateToProps({ loggedUser, users, questions }, { id }) {
	const question = questions[id];
	const author = question.author;
	const avatar = users[author].avatarURL;

	return {
		loggedUser: loggedUser ? loggedUser : null,
		id,
		avatar: avatar,
		question: question
	};
}

export default connect(mapStateToProps)(AnswerQuestionCard);

