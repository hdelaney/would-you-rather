import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashQuestionCard from './DashQuestionCard';


//displays below the page navigation
class Dashboard extends Component {
	state = {
		showUnanswered: true
	}

	//sets state for showUnanswered, which changes the
	//display to Unanswered questions
	handleUnansweredSubmit = (e) => {
		e.preventDefault();
		this.setState(() => ({
			showUnanswered: true
		}))
	}

	//sets state for showUnanswered, which changes the
	//display to Answered questions
	handleAnsweredSubmit = (e) => {
		e.preventDefault();
		this.setState(() => ({
			showUnanswered: false
		}))
	}

	//renders UI for displaying list of Unanswered or Answered questions
	//Unaswered questions display by default
	render() {
		let { loggedUser, questionsArray } = this.props;

    if ( loggedUser === null) {
      return <Redirect from='/' to='/login' exact={true} />
    }

		return (
			<div>
				<div className='auq-button-wrapper'>
					<button className='dflt-button auq-button' onClick={this.handleUnansweredSubmit}>
						Unanswered Questions
					</button>
					<button className='dflt-button auq-button' onClick={this.handleAnsweredSubmit}>
						Answered Questions
					</button>
				</div>
				{this.state.showUnanswered ? (
					<ul className='ul-list-reset'>
						{questionsArray.filter(question => !question.optionOne.votes.includes(loggedUser)
							&& !question.optionTwo.votes.includes(loggedUser))
								.map((question) => (
									<li key={question.id} className='list-card'>
										<DashQuestionCard id={question.id} />
									</li>
								))
						}
					</ul>
					) : (
					<ul className='ul-list-reset'>
						{questionsArray.filter(question => question.optionOne.votes.includes(loggedUser)
							|| question.optionTwo.votes.includes(loggedUser))
								.map((question) => (
									<li key={question.id} className='list-card'>
										<DashQuestionCard id={question.id} />
									</li>
								))
						}
					</ul> )
				}
				</div>
			)
	}
}


function mapStateToProps ({ loggedUser, questions }) {
	let questionsArray = [];
	questionsArray = Object.keys(questions).map((i) => (
		questions[i]));

	return {
		loggedUser: loggedUser ? loggedUser : null,
		questionsArray: questionsArray.sort((a, b) => b.timestamp - a.timestamp)
	}
}

export default connect(mapStateToProps)(Dashboard);
