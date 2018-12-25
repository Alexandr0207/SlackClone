import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../firebase.js'
import {connect} from 'react-redux'

class DirectMessage extends Component {

  state = {
    users: [],
    usersRef: firebase.database().ref('users')
  }

  componentDidMount(){
    setTimeout(() =>{
      if(this.props.user){
        this.addListener(this.props.user.currentUser.uid)
      }
    }, 3000)

  }

  addListener = id => {
    let loadedUsers = [];
    this.state.usersRef.on('child_added', snap => {
      // console.log(id);
      if(id !== snap.key) {
        let user = snap.val();
        user.uid = snap.key;
        user.status = 'offline';
        loadedUsers.push(user);
        this.setState({
          users: loadedUsers
        })
      }
    })
  }

  render() {
    const {users} = this.state;
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail"/> DIRECT MESSAGES
          </span> ({ users.length })
        </Menu.Item>
        {users.map(el => <Menu.Item key={el.uid} onClick={() => console.log(el)} style={{opacity: 0.7, fontStyle: 'italic'}}>
        <Icon name="circle"/>
        @{el.name}
        </Menu.Item>)}
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(DirectMessage);