import React, { Component } from 'react';
import { Segment, Icon, Header, Input } from 'semantic-ui-react';
import {connect} from 'react-redux'

class MessageHeader extends Component {
  render() {
    const {countUser} = this.props;
    return (
      <Segment clearing>
        <Header fluid='true' as='h2' floated='left' style={{marginBottom: 0}}>
          <span>#{this.props.CurrentChannel && this.props.CurrentChannel.name}<Icon name='star outline' color='black'/></span>
          <Header.Subheader>
            {countUser}
          </Header.Subheader>
        </Header>
        <Header floated='right'>
          <Input size='mini' icon='search' name='searchTerm' placeholder='Search'/>
        </Header>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    CurrentChannel: state.channel,
  }
}

export default connect(mapStateToProps, null)(MessageHeader);