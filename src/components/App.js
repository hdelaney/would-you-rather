import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import QandPWrapper from './QandPWrapper';
import CreateQuestion from './CreateQuestion';
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
          <NavMain />
            <div className='app-container'>
              <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/questions/:id' component={QandPWrapper} />
                <Route path='/add' component={CreateQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
                <Route path='/login' component={LoginPage} />
                <Route component={LoginPage} />
              </Switch>
            </div>
        </div>
      </Router>
    )
  }
}


export default connect()(App);
