import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/loggedUser';


//Application navigation
class NavMain extends Component {

	handleLogoutClick = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(logoutUser());
	}

	render() {

		const { loggedUser } = this.props;

		const userLinks = (
			<div className='nav'>
				<NavLink to='/' exact className='nav-item' activeClassName='active-nav'>
					Home
				</NavLink>
				<NavLink to='/add' exact className='nav-item' activeClassName='active-nav'>
					New Question
				</NavLink>
				<NavLink to='/leaderboard' className='nav-item' activeClassName='active-nav'>
					Leader Board
				</NavLink>
				<NavLink to='/login' exact onClick={this.handleLogoutClick} className='nav-item nitem-push'>
					Logout {loggedUser}
				</NavLink>
			</div>
		)

		const guestLinks = (
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
				<NavLink to='/login' className='nav-item nitem-push' activeClassName='active-nav'>
					Login
				</NavLink>
			</div>
		)

		return (
			<div>
				{ loggedUser ? userLinks : guestLinks }
			</div>
		)
	}
}


function mapStateToProps({loggedUser}) {
	return {
		loggedUser
	}
}

export default withRouter(connect(mapStateToProps)(NavMain));

