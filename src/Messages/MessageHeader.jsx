import React, { Component } from 'react';
import { Segment, Icon, Header, Input } from 'semantic-ui-react';

class MessageHeader extends Component {
  render() {
    return (
      <Segment clearing>
        <Header fluid='true' as='h2' floated='left' style={{marginBottom: 0}}>
          <span>Channel <Icon name='star outline' color='black'/></span>
          <Header.Subheader>
            2 users
          </Header.Subheader>
        </Header>
        <Header floated='right'>
          <Input size='mini' icon='search' name='searchTerm' placeholder='Search'/>
        </Header>
      </Segment>
    );
  }
}

export default MessageHeader;