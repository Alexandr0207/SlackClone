import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import firebase from '../firebase.js';
import {connect} from 'react-redux';
import FileModal from '../FileModal/FileModal.jsx';

class MessageForm extends Component {

  state = {
    message: '',
    loading: false,
    errors: [],
    modal: false,
    // messagesRef: firebase.database().ref('messages')
  }

  handleChange = e =>{
    this.setState({
    [e.target.name]: e.target.value,
  })}

  open = () => {
    this.setState({
      modal: true,
    })
  }

  close = () => {
    this.setState({
      modal: false,
    })
  }


  createMessage = () => {
    const message = {
      content: this.state.message, 
      time: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.currentUser.uid,
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL,
      }
    }
    return message
  }

  sendMessage = () =>{
    const {messagesRef, currentChannel} = this.props;
    const {message} = this.state;
  if(message) {
    this.setState({
      loading: true,
    })
    messagesRef
    .child(currentChannel.id)
    .push()
    .set(this.createMessage())
    .then(()=>{
      this.setState({loading: false,message: ''})
    })
    .catch (err => {
      this.setState({
        loading: false,
        errors: this.state.errors.concat(err)
      })
    })
}
}


  render() {
    const{modal} = this.state;
    return (
      <Segment className='message__form'>
        <Input fluid name='message' value={this.state.message} onChange={this.handleChange} style={{marginBottom: '0.7rem'}} label={<Button icon = 'add'/>} labelPosition='left' placeholder='Write your message'/>
        <Button.Group icon widths='2'>
          <Button color='orange' onClick={this.sendMessage} content='Add Reply' labelPosition='left' icon='edit'/>
          <Button color='teal' content='Upload media' labelPosition='right' onClick={this.open} icon='cloud upload'/>
        <FileModal modal={modal} closeModal={this.close}/>
        </Button.Group>
      </Segment>
    );
  }
}

function mapStateToProps(state){
  return {
    currentChannel: state.channel,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(MessageForm);