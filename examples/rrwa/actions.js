import {
  OSC,
  GAIN,
  CREATE,
  QUEUE_EVENT,
  CLEAR_EVT_QUEUE } from './constants';


export const clearEvtQueue = () => ({
  type: CLEAR_EVT_QUEUE
});


export const emit = (event) => ({
  type: QUEUE_EVENT,
  event
});


export const createOsc = (id) => ({
  type: CREATE,
  nodeType: OSC,
  id
});


export const createGain = (id) => ({
  type: CREATE,
  nodeType: GAIN,
  id
});
