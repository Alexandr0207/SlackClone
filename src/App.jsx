import React, { Component } from 'react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
import {connect} from 'react-redux';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <h2>App</h2> */}
        <Grid columns='equal' className='app' style={{background: this.props.secondary}}>
        <ColorPanel/>
        <SidePanel/>
        <Grid.Column style={{marginLeft: 320}}>
        <Messages/>
        </Grid.Column>
        <Grid.Column width={4}>
        <MetaPanel/>
        </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secondary: state.setColor.secondary, 
})

export default connect (mapStateToProps)(App);
