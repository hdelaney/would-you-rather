import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import QandPWrapper from './QandPWrapper';
import CreateQuestion from './CreateQuestion';
import ErrorMessage from './ErrorMessage';
import NavMain from './NavMain';
import LoginPage from './LoginPage';
import LeaderBoard from './LeaderBoard';
import { handleInitialData } from '../actions/shared';


class App extends Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return(
      <Router>
        <div className='container'>
          <NavMain fakeAuth={fakeAuth} />
          <div className='app-container'>
            <Switch>
              <Route
                path='/login'
                render={(props) => <LoginPage {...props} fakeAuth={fakeAuth} />}
              />
              <PrivateRoute path='/' exact component={Dashboard} />
              <PrivateRoute path='/questions/:id' component={QandPWrapper} />
              <PrivateRoute path='/add' component={CreateQuestion} />
              <PrivateRoute path='/leaderboard' component={LeaderBoard} />
              <Route component={ErrorMessage} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}


//fakAuth and PrivateRoute example from React Router docs
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default connect()(App);
