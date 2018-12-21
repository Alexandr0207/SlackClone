import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Button } from 'semantic-ui-react';

class Channels extends Component {

  state = {
    channels: [],
    title: '',
    description: '',
    modal: false,
  }

  openModal = () =>{
    this.setState({
      modal: true,
    })
  }

  closeModal = () => {
    this.setState({
      modal: false,
    })
  }

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
      </Menu.Menu>
      <Modal open={this.state.modal} onClose={this.closeModal} style={{background: '#fff'}}>
       <Modal.Header>
        Add a Channel   
       </Modal.Header>
       <Modal.Content>
         <Form>
          <Form.Input fluid label="Name:" name='title' onChange={this.handlerChange} placeholder="Name of channel" type="text"/>
          <Form.Input fluid label="Description:" name='description' onChange={this.handlerChange} placeholder="Description of channel" type="text"/>
          </Form>
       </Modal.Content>
       <Modal.Actions>
          <Button size="large" onClick={this.closeModal} color='red'>Cancel</Button>
          <Button size="large" color='green'><Icon name='checkmark'/>Add Channel</Button>
       </Modal.Actions>
      </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;