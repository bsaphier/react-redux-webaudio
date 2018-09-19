import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RRWA, mapState, mapDispatch } from '../react/RRWA-component';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


describe('RRWA component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('* Lifecycle Methods *', () => {
    const event1 = jest.fn();
    const event2 = jest.fn();
    const event3 = jest.fn();
    const eventObject1 = { key: 0, event: event1 };
    const eventObject2 = { key: 1, event: event2 };
    const eventObject3 = { key: 2, event: event3 };
    const mockEvents = [ eventObject1, eventObject2, eventObject3 ];

    describe('componentDidMount', () => {

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('calls RRWA.processEvent on every item in RRWA.props.events if RRWA.props.events is not empty', () => {
        const componentDidMountSpy = jest.spyOn(RRWA.prototype, 'componentDidMount');
        
        // test with empty events array
        let wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />);
        let instance = wrapper.getInstance();
        expect(instance.props.events.length).toBeFalsy();
        let processEventSpy = jest.spyOn(instance, 'processEvent');
        componentDidMountSpy.mockClear();
        instance.componentDidMount();
        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(processEventSpy).not.toHaveBeenCalled();
        wrapper.unmount();
        
        // test with events in the events array
        wrapper = TestRenderer.create(<RRWA clearQ={() => { }} events={mockEvents} />);
        instance = wrapper.getInstance();
        expect(instance.props.events.length).not.toBeFalsy();
        processEventSpy = jest.spyOn(instance, 'processEvent');
        componentDidMountSpy.mockClear();
        instance.componentDidMount();
        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(processEventSpy).toHaveBeenCalledTimes(instance.props.events.length);
        wrapper.unmount();
      });

      it('calls RRWA.props.clearQ if RRWA.props.events is not empty', () => {
        const componentDidMountSpy = jest.spyOn(RRWA.prototype, 'componentDidMount');
        const clearQMock = jest.fn();
        let wrapper = TestRenderer.create(<RRWA clearQ={clearQMock} events={[]} />);
        let instance = wrapper.getInstance();

        // test with empty events array
        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(instance.props.events.length).toBeFalsy();
        expect(clearQMock).not.toHaveBeenCalled();
        wrapper.unmount();
        
        // test with events in the events array
        wrapper = TestRenderer.create(<RRWA clearQ={clearQMock} events={mockEvents} />);
        expect(componentDidMountSpy).toHaveBeenCalledTimes(2);
        expect(clearQMock).toHaveBeenCalledTimes(1);
        wrapper.unmount();
      });
    });

    describe('shouldComponentUpdate', () => {
      let wrapper, instance;

      beforeEach(() => {
        // wrapper = TestRenderer.create(<RRWA events={[]} />);
        // instance = wrapper.getInstance();
      });

      afterEach(() => {
        // wrapper.unmount();
        jest.clearAllMocks();
      });

      it('will return `true` if RRWA.props.events is not empty', () => {
        // expect(instance.shouldComponentUpdate({ events: [] })).toBe(false);
        // expect(instance.shouldComponentUpdate({ events: mockEvents })).toBe(true);
      });
    });

    /** @todo */
    describe('componentDidUpdate', () => {
      let wrapper;

      afterEach(() => {
        // wrapper.unmount();
        jest.clearAllMocks();
      });

      it('calls RRWA.processEvent on every item in RRWA.props.events, if RRWA.props.events is not empty', () => {});
      it('calls RRWA.props.clearQ if RRWA.props.events is not empty', () => {});
    });

    /** @todo */
    describe('componentWillUnmount', () => {
      let wrapper;

      afterEach(() => {
        // wrapper.unmount();
        jest.clearAllMocks();
      });

      it('calls RRWA.audioContext.close', () => {});
    });
  });

  describe('* Instance Methods *', () => {
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

  describe('* Redux Connection *', () => {

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
