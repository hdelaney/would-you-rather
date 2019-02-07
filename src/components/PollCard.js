import React from 'react';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaCheckCircle } from 'react-icons/fa';


//Component displaying poll results when a user clicks to see results
//of a question they have already answered
const PollCard = (props) => {

	const { question, avatar, userAnswer } = props;
	const author = question.author

	const optionOneVotes = question.optionOne.votes.length;
	const optionTwoVotes = question.optionTwo.votes.length;
	const totalVotes = optionOneVotes + optionTwoVotes;

	//for diplaying percentages of voting results
	const optionOnePer = (Math.floor((optionOneVotes/totalVotes) * 100)).toString();
	const optionTwoPer = (Math.floor((optionTwoVotes/totalVotes) * 100)).toString();

	return (
		<div className='strd-card'>
			<div className='qwrap-flex'>
				<div className='avatar-wrapper'>
					<img alt='user avatar' className='avatar' src={avatar} />
				</div>
				<div className='question-wrapper'>
					<h3 className='zero-top-margin'>Asked by {author}</h3>
					<h4>Results:</h4>

					<p>{userAnswer === 'optionOne' &&
							<IconContext.Provider value={{color: 'rgb(34, 119, 119)'}}>
								<FaCheckCircle /> &nbsp;
							</IconContext.Provider>
						}
						Would you rather {question.optionOne.text}
					</p>
					<p className='vote-stat'>{optionOnePer}% voted for this choice. That's {optionOneVotes.toString()} out of {totalVotes.toString()} votes.</p>
					<hr />
					<p>{userAnswer === 'optionTwo' &&
						<IconContext.Provider value={{color: 'rgb(34, 119, 119)'}}>
								<FaCheckCircle /> &nbsp;
							</IconContext.Provider>
						}
						Would you rather {question.optionTwo.text}
					</p>
					<p className='vote-stat'>{optionTwoPer}% voted for this choice. That's {optionTwoVotes.toString()} out of {totalVotes.toString()} votes.</p>
				</div>
			</div>
		</div>
	)
}


function mapStateToProps({ loggedUser, users, questions }, props) {
	const { id } = props;
	const userAnswer = users[loggedUser].answers[id];

	const question = questions[id];
	const author = users[question.author];
	const avatar = author.avatarURL;

	return {
		userAnswer,
		avatar,
		question: !questions[id]
			? []
			: questions[id]
	}
}

export default connect(mapStateToProps)(PollCard);