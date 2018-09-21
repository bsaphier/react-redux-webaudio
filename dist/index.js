"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var react=require("react"),reactRedux=require("react-redux");const QUEUE_EVENT="QUEUE_EVENT",CLEAR_EVT_QUEUE="CLEAR_EVT_QUEUE",clearEvtQueue=()=>({type:CLEAR_EVT_QUEUE}),emit=e=>({type:QUEUE_EVENT,event:e});var actionCreators=Object.freeze({clearEvtQueue:clearEvtQueue,emit:emit});const INIT_STATE={events:[]},webAudioReducer=(e=INIT_STATE,t)=>{const r={events:[...e.events]};switch(t.type){case QUEUE_EVENT:queueEvent(e,t,r);break;case CLEAR_EVT_QUEUE:r.events=[]}return r};function queueEvent(e,t,r){Array.isArray(t.event)?t.event.forEach((t,n)=>{r.events.push({key:e.events.length+n,event:t})}):r.events.push({key:e.events.length,event:t.event})}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){_defineProperty(e,t,r[t])})}return e}class RRWA extends react.Component{constructor(e){super(e),_defineProperty(this,"processEvent",({event:e})=>{e(this.audioContext,this.getCurrTime)}),_defineProperty(this,"getCurrTime",()=>this.audioContext.currentTime);const t=window.AudioContext||window.webkitAudioContext;if(!t)throw new Error("This environment does not support the web audio API.");this.audioContext=new t}componentDidMount(){this.props.events.length&&(this.props.events.forEach(this.processEvent),this.props.clearQ())}shouldComponentUpdate(e){return e.events.length>0}componentDidUpdate(){this.props.events.length&&(this.props.events.forEach(this.processEvent),this.props.clearQ())}componentWillUnmount(){this.audioContext.close()}render(){return null}}const mapState=({webAudioReducer:e})=>_objectSpread({},e),mapDispatch=e=>({clearQ:()=>e(clearEvtQueue())});var RRWAComponent=reactRedux.connect(mapState,mapDispatch)(RRWA);exports.RRWAEngine=RRWAComponent,exports.actionCreators=actionCreators,exports.webAudioReducer=webAudioReducer;
