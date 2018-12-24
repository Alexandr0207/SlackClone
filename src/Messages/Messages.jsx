import React, { Component } from 'react';
import MessageHeader from './MessageHeader';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from './MessageForm'
import firebase from '../firebase'
import {connect} from 'react-redux';
import SingleMessage from '../SingleMessage/SingleMessage';
import FileModal from '../FileModal/FileModal';

class Messages extends Component {

  state= {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    loading: true,
    modal: false,
  }
  
  componentDidMount () {
    setTimeout(()=>{
      const {currentChannel, currentUser} = this.props;
    if(currentChannel && currentUser) {
      console.log('hello');
      this.addListeners(currentChannel.id)
    }
  },3000)
  }
  // componentDidUpdate (prevProps) {

  // }

  addListeners = channelId =>{
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap =>{
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        loading: false
      })
    })
  }
  
  render() {
    const {messagesRef, messages, modal} = this.state;
    return (
      <React.Fragment>
        <MessageHeader/>
        <Segment>
          <Comment.Group className='messages'>
            {messages.length > 0 && messages.map (message => <SingleMessage key={message.time} message={message} user={message.user}/>)}
          </Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef}/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    currentChannel: state.channel,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, null)(Messages);