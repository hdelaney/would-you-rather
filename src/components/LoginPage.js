import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginLoggedUser } from '../actions/loggedUser';

//Login page with dropdown for selecting user
//state is not persistent on refresh or manual url navigation
//Application will reroute to /login
class LoginPage extends Component {

	state = {
		username: 'johndoe'
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let { username } = this.state;
		const { dispatch } = this.props;
		dispatch(loginLoggedUser(username));
	}

	handleChange = (e) => {
		e.preventDefault();
		let newUser = e.target.value;
		this.setState(() => ({
			username: newUser
		}));
	}

	render() {

		let { loggedIn } = this.props;

		if ( loggedIn ) {
			return <Redirect to='/' />
		}

		return (
			<div className='strd-card login-card'>
				<h3 className='zero-top-margin'>Select User from dropdown to "login."</h3>
				<form onSubmit={this.handleSubmit}>
					<select
						name='login'
						className='login-select'
						onChange={this.handleChange}
						value={this.state.username}
						>
						<option value='johndoe'>johndoe</option>
						<option value='sarahedo'>sarahedo</option>
						<option value='tylermcginnis'>tylermcginnis</option>
					</select>
					<br/><br/>
					<button className='dflt-button' type='submit'>Login</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps({ loggedUser }) {
	return {
		loggedIn: loggedUser
	}
}

export default connect(mapStateToProps)(LoginPage);