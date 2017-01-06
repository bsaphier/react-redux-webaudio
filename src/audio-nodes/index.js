'use strict';
import inputNodes from './input-nodes';
import outputNodes from './output-nodes';
import processorNodes from './processor-nodes';

const audioNodes = {
  ...inputNodes,
  ...outputNodes,
  ...processorNodes
};

export default audioNodes;
