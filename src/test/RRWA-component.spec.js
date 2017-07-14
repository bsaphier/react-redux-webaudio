/*globals jest*//*eslint-disable react/jsx-pascal-case*/
import React from 'react';
import { mount, shallow } from 'enzyme';

import { RRWA, mapState, mapDispatch } from '../react/RRWA-component';


const delay = ms => new Promise(res => setTimeout(res, ms));


describe('RRWA component', () => {

  let spy, wrapper, _audioCtx_, _instance_;

  describe('Lifecycle Methods:', () => {

    describe('componentWillMount', () => {
      it('creates an instance of AudioContext', () => {
        expect.assertions(2);
        spy = jest.spyOn(RRWA.prototype, 'componentWillMount');
        _audioCtx_ = mount(<RRWA />).instance().audioContext;
        expect(spy).toHaveBeenCalled();
        expect(_audioCtx_).toBeInstanceOf(global.AudioContext);
      });
    });

    describe('componentWillReceiveProps', () => {
      let eventMock = jest.fn();
      let event1 = { key: 0, event: eventMock };
      let event2 = { key: 1, event: eventMock };
      let event3 = { key: 2, event: eventMock };
      it('calls processEvent on each event in props.events', () => {
        spy = jest.spyOn(RRWA.prototype, 'componentWillReceiveProps');
        let processEventSpy = jest.spyOn(RRWA.prototype, 'processEvent');
        wrapper = mount(<RRWA />);
        wrapper.setProps({ events: [], clearQ: jest.fn() });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(processEventSpy).not.toHaveBeenCalled();
        wrapper.setProps( { events: [ event1, event2, event3 ]} );
        expect(spy).toHaveBeenCalledTimes(2);
        expect(eventMock).toHaveBeenCalledTimes(3);
        expect(processEventSpy).toHaveBeenCalledTimes(3);
      });
    });

    describe('shouldComponentUpdate', () => {
      it('returns true if any events are queued in props.events', () => {
        wrapper = shallow(<RRWA />);
        let nextProps = { events: [
          { key: 0, event: function() {} }
        ]};
        let shouldUpdate = wrapper.instance().shouldComponentUpdate(nextProps);
        expect(shouldUpdate).toBe(true);
      });
    });

  });

  describe('Instance Methods:', () => {

    beforeEach(() => {
      wrapper = mount(<RRWA />);
      _instance_ = wrapper.instance();
      _audioCtx_ = _instance_.audioContext;
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('shouldn\'t error', () => {
      expect( wrapper ).toBeTruthy();
    });

    it('should be an instance of RRWA-component', () => {
      expect( _instance_ ).toBeInstanceOf(RRWA);
    });

    it('shouldn\'t render anything', () => {
      expect(wrapper.getNode().render()).toBeNull();
    });

    describe('getCurrTime', () => {
      it('should return the currentTime of the audioContext instance', () => {
        expect( _audioCtx_.currentTime ).toEqual( 0 );
        expect( _instance_.getCurrTime() ).toEqual( 0 );
        _audioCtx_.processTo(500);
        return delay(510).then(() => {
          expect( _audioCtx_.currentTime ).toBeLessThan(500.01);
          expect( _audioCtx_.currentTime ).toBeGreaterThanOrEqual(500);
        });
      });
    });

    describe('processEvent', () => {
      it('should call the function passed as args[0].event', () => {
        let audioEvent = jest.fn();
        _instance_.processEvent({ event: audioEvent });
        expect( audioEvent.mock.calls.length ).toBe(1);
      });
    });

  });

  describe('Functions for Redux:', () => {

    describe('mapStateToProps', () => {

      let mockState = { webAudioReducer: { nodes: {}, events: [] } };

      it('returns an object containing the values of the webAudioReducer', () => {
        expect(mapState(mockState)).toEqual(mockState.webAudioReducer);
        expect(mapState(mockState)).toMatchObject(mockState.webAudioReducer);
      });

      it('returns a new object', () => {
        expect(mapState(mockState)).not.toBe(mockState.webAudioReducer);
        expect(mapState(mockState)).not.toContain(mockState.webAudioReducer.nodes);
        expect(mapState(mockState)).not.toContain(mockState.webAudioReducer.events);
      });

    });

    describe('mapDispatchToProps', () => {

      it('returns an object containing a function, clearQ', () => {
        expect(mapDispatch()).toHaveProperty('clearQ');
      });

      it('the value of clearQ is a function that calls the function passed to mapDispatch', () => {
        let dispatch = jest.fn();
        let mappedProps = mapDispatch(dispatch);
        mappedProps.clearQ();
        expect(dispatch).toHaveBeenCalled();
      });

    });

  });


});
