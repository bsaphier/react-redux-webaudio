import webAudioReducer from '../web-audio-reducer';
import * as types from '../constants';


const event1 = function() {};
const event2 = function() {};
const event3 = function() {};
const event4 = function() {};


const INIT_STATE = { events: [] };


describe('webAudioReducer', () => {

  it('should return the initial state', () => {
    expect( webAudioReducer(undefined, {}) ).toEqual(INIT_STATE);
  });

  describe('should handle QUEUE_EVENT', () => {

    it('with a single event', () => {
      expect( webAudioReducer(
        INIT_STATE,
        { type: types.QUEUE_EVENT, event: event1 }
      )).toEqual({ events: [{ key: 0, event: event1 }] });

      expect( webAudioReducer(
        { events: [{ key: 0, event: event1 }] },
        { type: types.QUEUE_EVENT, event: event2 }
      )).toEqual({ events: [
        { key: 0, event: event1 },
        { key: 1, event: event2 }
      ]});
    });

    it('with an array of events', () => {
      expect( webAudioReducer(
        INIT_STATE,
        {
          type: types.QUEUE_EVENT,
          event: [ event1, event2 ]
        }
      )).toEqual({ events: [
        { key: 0, event: event1 },
        { key: 1, event: event2 }
      ]});

      expect( webAudioReducer(
        { events: [{ key: 0, event: event1 }] },
        {
          type: types.QUEUE_EVENT,
          event: [ event2, event3, event4 ]
        }
      )).toEqual({ events: [
        { key: 0, event: event1 },
        { key: 1, event: event2 },
        { key: 2, event: event3 },
        { key: 3, event: event4 }
      ]});
    });
  });


  describe('should handle CLEAR_EVT_QUEUE', () => {

    it('with an empty queue', () => {
      expect( webAudioReducer(
        INIT_STATE,
        { type: types.CLEAR_EVT_QUEUE }
      )).toEqual( INIT_STATE );
    });

    it('with a queue full of events', () => {
      expect( webAudioReducer(
        { events: [
            { key: 0, event: event1 },
            { key: 1, event: event2 }
        ]},
        { type: types.CLEAR_EVT_QUEUE }
      )).toEqual( INIT_STATE );
    });
  });
});
