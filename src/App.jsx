import React, { Component } from 'react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <h2>App</h2> */}
        <Grid columns='equal' className='app'>
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

export default App;
