import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import App from '../App';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';

class Root extends Component {
  render() {
    return (
      <div>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
      </Switch>
      </div>
    );
  }
}

export default Root;