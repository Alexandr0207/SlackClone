import React, { Component } from 'react';
import { Sidebar, Divider, Button, Menu, Modal, Segment, Label, Icon } from 'semantic-ui-react';
import firebase from '../firebase.js'
import {TwitterPicker} from 'react-color';
import {connect} from 'react-redux'

class ColorPanel extends Component {

  state = {
    modal: false,
    primary: '',
    secondary: '',
    usersRef: firebase.database().ref("users")
  }

  openModal = () => {
    this.setState({
      modal: true,
    })
  }

  closeModal = () => {
    this.setState({
      modal: false,
    })
  }

  handleChangePrimaryColor = color => {
    this.setState({
      primary: color.hex
    })
  }

  handleChangeSecondaryColor = color => {
    this.setState({
      secondary: color.hex
    })
  }

  handleSaveColors = () =>{
    if(this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary)
    }
  }

  saveColors = (primary, secondary) => {
    this.state.usersRef
     .child(`${this.props.user.uid}/colors`)
     .push()
     .update({
       primary,
       secondary
     })
     .then (()=>{
       console.log("Colors added");
       this.closeModal();
     })
     .catch(err => console.error(err));
  }


  render() {
    const {modal, primary, secondary} = this.state
    return (
      <Sidebar as={Menu} icon='labeled' inverted visible vertical width='very thin'>
      <Divider/>
      <Button icon='add' size='small' color='blue' onClick={this.openModal}/>
      <Modal basic open={modal} onClose={this.closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label content="Primary Color"/>
            <TwitterPicker onChange={this.handleChangePrimaryColor} color={primary}/>  
          </Segment>
          <Segment>
            <Label content="Secondary Color"/>
            <TwitterPicker onChange={this.handleChangeSecondaryColor} color={secondary}/>  
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.handleSaveColors}>
            <Icon name='checkmark' /> Save Colors
          </Button>
          <Button color='red' inverted onClick={this.closeModal}>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>

      </Modal>
      </Sidebar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser
})

export default connect(mapStateToProps)(ColorPanel);