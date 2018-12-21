import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Spiner = () => {
  return (
    <Dimmer active>
      <Loader size ='hude' content={'Preparing chat...'}/>
    </Dimmer>
  );
};

export default Spiner;