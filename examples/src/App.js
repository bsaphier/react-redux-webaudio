import React from 'react';
import { RRWAEngine }  from 'react-redux-webaudio';

import RRWAExamplesApp from './components';
import './styles/main.scss';


export default () => (
  <div>
    <RRWAEngine />
    <RRWAExamplesApp />
  </div>
);
