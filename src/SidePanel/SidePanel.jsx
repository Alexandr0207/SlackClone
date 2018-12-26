import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from '../UserPanel/UserPanel';
import Channels from '../Channels/Channels';
import DirectMessage from '../Messages/DirectMessage';
import {connect} from 'react-redux'

class SidePanel extends Component {
  render() {
    return (
        <Menu size='large' inverted fixed='left' vertical style={{background: this.props.primary, fontSize:'1.2rem'}}>
        <UserPanel/>
        <Channels/>
        <DirectMessage/>
        </Menu>
    );
  }
}

const mapStateToProps = state => ({
  primary: state.setColor.primary, 
})

export default connect (mapStateToProps)(SidePanel);