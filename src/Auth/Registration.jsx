import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import firebase from '../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
class Registration extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errors: [],
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  isFormEmpty = ({ username, email,password, passwordConfirm}) => {
    return !username.length || !email.length || password.length || passwordConfirm.length 
  }

  isPasswordValid = ({password, passwordConfirm}) => {
   return password === passwordConfirm
  }

  isFormValid = () =>{
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)){
      error = {
        message: 'fill in all fields'
      };
      this.setState({
        errors: errors.concat(error)
      })
      return false;
    } else if(!this.isPasswordValid(this.state)){
      error = {
        message: 'Password is invalid'
      };
      this.setState({
        errors: errors.concat(error)
      })
      return false;
    } else {
      return true;
    }
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    if(this.isFormValid()){
    firebase 
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createdUser => {
      console.log(createdUser);
    })
    .catch(err => {
      console.error(err);
    })
  }
  }

  render() {
    const {errors} = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' icon color='orange' textAlign='center'>
            <Icon name='comment alternate' color='orange'/>
            Register for Slack Clone
          </Header>
          <Form onSubmit={this.handlerSubmit} size='large'>
           <Segment stacked>
           <Form.Input fluid name='username' icon='user' iconPosition='left' placeholder='Username' onChange={this.handlerChange} type='text'/>
           <Form.Input fluid name='email' icon='mail' iconPosition='left' placeholder='Email' onChange={this.handlerChange} type='email'/>
           <Form.Input fluid name='password' icon='lock' iconPosition='left' onChange={this.handlerChange} placeholder='Password' type='password'/>
           <Form.Input fluid name='passwordConfirm' icon='repeat' onChange={this.handlerChange} iconPosition='left' placeholder='Password Confirm' type='password'/>
           <Button color='orange' fluid size='large'>Submit</Button>
           </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {errors.map(el => <p key={el.message}>{el.message}</p>)}
            </Message>
          )}
          <Message>
            Already a user?
            <NavLink to='/login'>Login</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Registration;