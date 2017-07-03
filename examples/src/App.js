import React from 'react';

import { RRWAEngine }  from '../../../react-redux-webaudio';
import RRWAExamplesApp from './components';


export default () => {

  return (
    <div>
      <RRWAEngine />
      <RRWAExamplesApp />
    </div>
  );
};
