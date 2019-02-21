import EventHandler from './event-wrapper';
import Mapper from './mapper';
import isAllDefined from './is-all-defined';

let getDerivedInfo = function (type, callback) {
  return {
    type,
    callback
  };
};

class FusionEvenetHandler {
  constructor () {
    this.mapper = new Mapper();
    this.eHandler = new EventHandler();
  }

  on (dom, type, callback, options = {}) {
    let mapper = this.mapper,
      derivedInfo,
      key = [dom, type, callback];

    // all the paramters are necessary
    if (isAllDefined(key)) {
      if (!(derivedInfo = mapper.getValue(key))) {
        derivedInfo = getDerivedInfo(type, callback);
        if (this.eHandler.on(dom, derivedInfo.type, derivedInfo.callback)) {
          mapper.setValue(key, derivedInfo);
          return true;
        }
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
        if (this.eHandler.off(dom, derivedInfo.type, derivedInfo.callback)) {
          mapper.clear(key);
          return true;
        }
      }
    }
    return false;
  }
}

export default FusionEvenetHandler;
