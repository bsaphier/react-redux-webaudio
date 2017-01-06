import sourceNodes from './source-nodes';
import destinationNode from './Destination';
import effectNodes from './effect-nodes';

const audioNodes = {
  ...sourceNodes,
  destinationNode,
  ...effectNodes
};

export default audioNodes;
