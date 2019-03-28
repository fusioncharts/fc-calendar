import Mapper from './mapper.js';
import isAllDefined from './is-all-defined.js';

let lastHoveredInfo = {
    elementInfo: []
  },
  safePointerEventMapping = {
    mouseover: 'pointerover',
    mousedown: 'pointerdown',
    mousemove: 'pointermove',
    mouseup: 'pointerup',
    mouseout: 'pointerout'
  },
  safeMouseEventMapping = {
    mouseover: 'touchstart',
    mousedown: 'touchstart',
    mouseup: 'touchend',
    mousemove: 'touchmove',
    mouseout: 'touchend' // to handle mouseout event
  },
  navigator = window.navigator,
  supportsTouch = 'ontouchstart' in document ||
  navigator.maxTouchPoints || navigator.msMaxTouchPoints,
  supportsPointer = 'onpointerover' in document,
  fcClick = function (dom, handler, context = dom) {
    var eventType,
      fn,
      x1,
      y1,
      content;

    // Helper functions of click attached only once
    if (!dom._clickHandlerHelper) {
      let downFn = function (e) {
          dom._lastEventTriggered = 'mousedown';
        // Storing the mouse down coordinates
          x1 = e.clientX !== undefined ? e.clientX : (e.changedTouches &&
          e.changedTouches[0].clientX);
          y1 = (e.clientY !== undefined ? e.clientY : (e.changedTouches &&
          e.changedTouches[0].clientY));
        },
        moveFn = function (e) {
          let x2 = e.clientX !== undefined ? e.clientX : (e.changedTouches &&
            e.changedTouches[0].clientX),
            y2 = (e.clientY !== undefined ? e.clientY : (e.changedTouches &&
            e.changedTouches[0].clientY));
        // maintaning a minimum pixel gap of 2.5 to trigger mousemove
          if (Math.abs(x1 - x2) >= 2.5 || Math.abs(y1 - y2) >= 2.5) {
            dom._lastEventTriggered = undefined;
          }
        };
      // For devices that does not support pointer
      if (!supportsPointer && supportsTouch) {
        content = {
          touchstart: function () {
            dom._lastEventTriggered = 'touchstart';
            dom._lastEventTriggeredAt = new Date().getTime();
          },
          touchmove: moveFn
        };
      } else if (supportsPointer && supportsTouch) { // For touch device supporting pointers
        content = {
          pointerdown: downFn,
          pointermove: moveFn
        };
      } else {
        content = {
          mousedown: downFn,
          mousemove: moveFn
        };
      }
      for (eventType in content) {
        if (dom.addEventListener) {
          dom.addEventListener(eventType, content[eventType]);
        } else {
          dom.attachEvent('on' + eventType, content[eventType]);
        }
      }

      dom._clickHandlerHelper = content;
      dom._clickEventCount = 0;
    }

    ++dom._clickEventCount;

    // Creating the actual handler
    if (!supportsPointer && supportsTouch) {
      eventType = 'touchend';
      fn = function (e) {
        // Restricting click to be called after touchmove followed by touchstart
        // Restricting click to be triggered after long tap
        if (dom._lastEventTriggered === 'touchstart' &&
          new Date().getTime() - dom._lastEventTriggeredAt <= 500) {
          setTimeout(function () {
            handler.call(context, e);
          }, 0);
        }
      };
    } else {
      eventType = 'click';
      fn = function (e) {
        // Restricting click to be called after mousemove followed by mousedown
        dom._lastEventTriggered === 'mousedown' &&
          handler.call(context, e);
      };
    }

    return {
      [eventType]: fn
    };
  },
  fcunclick = function (dom) {
    var eventType,
      clickHandlerHelper = dom._clickHandlerHelper;

        // When all click listeners are removed
    if (!--dom._clickEventCount) {
      for (eventType in clickHandlerHelper) {
        if (dom.removeEventListener) {
          dom.removeEventListener(eventType, clickHandlerHelper[eventType]);
        } else {
          dom.detachEvent('on' + eventType, clickHandlerHelper[eventType]);
        }
      }
      dom._clickHandlerHelper = undefined;
    }
  },
  getDerivedInfo = function (dom, type, callback, context = dom) {
    switch (type) {
      case 'fc-click':
        return fcClick(dom, callback);
    }
    var actualtype,
                // an event is termed as safe if it is preceeded by fc
      isSafe = type.match(/fc-/),
      fn = callback;
         // Setting the original event on which operations has to be done
    isSafe && (type = type.replace(/fc-/, ''));

         /**
          * Here we are implementing safe mouse events. All browsers for which pointer events are supported, we are using
          * pointer events for touch. For rest (non-hybrid ios device) we are using touch events.
          */
    if (isSafe) {
      if (supportsTouch) {
        actualtype = type;
        type = (supportsPointer ? safePointerEventMapping[type] : safeMouseEventMapping[type]) ||
                     type;

                 // Mouse out event's handler is fired when the next element on the page is hovered.
        if (actualtype === 'mouseout') {
          fn = function (e) {
                         // No action done if multi touch triggered in touch device supporting pointer
            if (!(supportsPointer && supportsTouch && !e.isPrimary)) {
              lastHoveredInfo.elementInfo.push({
                el: context,
                callback
              });
              lastHoveredInfo.srcElement = e.srcElement || e.target;
            }
          };
          type = supportsPointer ? 'pointerover' : 'touchstart';
        }
      }
    }

    if (fn === callback) {
      fn = function (e) {
          // No action done if multi touch triggered in touch device supporting pointer
        !(supportsPointer && supportsTouch && !e.isPrimary) && callback.call(context, e);
      };
    }

    return {
      [type]: fn
    };
  },
  removeHelperHandlers = function (dom, type) {
    switch (type) {
      case 'fc-click':
        return fcunclick(dom);
    }
  };

  /** External function to fire mouseOut for various elements for touch supported devices
         * TouchStart/Pointer Over event is attached in the capturing phase on the document so that
         * when ever any dom is tapped, this callback gets executed 1st and mouseout of the last event is
         * fired.
        */
if (supportsTouch) {
  document.addEventListener(supportsPointer ? 'pointerover' : 'touchstart', function (e) {
    if (lastHoveredInfo.srcElement && lastHoveredInfo.srcElement !== (e.srcElement ||
                e.target)) {
      var elementInfo = lastHoveredInfo.elementInfo,
        ii = elementInfo.length,
        elems,
        i;
      for (i = 0; i < ii; i++) {
        elems = elementInfo[i];
        elems.callback.call(elems.el, e);
      }
    }
    lastHoveredInfo = {
      elementInfo: []
    };
  }, true);
}

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
          if (dom.addEventListener) {
            dom.addEventListener(key, derivedInfo[key]);
          } else {
            dom.attachEvent('on' + key, derivedInfo[key]);
          }
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
        removeHelperHandlers(dom, type);
        for (key in derivedInfo) {
          if (dom.removeEventListener) {
            dom.removeEventListener(key, derivedInfo[key]);
          } else {
            dom.detachEvent('on' + key, derivedInfo[key]);
          }
        }
        mapper.clear(keyset);
        return true;
      }
    }
    return false;
  }
}

export default FusionEvenetHandler;
