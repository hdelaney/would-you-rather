import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { loginLoggedUser } from '../actions/loggedUser';

//Login page with dropdown for selecting user
//state is not persistent on refresh or manual url navigation
//Application will reroute to /login
class LoginPage extends Component {


	state = {
		username: 'johndoe',
    redirectToReferrer: false
  }


	handleSubmit = (e) => {
		e.preventDefault();
		let { username } = this.state;
		const { loginUser, fakeAuth } = this.props;
		loginUser(username);
		fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    });
	}

	handleChange = (e) => {
		e.preventDefault();
		let newUser = e.target.value;
		this.setState(() => ({
			username: newUser
		}));
	}

	render() {

		let { redirectToReferrer } = this.state;

		let { from } = this.props.location.state || { from: { pathname: '/' } };
    console.log(from);
    console.log(this.props);

    if (redirectToReferrer) return <Redirect to={ from } />;

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


function mapDispatchToProps (dispatch) {
	return {
		loginUser: (username) => dispatch(loginLoggedUser(username))
	}
}

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));