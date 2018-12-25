import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4';
import firebase from '../firebase.js';
import FileModal from '../FileModal/FileModal.jsx';

class MessageForm extends Component {

  state = {
    message: '',
    loading: false,
    errors: [],
    modal: false,
    uploadTask: null,
    storageRef: firebase.storage().ref(),
    // messagesRef: firebase.database().ref('messages')
  }

  uploadFile = (file,metadata) => {
    const pathToUpload = this.props.currentChannel.id;
    const ref = this.props.messagesRef;
    const filePath = `chat/public/image${uuidv4()}.jpg`;
    this.setState({
      uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
    },
    () => {
      this.state.uploadTask.on(
      "state_changed",
      () => {
        this.state.uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadUrl => {
            this.sendFileMessage(downloadUrl, ref, pathToUpload);
          })
          .catch(err => {
            console.error(err);
          });
      }
    )
  })
}

  sendFileMessage= (url,ref,path) => {
    ref.child(path)
    .push()
    .set(this.createMessage(url))
    .catch(err => {
      console.log(err);
    })
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


  createMessage = (url = null) => {
    const message = {
      // content: this.state.message, 
      time: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.props.currentUser.uid,
        name: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL,
      }
    }
    if(url !== null) {
      message['image'] = url
    } else{
      message['content'] = this.state.message;
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
        <FileModal modal={modal} closeModal={this.close} uploadFile={this.uploadFile}/>
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