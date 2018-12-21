import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import App from '../App';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions/setUserAction';
import firebase from '../firebase';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';
import {clearUser} from '../redux/actions/ClearUser.js';
import Spiner from '../redux/Spiner/Spiner';

class Root extends Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log(user);
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    })
  }
  render() {
    return this.props.isLoading ? <Spiner/> : (
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
      </Switch>
    );
  }
}


function mapStateToProps(state) {
  return{
    isLoading: state.isLoading,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setUser: function(user){
      dispatch (setUser(user))
    },
    clearUser: function(user){
      dispatch (clearUser(user))
    }
  }
}

export default withRouter(connect (mapStateToProps,mapDispatchToProps)(Root));