import React from 'react';

import RRWAEngine from '../rrwa/component';
import RRWAExamplesApp from './components';
// import RRWAExamplesApp from '../../../react-redux-webaudio';


export default () => {

  return (
    <div>
      <RRWAEngine />
      <RRWAExamplesApp />
    </div>
  );
};
