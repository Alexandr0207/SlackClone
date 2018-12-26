import React, { Component } from 'react';
import { Sidebar, Divider, Button, Menu, Modal, Segment, Label, Icon } from 'semantic-ui-react';
import firebase from '../firebase.js'
import {SketchPicker} from 'react-color';
import {connect} from 'react-redux';
import {setColors} from '../redux/actions/setColor.js'

class ColorPanel extends Component {

  state = {
    modal: false,
    primary: '',
    secondary: '',
    usersRef: firebase.database().ref("users"),
    userColors: [],
  }

  componentDidMount() {
    // console.log();
    setTimeout(() =>{
      if (this.props.user.currentUser){
        this.addListener(this.props.user.currentUser.uid);
      }
    }, 2000) 
  }

  addListener = userId =>{
    let userColors = [];
    this.state.usersRef.child(`${userId}/colors`).on("child_added", snap =>{
      userColors.unshift(snap.val());
      this.setState({
        userColors
      });
    });
  }

displayUserColor = colors =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className="color__container"
          onClick={() => this.props.setColors(color.primary, color.secondary)}
        >
          <div className="color__square" style={{ background: color.primary }}>
            <div
              className="color__overlay"
              style={{ background: color.secondary }}
            />
          </div>
        </div>
      </React.Fragment>
    ));
    

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
     .child(`${this.props.user.currentUser.uid}/colors`)
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
    const {modal, primary, secondary, userColors} = this.state
    return (
      <Sidebar as={Menu} icon='labeled' inverted visible vertical width='very thin'>
      <Divider/>
      <Button icon='add' size='small' color='blue' onClick={this.openModal}/>
      {this.displayUserColor(userColors)}
      <Modal basic open={modal} onClose={this.closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label content="Primary Color"/>
            <SketchPicker fluid onChange={this.handleChangePrimaryColor} color={primary}/>  
          </Segment>
          <Segment>
            <Label content="Secondary Color"/>
            <SketchPicker fluid onChange={this.handleChangeSecondaryColor} color={secondary}/>  
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
  user: state.user, 
})

function mapDispatchToProps(dispatch) {
  return{
    setColors: function(primary, secondary){
      dispatch(setColors(primary, secondary))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPanel);