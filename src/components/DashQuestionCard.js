import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


// used for the individual questions diplayed by Dashboard
// within a map iterator returning DashQuestionCard within a list item
class DashQuestionCard extends Component {

	//renders various user and question information
	render() {

		const { avatar, question } = this.props;

		if (question === null) {
			return <p>This question doesn't exist.</p>
		}

		//id is the question id, here (not the user id)
		const { id, author, optionOne } = question;

		return (
			<div className='qwrap-flex'>
				<div className='avatar-wrapper'>
					<img alt='user avatar' className='avatar' src={avatar} />
				</div>
				<div className='question-wrapper'>
					<h3 className='zero-top-margin'>{author} asks:</h3>
					<p>Would you rather...</p>
					<p>{optionOne.text} OR...</p>
					<Link to={`/questions/${id}`}>
						<button className='dflt-button'>View Poll</button>
					</Link>
				</div>
			</div>
		)
	}
}

//id is the question id, here (not the user id)
function mapStateToProps ({ users, questions }, { id }) {
	const question = questions[id];
	const author = users[question.author];
	const avatar = author.avatarURL;

	return {
		avatar: avatar ? avatar : null,
		question: question ? question : null
	}
}

export default connect(mapStateToProps)(DashQuestionCard);