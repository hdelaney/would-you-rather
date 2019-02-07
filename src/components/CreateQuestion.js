import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/shared';



class CreateQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
		toHome: false
	}


	handleTextChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}


	handleSubmit = (e) => {
		e.preventDefault();

		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		dispatch(handleAddQuestion(optionOne, optionTwo));

		this.setState((prevState) => ({
			optionOne: '',
			optionTwo: '',
			toHome: !prevState.toHome
		}));
	}

	render() {

		const { optionOne, optionTwo, toHome } = this.state;


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
							value={optionOne}
							onChange={this.handleTextChange}
						/>
						<br/><br/>
					</label>
					<p>OR</p>
					<label>
						<input
							type='text'
							name='optionTwo'
							className='add-question-input'
							value={optionTwo}
							onChange={this.handleTextChange}
						/>
						<br/><br/>
					</label>
					<button
						type='submit'
						disabled={optionOne === '' && optionTwo === ''}
						className='dflt-button'
					>
						Submit Question
					</button>
				</form>
			</div>
		)
	}
}


export default connect()(CreateQuestion);