import * as actions from '../src/action-creators';
import * as types from '../src/constants';


describe('actions: ', () => {

  describe('emit', () => {
    it('should create an action to queue an event', () => {
      const event = () => {};
      const expectedAction = { type: types.QUEUE_EVENT, event };
      expect( actions.emit(event) ).toEqual(expectedAction);
    });
  });

  describe('clearEvtQueue', () => {
    it('should create an action to replace the current queue with an empty array', () => {
      const expectedAction = { type: types.CLEAR_EVT_QUEUE };
      expect( actions.clearEvtQueue() ).toEqual(expectedAction);
    });
  });

});
