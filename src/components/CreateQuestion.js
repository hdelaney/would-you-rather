import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/shared';



class CreateQuestion extends Component {
	state = {
		text1: '',
		text2: '',
		toHome: false
	}

	handleText1Change = (e) => {
		const text1 = e.target.value;
		this.setState(() => ({
			text1
		}));
	}

	handleText2Change = (e) => {
		const text2 = e.target.value;
		this.setState(() => ({
			text2
		}));
	}


	handleSubmit = (e) => {
		e.preventDefault();

		const { text1, text2 } = this.state;
		const { dispatch } = this.props;

		dispatch(handleAddQuestion(text1, text2));

		this.setState((prevState) => ({
			text1: '',
			text2: '',
			toHome: !prevState.toHome
		}));
	}

	render() {

		const { text1, text2, toHome } = this.state;
		const { loggedUser } = this.props;

		if (loggedUser === null) {
			return <Redirect from='/add' to='/login' exact={true} />
		}

		if (toHome === true) {
			return <Redirect from='/add' to='/' exact={true} />
		}


		return (
			<div className='strd-card'>
				<h3 className='zero-top-margin'>Create new "Would You Rather" question:</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						<span>Would you rather...</span>
						<br/><br/>
						<input
							type='text'
							name='optionOne'
							className='add-question-input'
							value={text1}
							onChange={this.handleText1Change}
						/>
						<br/><br/>
					</label>
					<p>OR</p>
					<label>
						<input
							type='text'
							name='optionTwo'
							className='add-question-input'
							value={text2}
							onChange={this.handleText2Change}
						/>
						<br/><br/>
					</label>
					<button
						type='submit'
						disabled={text1 === '' && text2 === ''}
						className='dflt-button'
					>
						Submit Question
					</button>
				</form>
			</div>
		)
	}
}


function mapStateToProps({ loggedUser }) {
	return {
		loggedUser: loggedUser ? loggedUser : null
	}
}

export default connect(mapStateToProps)(CreateQuestion);