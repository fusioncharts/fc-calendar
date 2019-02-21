import Mapper from './mapper';
import isAllDefined from './is-all-defined';

let getDerivedInfo = function (dom, type, callback) {
  return {
    [type]: callback
  };
};

class FusionEvenetHandler {
  constructor () {
    this.mapper = new Mapper();
  }
  on (dom, type, callback, options = {}) {
    let mapper = this.mapper,
      derivedInfo,
      key,
      keyset = [dom, type, callback];

    // all the paramters are necessary
    if (isAllDefined(keyset)) {
      if (!(derivedInfo = mapper.getValue(keyset))) {
        derivedInfo = getDerivedInfo(dom, type, callback);
        mapper.setValue(keyset, derivedInfo);
        for (key in derivedInfo) {
          dom.addEventListener(key, derivedInfo[key]);
        }
        return true;
      }
    }
    return false;
  }

  off (dom, type, callback) {
    let mapper = this.mapper,
      derivedInfo,
      key,
      keyset = [dom, type, callback];

    // all the paramters are necessary
    if (isAllDefined(keyset)) {
      if ((derivedInfo = mapper.getValue(keyset))) {
        for (key in derivedInfo) {
          dom.removeEventListener(key, derivedInfo[key]);
        }
        mapper.clear(keyset);
        return true;
      }
    }
    return false;
  }
}

export default FusionEvenetHandler;
