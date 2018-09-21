import { QUEUE_EVENT, CLEAR_EVT_QUEUE } from './constants';
export const clearEvtQueue = () => ({
  type: CLEAR_EVT_QUEUE
});
/**
 * `event` can be a single event or an array of events. An array passed as
 * `event` will be concatenated with the current event queue.
 * @param {Event | Event[]} event
 */

export const emit = event => ({
  type: QUEUE_EVENT,
  event
});