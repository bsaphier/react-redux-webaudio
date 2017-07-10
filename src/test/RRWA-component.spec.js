/*globals jest*//*eslint-disable react/jsx-pascal-case*/
import React from 'react';
import { mount } from 'enzyme';

import { RRWA } from '../react/RRWA-component';


describe('RRWA component', () => {

  let wrapper, _audioCtx_, _instance_;

  beforeEach(() => {
    wrapper = mount(<RRWA />);
    _instance_ = wrapper.instance();
    _audioCtx_ = _instance_.audioContext;
  });

  afterEach(() => {
    wrapper.unmount();
  });


  describe('rendering', () => {

    it('should be an instance of RRWA-component', () => {
      expect( _instance_ ).toBeInstanceOf(RRWA);
    });

    it('shouldn\'t render anything', () => {
      expect(wrapper.getNode().render()).toBeNull();
    });

  });


  describe('getCurrTime', () => {

    it('should return the currentTime of the audioContext instance', () => {
      expect( _audioCtx_.currentTime ).toEqual(0);
      expect( _instance_.getCurrTime() ).toEqual( _audioCtx_.currentTime );
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
