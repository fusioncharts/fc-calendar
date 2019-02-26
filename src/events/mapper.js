class Mapper {
  constructor () {
    this.map = new Map();
  }
  clear (arr = []) {
    let info = this.map,
      len = arr.length;
    arr.forEach((param, i) => {
      if (info) {
        if (i === len - 1 && info['delete']) {
          info['delete'](param);
          if (!info.size) {
            arr.pop();
            this.clear(arr);
          }
        } else {
          info = info.has(param) && info.get(param);
        }
      }
    });
  }
  setValue (arr = [], value) {
    let info = this.map,
      len = arr.length;
    arr.forEach((param, i) => {
      if (info.has(param)) {
        info = info.get(param);
      } else {
        if (i === len - 1) {
          info.set(param, value);
        } else {
          let map = new Map();
          info.set(param, map);
          info = map;
        }
      }
    });
  }
  getValue (arr = []) {
    let info = this.map;

    arr.forEach(param => {
      info = info && info.get && info.get(param);
    });

    return arr.length && info;
  }
}

export default Mapper;
