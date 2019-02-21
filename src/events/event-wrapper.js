import Mapper from './mapper';
import isAllDefined from './is-all-defined';
let getDerivedInfo = function (type, callback) {
  return {
    type,
    callback
  };
};

class EventHandler {
  constructor () {
    this.mapper = new Mapper();
  }
  on (dom, type, callback, options = {}) {
    let mapper = this.mapper,
      derivedInfo,
      key = [dom, type, callback];

    // all the paramters are necessary
    if (isAllDefined(key)) {
      if (!(derivedInfo = mapper.getValue(key))) {
        derivedInfo = getDerivedInfo(type, callback);
        mapper.setValue(key, derivedInfo);
        dom.addEventListener(derivedInfo.type, derivedInfo.callback);
        return true;
      }
    }
    return false;
  }

  off (dom, type, callback) {
    let mapper = this.mapper,
      derivedInfo,
      key = [dom, type, callback];

    // all the paramters are necessary
    if (isAllDefined(key)) {
      if ((derivedInfo = mapper.getValue(key))) {
        dom.removeEventListener(derivedInfo.type, derivedInfo.callback);
        mapper.clear(key);
        return true;
      }
    }
    return false;
  }
}

export default EventHandler;
