import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import firebase from '../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';


class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: [],
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  isFormEmpty = ({email, password}) => {
    return !email.length || !password.length;
  }

  isFormValid = () => {
    let errors = [];
    let error;
    if(this.isFormEmpty(this.state)){
      error = {
        message: 'Fill in all fields'
      };
      this.setState({
        errors: errors.concat(error)
      })
      return false;
    } else {
      this.setState({
        errors: []
      })
      return true
    }
  }

  handlerInput = (errors, inputName) => {
    return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : '';
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    if(this.isFormValid()){
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(signedInUser => {
      console.log(signedInUser);
    })
    .catch(err => {
      console.error(err);
      this.setState({ 
      errors: this.state.errors.concat(err), 
      loading: false
    })
    })
  }
  }

  render() {
    const {errors} = this.state;
    return (
      <div>
         <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' icon color='purple' textAlign='center'>
            <Icon name='code branch' color='purple'/>
            Login to Slack Clone
          </Header>
          <Form onSubmit={this.handlerSubmit} size='large'>
           <Segment stacked>
           <Form.Input fluid name='email' icon='mail' iconPosition='left' placeholder='Email' onChange={this.handlerChange} type='email'/>
           <Form.Input fluid name='password' icon='lock' iconPosition='left' onChange={this.handlerChange} placeholder='Password' type='password'/>
           <Button color='purple' fluid size='large'>Submit</Button>
           </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {errors.map(el => <p key={el.message}>{el.message}</p>)}
            </Message>
          )}
          <Message>
            Don`t have not account?
            <NavLink to='/registration'>Registration</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default Login;