import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RRWA, mapState, mapDispatch } from '../RRWA-component';

class MockAudioContext {
  constructor() {
    this.closed = false;
    this.currentTime = 0;
  }

  close() {
    this.closed = true;
  }
}


describe('RRWA component', () => {
  const event1Mock = jest.fn();
  const event2Mock = jest.fn();
  const event3Mock = jest.fn();
  const eventObject1 = { key: 0, event: event1Mock };
  const eventObject2 = { key: 1, event: event2Mock };
  const eventObject3 = { key: 2, event: event3Mock };
  const mockEvents = [eventObject1, eventObject2, eventObject3];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('* Lifecycle *', () => {
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
        wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={mockEvents} />);
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

        // test with empty events array
        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
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
      it('will return `true` if RRWA.props.events is not empty', () => {
        const wrapper = TestRenderer.create(<RRWA events={[]} />);
        const instance = wrapper.getInstance();
        expect(instance.shouldComponentUpdate({ events: [] })).toBe(false);
        expect(instance.shouldComponentUpdate({ events: mockEvents })).toBe(true);
        wrapper.unmount();
        jest.clearAllMocks();
      });
    });

    describe('componentDidUpdate', () => {

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('does not get called if the incoming RRWA.props.events is empty', () => {
        const componentDidUpdateSpy = jest.spyOn(RRWA.prototype, 'componentDidUpdate');
        let wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />);
        let instance = wrapper.getInstance();

        // test with events in the events array
        wrapper.update(<RRWA clearQ={() => {}} events={[eventObject1]} />);
        expect(instance.props.events.length).not.toBeFalsy();
        expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1);

        // test with empty events array
        wrapper.update(<RRWA clearQ={() => {}} events={[]} />);
        expect(instance.props.events.length).toBeFalsy();
        expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1); // was not called again, even though props did update
      });

      it('calls RRWA.processEvent on every item in RRWA.props.events, if RRWA.props.events is not empty', () => {
        const componentDidUpdateSpy = jest.spyOn(RRWA.prototype, 'componentDidUpdate');

        // test with empty events array
        let wrapper = TestRenderer.create(
          <RRWA clearQ={'this value doesn\'t matter because the events array is empty'} events={[]} />
        );
        let instance = wrapper.getInstance();
        let processEventSpy = jest.spyOn(instance, 'processEvent');
        wrapper.update(<RRWA clearQ={() => {}} events={[]} />);
        expect(instance.props.events.length).toBeFalsy();
        expect(componentDidUpdateSpy).not.toHaveBeenCalled();
        expect(processEventSpy).not.toHaveBeenCalled();

        // test with events in the events array
        wrapper.update(<RRWA clearQ={() => {}} events={mockEvents} />);
        expect(instance.props.events.length).toBeGreaterThan(0);
        expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1);
        expect(processEventSpy).toHaveBeenCalledTimes(instance.props.events.length);

        wrapper.unmount();
      });

      it('calls RRWA.props.clearQ if RRWA.props.events is not empty', () => {
        const componentDidUpdateSpy = jest.spyOn(RRWA.prototype, 'componentDidUpdate');
        const clearQMock = jest.fn();

        // test with empty events array
        const wrapper = TestRenderer.create(<RRWA clearQ={clearQMock} events={[]} />);
        expect(componentDidUpdateSpy).not.toHaveBeenCalled();
        expect(clearQMock).not.toHaveBeenCalled();
        
        // test with events in the events array
        wrapper.update(<RRWA clearQ={clearQMock} events={mockEvents} />);
        expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1);
        expect(clearQMock).toHaveBeenCalledTimes(1);
        
        wrapper.unmount();
      });
    });

    describe('componentWillUnmount', () => {

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('gets called when the component unmounts', () => {
        const componentWillUnmountSpy = jest.spyOn(RRWA.prototype, 'componentWillUnmount');
        const wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />);
        expect(componentWillUnmountSpy).not.toHaveBeenCalled();
        wrapper.unmount();
        expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
      });

      it('calls RRWA.audioContext.close', () => {
        const wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />);
        const instance = wrapper.getInstance();
        const audioContextCloseSpy = jest.spyOn(instance.audioContext, 'close');
        wrapper.unmount();
        expect(audioContextCloseSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('* Instance *', () => {
    const _AudioContext = window.AudioContext; // store this value so that it can be reset
    let wrapper, instance, audioContext;

    beforeEach(() => {
      wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />);
      instance = wrapper.getInstance();
      audioContext = instance.audioContext;
    });

    afterEach(() => {
      wrapper.unmount();
      jest.clearAllMocks();
      window.AudioContext = _AudioContext;
      delete window.webkitAudioContext;
    });

    it('should render without error', () => {
      expect(wrapper).toBeTruthy();
    });

    it('should be an instance of RRWA-component', () => {
      expect(instance).toBeInstanceOf(RRWA);
    });

    it('shouldn\'t render anything', () => {
      expect(instance.render()).toBeNull();
    });

    it('constructor assigns RRWA.audioContext to a new instance of window.AudioContext || window.webkitAudioContext', () => {
      window.AudioContext = MockAudioContext;
      wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />);
      instance = wrapper.getInstance();
      expect(instance.audioContext).toBeInstanceOf(MockAudioContext);

      window.AudioContext = undefined;
      window.webkitAudioContext = MockAudioContext;
      wrapper = TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />);
      instance = wrapper.getInstance();
      expect(instance.audioContext).toBeInstanceOf(MockAudioContext);
    });

    it('should throw an error if (window.AudioContext || window.webkitAudioContext) is false', () => {
      window.AudioContext = undefined;
      window.webkitAudioContext = undefined;
      expect(window.AudioContext || window.webkitAudioContext).toBeFalsy();
      expect(() => TestRenderer.create(<RRWA clearQ={() => {}} events={[]} />)).toThrow();
    });

    describe('RRWA.getCurrTime', () => {
      it('should return the currentTime of the audioContext instance', () => {
        expect(audioContext.currentTime).toEqual(0);
        expect(instance.getCurrTime()).toEqual(0);
        audioContext.processTo(500);
        expect(audioContext.currentTime).toBeCloseTo(500);
        expect(instance.getCurrTime()).toBeCloseTo(500);
      });
    });

    describe('RRWA.processEvent', () => {
      it('should call the function passed as args[0].event', () => {
        const eventMock = eventObject1.event;
        instance.processEvent(eventObject1);
        expect(eventMock.mock.calls.length).toBe(1);
      });

      it('should pass RRWA.audioContext as the first argument to the event function that this method calls', () => {
        const eventMock = eventObject1.event;
        eventMock.mockClear();
        instance.processEvent(eventObject1);
        expect(eventMock.mock.calls[0][0]).toBe(instance.audioContext);
      });

      it('should pass the return value of RRWA.getCurrTime as the second argument to the event function that this method calls', () => {
        const returnValue = 'This is a mocked return value';
        instance.getCurrTime = jest.fn().mockImplementation(() => returnValue);
        const eventMock = eventObject1.event;
        eventMock.mockClear();
        instance.processEvent(eventObject1);
        expect(instance.getCurrTime).toHaveBeenCalledTimes(1);
        expect(eventMock.mock.calls[0][1]).toBe(returnValue);
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
