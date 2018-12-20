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
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handlerSubmit = (e) => {
    e.preventDefault();
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

  render() {
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