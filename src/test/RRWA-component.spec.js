import React from 'react';
import renderer from 'react-test-renderer';
import { RRWA, mapState, mapDispatch } from '../react/RRWA-component';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


describe('RRWA component', () => {
  describe('*** Lifecycle Methods ***', () => {
    // let eventMock = jest.fn();
    // let event1 = { key: 0, event: eventMock };
    // let event2 = { key: 1, event: eventMock };
    // let event3 = { key: 2, event: eventMock };

    /** @todo */
    describe('componentDidMount', () => {
      it('calls RRWA.processEvent on every item in RRWA.props.events, if RRWA.props.events is not empty', () => {});
      it('calls RRWA.props.clearQ if RRWA.props.events is not empty', () => {});
    });

    /** @todo */
    describe('shouldComponentUpdate', () => {
      it('will return `true` if RRWA.props.events is not empty', () => {
      });
    });

    /** @todo */
    describe('componentDidUpdate', () => {
      it('calls RRWA.processEvent on every item in RRWA.props.events, if RRWA.props.events is not empty', () => {});
      it('calls RRWA.props.clearQ if RRWA.props.events is not empty', () => {});
    });

    /** @todo */
    describe('componentWillUnmount', () => {
      it('calls RRWA.audioContext.close', () => {});
    });
  });

  describe('*** Instance Methods ***', () => {
    let _audioCtx_, _instance_;

    beforeEach(() => {
      // wrapper = mount(<RRWA />);
      // _instance_ = wrapper.instance();
      // _audioCtx_ = _instance_.audioContext;
    });

    afterEach(() => {
      // wrapper.unmount();
    });

    it('should render without error', () => {
      // expect( wrapper ).toBeTruthy();
    });

    it('should be an instance of RRWA-component', () => {
      // expect( _instance_ ).toBeInstanceOf(RRWA);
    });

    it('shouldn\'t render anything', () => {
      // expect(wrapper.instance().render()).toBeNull();
    });

    describe('RRWA.getCurrTime', () => {
      it('should return the currentTime of the audioContext instance', () => {
        // expect( _audioCtx_.currentTime ).toEqual( 0 );
        // expect( _instance_.getCurrTime() ).toEqual( 0 );
        // _audioCtx_.processTo(500);
        // return delay(510).then(() => {
        //   expect( _audioCtx_.currentTime ).toBeLessThan(500.01);
        //   expect( _audioCtx_.currentTime ).toBeGreaterThanOrEqual(500);
        // });
      });
    });

    describe('RRWA.processEvent', () => {
      it('should call the function passed as args[0].event', () => {
        // let audioEvent = jest.fn();
        // _instance_.processEvent({ event: audioEvent });
        // expect( audioEvent.mock.calls.length ).toBe(1);
      });
    });
  });

  describe('*** Redux Connection ***', () => {

    describe('mapStateToProps', () => {
      let mockState = { webAudioReducer: { events: [] } };

      it('returns an object containing the values of the webAudioReducer', () => {
        expect(mapState(mockState)).toEqual(mockState.webAudioReducer);
        expect(mapState(mockState)).toMatchObject(mockState.webAudioReducer);
      });

      it('returns a new object', () => {
        expect(mapState(mockState)).toEqual(mockState.webAudioReducer);
        expect(mapState(mockState)).not.toBe(mockState.webAudioReducer);
      });
    });

    describe('mapDispatchToProps', () => {

      it('returns an object containing a key: `clearQ`', () => {
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
