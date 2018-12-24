import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Button } from 'semantic-ui-react';
import firebase from '../firebase.js';
import {connect} from 'react-redux';
import {setCurrentChannel} from '../redux/actions/channels.js'

class Channels extends Component {

  state = {
    channels: [],
    title: '',
    description: '',
    modal: false,
    channelsRef: firebase.database().ref('channels'),
    firstLoad: true,
    activeChannel: false,
  }

  componentDidMount(){
    this.addListeners();
  }

  addListeners = () =>{
    let loadedChannels = [];
    this.state.channelsRef.on('child_added', snap =>{
      loadedChannels.push(snap.val())
      console.log(loadedChannels);
      this.setState({
        channels: loadedChannels
      }, () => {this.loadFirstChannel()})
    })
  }

  loadFirstChannel = () => {
    if(this.state.firstLoad && this.state.channels.length>0){
      this.props.setCurrentChannel(this.state.channels[0]);
      // this.showActiveChannel(this.state.channels[0])
    }
    this.setState({
      firstLoad: false
    })
  }

  openModal = () =>{
    this.setState({
      modal: true,
    })
  }

  addChannel = () => {
    const {channelsRef, title, description} = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key, 
      name: title,
      details: description,
      createdBy: {
        name: this.props.user.displayName,
        avatar: this.props.user.photoURL
      }
    }
    channelsRef
    .child(key)
    .update(newChannel)
    .then(() => {
      this.setState({
        title: '', description: ''
      })
      this.closeModal();
      console.log('channel added');
    })
    .catch( err => console.log(err))
  }

  closeModal = () => {
    this.setState({
      modal: false,
    })
  }
  
  showActiveChannel = (channel) => {
    this.setState({
      activeChannel: channel.id,
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.title == '' && !this.state.description == ''){ 
      this.addChannel();
    }
  }

  // isFormValid = ({title, description}) => title && description;

  handlerChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const {channels} = this.state;
    return (
      <React.Fragment>
      <Menu.Menu style={{paddingBottom: '2rem'}}>
        <Menu.Item>
          <span>
            <Icon name='exchange'/> CHANNELS
          </span> ({channels.length}) <Icon name='add' onClick={this.openModal}/>
        </Menu.Item>
        {channels.length > 0 && channels.map(channel => (
          <Menu.Item onClick={(() => {this.props.setCurrentChannel(channel)
          this.showActiveChannel(channel)})} active={channel.id === this.state.activeChannel} key={channel.id} name={channel.name} style={{opacity: 0.7}}>
          # {channel.name}
          </Menu.Item>
        ))}
      </Menu.Menu>
      <Modal open={this.state.modal} onClose={this.closeModal} style={{background: '#fff'}}>
       <Modal.Header>
        Add a Channel   
       </Modal.Header>
       <Modal.Content>
         <Form onSubmit={this.handleSubmit}>
          <Form.Input fluid label="Name:" name='title' onChange={this.handlerChange} placeholder="Name of channel" type="text"/>
          <Form.Input fluid label="Description:" name='description' onChange={this.handlerChange} placeholder="Description of channel" type="text"/>
          </Form>
       </Modal.Content>
       <Modal.Actions>
          <Button size="large" onClick={this.closeModal} color='red'>Cancel</Button>
          <Button size="large" onClick={this.handleSubmit} color='green'><Icon name='checkmark'/>Add Channel</Button>
       </Modal.Actions>
      </Modal>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state){
  return {
    user: state.user.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentChannel: function (params) {
          dispatch(setCurrentChannel(params));
        }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Channels);