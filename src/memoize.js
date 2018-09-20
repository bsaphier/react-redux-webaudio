function audioEventMemoizer (func) {
  const cache = {};
  return function (audioEventObj) {
    const { event } = audioEventObj;
    /** @todo - find a better method of creating the keys */
    const key = event.toString().split(/\n| /).join('');
    if (cache[key]) {
      return cache[key];
    } else {
      return cache[key] = func.call(this, event);
    }
  };
}

export default audioEventMemoizer;
