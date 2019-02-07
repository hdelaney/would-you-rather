import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class LeaderBoard extends Component {

	//UI for the leaderboard of users
	//leader is determined by highest sum of total questions asked and answered
	//leader list is sorted by this highest sum, descending order
	//sum and sorting is done in mapStateToProps
	render() {

		const { leaderArray } = this.props;


		return (
			<ul className='ul-list-reset'>
				{leaderArray.map((user) => (
					<li key={user.id} className='list-card'>
						<div className='qwrap-flex'>
							<div className='avatar-wrapper'>
								<img alt='user avatar' className='avatar' src={user.avatarURL} />
							</div>
							<div className='question-wrapper'>
								<h3 className='zero-top-margin'>{user.id}</h3>
								<h5>Number Answered</h5>
									<p>{user.answerCount}</p>
								<h5>Number Asked</h5>
									<p>{user.askedCount}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		)
	}
}

//usersArray is created so map function can be used in LeaderBoard component
//user state is originally not an array
function mapStateToProps ({ loggedUser, users }) {

	let leaderArray = [];
	let usersArray = Object.keys(users).map((i) => (users[i]));

	usersArray.forEach((user) => (
		leaderArray.push({
			id: user.id,
			avatarURL: user.avatarURL,
			answerCount: Object.keys(user.answers).length,
			askedCount: user.questions.length,
			totalCount: (Object.keys(user.answers).length) + (user.questions.length)
		})
	))

	return {
		leaderArray: leaderArray.sort((a,b) => b.totalCount - a.totalCount)
	}

}

export default withRouter(connect(mapStateToProps)(LeaderBoard));