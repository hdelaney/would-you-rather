import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/loggedUser';


//Application navigation
class NavMain extends Component {

	handleLogoutClick = (e) => {
		e.preventDefault();
		const { dispatch, fakeAuth, history } = this.props;
		dispatch(logoutUser());
		fakeAuth.signout(() => history.push('/'));
	}

	render() {

		const { loggedUser } = this.props;


		const userNameAndLogout = (
			<NavLink to='/login' exact onClick={this.handleLogoutClick} className='nav-item nitem-push'>
				Logout {loggedUser}
			</NavLink>
		);

		return (
			<div className='nav'>
				<NavLink to='/' exact className='nav-item' activeClassName='active-nav'>
					Home
				</NavLink>
				<NavLink to='/add' className='nav-item' activeClassName='active-nav'>
					New Question
				</NavLink>
				<NavLink to='/leaderboard' className='nav-item' activeClassName='active-nav'>
					Leader Board
				</NavLink>
				{loggedUser && userNameAndLogout}
			</div>
		);
	}
}


function mapStateToProps({loggedUser}) {
	return {
		loggedUser: loggedUser ? loggedUser : null
	}
}

export default withRouter(connect(mapStateToProps)(NavMain));

