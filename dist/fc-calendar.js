/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./fc-calendar.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./fc-calendar.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "ul, menu, dir {\n    list-style-type: disc;\n    -webkit-margin-before: 0;\n    -webkit-margin-after: 0;\n    -webkit-margin-start: 0;\n    -webkit-margin-end: 0;\n    -webkit-padding-start: 0;\n}\n.fc-cal-container{ /* Why need to define this explicitely */\n\tbox-sizing:border-box;\n\tfont-family: Verdana,sans-serif;\n\t-webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Chrome/Safari/Opera */\n\t-khtml-user-select: none; /* Konqueror */\n\t-moz-user-select: none; /* Firefox */\n\t-ms-user-select: none; /* Internet Explorer/Edge */\n\tuser-select: none; /* Non-prefixed version, currently\n\t                      not supported by any browser */\n  font-size:10px;\n  text-align: center;\n  vertical-align: top;\n  overflow: hidden;\n}\n\n.fc-cal-header {\n    box-sizing:border-box;\n    background: #1abc9c;\n    color: #fff;\n    padding: 5px 0;\n    font-weight: bold;\n    font-size:12px;\n}\n.fc-cal-sub-header{\n  font-size:10px;\n  font-weight: bold;\n  color: #666;\n}\n\n.fc-cal-body{\n  color: #590c0c\n}\n\n/* Header Classes */\n\n.fc-cal-month-header{\n  display: block;\n}\n\n.fc-cal-year-header{\n  display: block;\n}\n\n.fc-cal-month{\n  display: inline-block;\n  padding-right: 5px;\n  padding-left: 5px;\n}\n\n.fc-cal-year{\n  display: inline-block;\n  padding-right: 5px;\n  padding-left: 5px;\n}\n\n.fc-cal-nav{\n  display: inline-block;\n  cursor:pointer;\n  padding: 0 15px;\n}\n\n.fc-cal-nav-next {\n  float: right;\n\n}\n.fc-cal-nav-prev {\n  float: left;\n}\n\n.fc-cal-nav-inactive{\n}\n\n.fc-cal-nav-month{\n}\n\n.fc-cal-nav-year{\n}\n\n/* Sub-header Classes */\n\n.fc-cal-day{\n  box-sizing: border-box;\n  display: block;\n  float: left;\n  width: 14.28571%;\n  border: 1px solid #000;\n}\n\n\n/* Body classes */\n\n.fc-cal-body ul{\n  display: table;\n  border-collapse: collapse;\n}\n\n\n.fc-cal-date{\n  box-sizing: border-box;\n  display: table-cell;\n  border: 1px solid #000;\n  float: left;\n  list-style-type: none;\n  width: 14.28571%;\n  padding: 2px;\n  margin: 0;;\n}\n\n.fc-cal-date-selected{\n  background: #1abc9c;\n  color: white !important;\n}\n\n.fc-cal-date-disabled{\n  background: #eee;\n  color: #ff0000 !important;\n}\n.fc-cal-date-enabled{\n  cursor: pointer;\n}\n\n.fc-cal-date-enabled:hover{\n  color: #1abc9c\n}\n\n.fc-cal-date-highlight{\n  background: #00F;\n}\n\n\n.fc-cal-day-col{\n}\n", ""]);

// exports


/***/ },
/* 2 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 3 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

__webpack_require__(0);

let counter = 0;
const UNDEFINED = undefined,
  // basic calendar configaration
  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  classNames = {
    container: 'fc-cal-container',
    header: 'fc-cal-header',
    month: 'fc-cal-month-header',
    year: 'fc-cal-year-header',
    monthName: 'fc-cal-month',
    yearName: 'fc-cal-year',
    nav: 'fc-cal-nav',
    navPrev: 'fc-cal-nav-prev',
    navNext: 'fc-cal-nav-next',
    navInactive: 'fc-cal-nav-inactive',
    navMonth: 'fc-cal-nav-month',
    navYear: 'fc-cal-nav-year',
    subHeader: 'fc-cal-sub-header',
    days: 'fc-cal-day', // Index will be added at the end
    body: 'fc-cal-body',
    date: 'fc-cal-date',
    selectedDate: 'fc-cal-date-selected',
    disabledDate: 'fc-cal-date-disabled',
    enabledDate: 'fc-cal-date-enabled',
    highlightedDate: 'fc-cal-date-highlight',
    dayCol: 'fc-cal-day-col'
  },
  ulPadZeroStyle = {
    padding: '0',
    margin: 0
  },
  minHeight = 200,
  minWidth = 300,
  PX = 'px',
  SP = ' ',
  BLANK = '',
  SPACE = '&nbsp;',
  DASH = '-',
  SLASH = '/',
  vAlignMultiplier = {
    top: 0,
    middle: 0.5,
    bottom: 1
  },
  hAlignMultiplier = {
    left: 0,
    center: 0.5,
    right: 1
  },
  // get id for container
  getuid = () => `fc_calendar-${counter++}`,
  // check if the year is leap year or not
  checkLeapYear = year => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0),
  // apply custom style to the container
  setStyle = (element, style) => {
    if (style && element && element.style) {
      for (let key in style) {
        if (style.hasOwnProperty(key)) {
          element.style[key] = style[key];
        }
      }
    }
  },
  remoVeClassName = (className, element) => {
    let classNames = element && element.className;
    if (classNames) {
      element.className = classNames.replace(new RegExp('(?:^|\\s)' + className + '(?:\\s|$)'), ' ');
    }
  },
  removeClassInChilds = (parent, className) => {
    let children, i;
    if (parent && parent.getElementsByClassName) {
      children = parent.getElementsByClassName(className);
      for (i = children.length - 1; i >= 0; i--) {
        remoVeClassName(className, children[i]);
      }
    }
  },
  // this function will update the calendar
  // without re-drawing the elements
  displayMonth = calendar => {
    const {info, graphic} = calendar,
      {active, rangeStart, rangeEnd, weekStartingDay, highlight} = info,
      {monthStr, yearStr, dateElements, container} = graphic,
      {month, year} = active,
      highlightMonth = highlight && highlight[year] && highlight[year][month],
      startingOfMonth = new Date(`${month}/1/${year}`),
      monthStaringDay = startingOfMonth.getDay(),
      monthStaringWeekDay = info.startingPos = (monthStaringDay - weekStartingDay) + (weekStartingDay <= monthStaringDay ? 0 : 7),
      totalDays = daysInMonth[month - 1] + (checkLeapYear(year) && month === 2 ? 1 : 0),
      limit = totalDays + monthStaringWeekDay,
      l = dateElements.length,
      startInactiveLimit = validateActiveStart({day: 1, month, year}, rangeStart) ? 0 : (rangeStart.month === month && rangeStart.year === year ? rangeStart.day - 1 : totalDays),
      endInactiveLimit = validateActiveEnd({day: totalDays, month, year}, rangeEnd) ? totalDays + 1 : (rangeStart.month === month && rangeStart.year === year ? rangeEnd.day + 1 : 1);
    let i, j, highlightInfo;

    // remove previously applied Classes
    removeClassInChilds(container, classNames.enabledDate);
    removeClassInChilds(container, classNames.selectedDate);
    removeClassInChilds(container, classNames.disabledDate);

    // month and year changed
    monthStr.innerHTML = info.monthLabel[month - 1];
    yearStr.innerHTML = year;

    // print dates
    for (i = 0; i < l; i++) {
      if (i < monthStaringWeekDay || i >= limit) {
        dateElements[i].innerHTML = SPACE;
      } else {
        j = i - monthStaringWeekDay + 1;
        dateElements[i].innerHTML = j;
        highlightInfo = highlightMonth && highlightMonth[j];
        dateElements[i].className += SP + (j <= startInactiveLimit || j >= endInactiveLimit ? classNames.disabledDate : classNames.enabledDate) + (highlightInfo ? (SP + (highlightInfo === true ? classNames.highlightedDate : highlightInfo)) : BLANK);
      }
    }
    // // if the selected date is on this month, heighlight it
    setSelectedDate(calendar);
  },

  // this function update the day labels
  disPlayDays = calendar => {
    const info = calendar.info,
      weekStartingDay = info.weekStartingDay,
      dayElements = calendar.graphic.dayElements;
    let j;
    for (j = 0; j < 7; j++) {
      dayElements[j].innerHTML = info.weekLabel[(j + weekStartingDay) % 7];
    }
  },
  setSelectedDate = calendar => {
    const {selectedDate, active, startingPos} = calendar.info,
      {dateElements, container} = calendar.graphic;
    // if the selected date is on this month, heighlight it
    if (selectedDate.month === active.month && selectedDate.year === active.year) {
      // remove the class form the old element
      removeClassInChilds(container, classNames.selectedDate);
      dateElements[(selectedDate.day + startingPos - 1)].className += SP + classNames.selectedDate;
    }
  },

  // function to create dom elements
  createElement = (type, options) => {
    const {appendTo, className, id, innerHTML, events} = options,
      element = document.createElement(type);
    // set the class
    className && (element.className = className);
    // set the attributes
    id && (element.id = id);
    // add the innerHTML
    innerHTML && (element.innerHTML = innerHTML);
    if (events) {
      for (let event in events) {
        element.addEventListener(event, events[event]);
      }
    }
    // append to it's parent
    appendTo && appendTo.appendChild(element);
    return element;
  },

  // initailise calendar for the first time
  init = calendar => {
    const graphic = calendar.graphic,
      weekLabel = calendar.info.weekLabel,
      {dateElements, dayElements} = graphic,

      // create the cntainer
      container = graphic.container = createElement('div', {
        appendTo: graphic.parentElement,
        className: classNames.container,
        id: calendar.id
      }),

      // create the header div
      calendarHeader = graphic.calendarHeader = createElement('div', {
        appendTo: container,
        className: classNames.header
      }),

      // Create the header UL
      headerUl = graphic.headerUl = createElement('ul', {
        appendTo: calendarHeader
      }),

      // create the LI for month -header
      headerMonthLi = graphic.headerMonthLi = createElement('li', {
        appendTo: headerUl,
        className: classNames.month
      }),

      // Create the UL for month
      headerMonthUl = graphic.headerMonthUl = createElement('ul', {
        appendTo: headerMonthLi
      }),

      headerYearLi = graphic.headerYearLi = createElement('li', {
        appendTo: headerUl,
        className: classNames.year
      }),

      headerYearUl = graphic.headerYearUl = createElement('ul', {
        appendTo: headerYearLi
      }),

      calendarSubHeader = graphic.calendarSubHeader = createElement('div', {
        appendTo: container,
        className: classNames.subHeader
      }),

      weekDays = graphic.weekDays = createElement('ul', {
        appendTo: calendarSubHeader
      }),

      calendarBody = graphic.calendarBody = createElement('div', {
        appendTo: container,
        className: classNames.body
      }),

      days = graphic.days = graphic.dayCell = createElement('ul', {
        appendTo: calendarBody
      });

    let element,
      i;

    // set the container style
    setStyle(container, calendar.style);
    // set the UL styles
    setStyle(headerUl, ulPadZeroStyle);
    setStyle(weekDays, ulPadZeroStyle);
    setStyle(days, ulPadZeroStyle);
    setStyle(headerMonthUl, ulPadZeroStyle);
    setStyle(headerYearUl, ulPadZeroStyle);

    graphic.prevMon = createElement('li', {
      appendTo: headerMonthUl,
      className: classNames.nav + SP + classNames.navPrev + SP + classNames.navMonth,
      innerHTML: '&#10094;',
      events: {
        click () {
          let nextMonth = (calendar.info.active && calendar.info.active.month) - 1,
            year = calendar.info.active && calendar.info.active.year;
          if (nextMonth < 1) {
            nextMonth = 12;
            year--;
          }
          calendar.configure({
            active: {
              month: nextMonth,
              year
            }
          });
        }
      }
    });
    graphic.monthStr = createElement('li', {
      appendTo: headerMonthUl,
      className: classNames.monthName
    });
    graphic.nextMon = createElement('li', {
      appendTo: headerMonthUl,
      className: classNames.nav + SP + classNames.navNext + SP + classNames.navMonth,
      innerHTML: '&#10095;',
      events: {
        click () {
          let nextMonth = (calendar.info.active && calendar.info.active.month) + 1,
            year = calendar.info.active && calendar.info.active.year;
          if (nextMonth > 12) {
            nextMonth = 1;
            year++;
          }
          calendar.configure({
            active: {
              month: nextMonth,
              year
            }
          });
        }
      }
    });

    graphic.prevYear = createElement('li', {
      appendTo: headerYearUl,
      className: classNames.nav + SP + classNames.navPrev + SP + classNames.navYear,
      innerHTML: '&#10094;',
      events: {
        click () {
          calendar.configure({
            active: {
              year: (calendar.info.active && calendar.info.active.year) - 1,
              month: (calendar.info.active && calendar.info.active.month)
            }
          });
        }
      }
    });
    graphic.yearStr = createElement('li', {
      appendTo: headerYearUl,
      className: classNames.yearName
    });
    graphic.nextYear = createElement('li', {
      appendTo: headerYearUl,
      className: classNames.nav + SP + classNames.navNext + SP + classNames.navYear,
      innerHTML: '&#10095;',
      events: {
        click () {
          calendar.configure({
            active: {
              year: (calendar.info.active && calendar.info.active.year) + 1,
              month: (calendar.info.active && calendar.info.active.month)
            }
          });
        }
      }
    });

    for (i = 0; i < 7; i++) {
      // create week elements
      element = createElement('li', {
        appendTo: weekDays,
        innerHTML: weekLabel[i],
        className: classNames.days + SP + classNames.days + DASH + i
      });
      dayElements.push(element);
    }
    for (let i = 0; i < 42; i++) {
      // create date elements
      element = createElement('li', {
        appendTo: days,
        className: classNames.date + SP + classNames.dayCol + DASH + (i % 7),
        innerHTML: SPACE,
        events: {
          click: () => {
            const {info, events} = calendar,
              selectedDate = info.selectedDate,
              tempDate = {
                day: i - info.startingPos + 1,
                month: selectedDate.month,
                year: selectedDate.year
              };
            if (validateActiveStart(tempDate, info.rangeStart) && validateActiveEnd(tempDate, info.rangeEnd)) {
              selectedDate.day = tempDate.day;
              setSelectedDate(calendar);
              events.onDateChange && events.onDateChange(selectedDate);
            }
          }
        }
      });
      dateElements.push(element);
    }
  },

  // validate active date
  validateActiveStart = (date, start) => {
    const {day, month, year} = date;
    return !(start && (start.year > year || (start.year === year && (start.month > month || (start.month === month && start.day > day)))));
  },
  // validate active date
  validateActiveEnd = (date, end) => {
    const {day, month, year} = date;
    return !(end && (end.year < year || (end.year === year && (end.month < month || (end.month === month && end.day < day)))));
  };

// calendar constructor
class Calendar {
  constructor (config) {
    const calendar = this,
      today = new Date(),
      currentDate = {
        day: today.getDate(),
        month: (today.getMonth() + 1),
        year: today.getFullYear()
      };
    calendar.graphic = {
      parentElement: document.body,
      dateElements: [],
      dayElements: []
    };
    calendar.style = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: minWidth + PX,
      // height: minHeight + PX,
      overflow: 'hidden'
    };
    calendar.id = getuid();
    calendar.events = {};
    calendar.info = {
      selectedDate: currentDate,
      active: {
        month: currentDate.month,
        year: currentDate.year
      },
      weekLabel: [...weekLabel],
      monthLabel: [...monthLabel],
      weekStartingDay: 0,
      posX: 0,
      posY: 0,
      height: minHeight,
      width: minWidth,
      vAlignment: 'top',
      hAlignment: 'left'
    };
    // create the elements for first time only
    init(calendar);
    // configure Calendar with initial config
    calendar.configure(config, true);
  }
  // configure calendar
  configure (config, doRepaint) {
    const calendar = this,
      {graphic, events, info, style} = calendar,
      // displayDisabledMonth = info.displayDisabledMonth,
      userEvents = config && config.events;

    let parentElement,
      temp,
      positioningChanged = false;

    if (!config) {
      return;
    }

    // set container
    if (config.container && (parentElement = document.getElementById(config.container))) {
      graphic.parentElement = parentElement;
      parentElement.appendChild(graphic.container);
    }
    // set User applied styles
    if (config.style && config.style.position) {
      style.position = config.style.position;
      setStyle(graphic.container, style);
    }

    // applying visual positioning configuraions to the container
    if (!isNaN(temp = Number(config.posX))) {
      info.posX = temp;
      positioningChanged = true;
    }
    if (!isNaN(temp = Number(config.posY))) {
      info.posY = temp;
      positioningChanged = true;
    }
    // if (!isNaN(temp = Number(config.height)) && temp > minHeight) {
    //   info.height = temp;
    //   style.height = temp + PX;
    //   positioningChanged = true;
    // }
    if (!isNaN(temp = Number(config.width)) && temp > minWidth) {
      info.width = temp;
      style.width = temp + PX;
      positioningChanged = true;
    }
    if (config.vAlignment && (temp = config.vAlignment.toLowerCase()) && (hAlignMultiplier[temp] !== UNDEFINED)) {
      info.vAlignment = temp;
      positioningChanged = true;
    }
    if (config.hAlignment && (temp = config.hAlignment.toLowerCase()) && (vAlignMultiplier[temp] !== UNDEFINED)) {
      info.hAlignment = temp;
      positioningChanged = true;
    }
    if (positioningChanged) {
      style.left = (info.posX + (info.width * (hAlignMultiplier[info.hAlignment] || 0))) + PX;
      style.top = (info.posY + (info.height * (vAlignMultiplier[info.vAlignment] || 0))) + PX;
      setStyle(graphic.container, style);
    }

    // set events on date, month and year change
    if (userEvents) {
      typeof userEvents.onDateChange === 'function' && (events.onDateChange = userEvents.onDateChange);
      typeof userEvents.onYearChange === 'function' && (events.onYearChange = userEvents.onYearChange);
      typeof userEvents.onMonthChange === 'function' && (events.onMonthChange = userEvents.onMonthChange);
    }

    if (config.highlight) {
      info.highlight = config.highlight;
      doRepaint = true;
    } else if (config.highlight === null) {
      delete info.highlight;
      doRepaint = true;
    }

    // set calendar date
    if ((temp = config.selectedDate) && !isNaN(Date.parse(temp.month + SLASH + temp.day + SLASH + temp.year))) {
      info.selectedDate = config.selectedDate;
      // update the active month as well
      info.active.month = info.selectedDate.month;
      info.active.year = info.selectedDate.year;
      doRepaint = true;
    }
    if (config.showInactiveMonths !== UNDEFINED) {
      info.showInactiveMonths = !!config.showInactiveMonths;
    }

    // set active month
    if (config.active) {
      temp = {
        month: config.active.month || info.active.month,
        year: config.active.year || info.active.year
      };
      if ((info.active.month !== temp.month || info.active.year !== temp.year) && (info.showInactiveMonths || (validateActiveStart(temp, info.rangeStart) && validateActiveEnd(temp, info.rangeEnd)))) {
        info.active.month = temp.month;
        info.active.year = temp.year;
        doRepaint = true;
      }
    }
    // set month names
    if (config.monthLabel && config.monthLabel.length === 12) {
      info.monthLabel = config.monthLabel;
      doRepaint = true;
    }
    // set day names
    if (config.weekLabel && config.weekLabel.length === 7) {
      info.weekLabel = config.weekLabel;
      disPlayDays(calendar);
    }
    // set Starting day of week
    if (config.weekStart !== UNDEFINED && info.weekStartingDay !== config.weekStart) {
      info.weekStartingDay = config.weekStart;
      disPlayDays(calendar);
    }
    // Set active range start
    if (config.rangeStart && validateActiveStart(info.selectedDate, config.rangeStart)) {
      info.rangeStart = config.rangeStart;
      doRepaint = true;
    } else if (config.rangeStart === null) {
      delete info.rangeStart;
      doRepaint = true;
    }
    // Set active range end
    if (config.rangeEnd && validateActiveEnd(info.selectedDate, config.rangeEnd)) {
      info.rangeEnd = config.rangeEnd;
      doRepaint = true;
      // Check whether the old active date is valid or not
    } else if (config.rangeEnd === null) {
      delete info.rangeEnd;
      doRepaint = true;
    }
    // set calendar to the desired date
    doRepaint && displayMonth(calendar);
  }
  // call show function show calendar
  show () {
    const calendar = this,
      container = calendar.graphic.container;
    container.style.visibility = 'visible';
    container.style.opacity = '1';
  }
  // call hide function to hide calendar
  hide () {
    const calendar = this,
      container = calendar.graphic.container;
    container.style.visibility = 'hidden';
    container.style.opacity = '0';
  }
  // returns the current or selected date
  getDate () {
    return this.info.selectedDate;
  }
  // add custom funcion on click
  addEventListner (eventName, handler) {
    typeof handler === 'function' && (this.events && (this.events[eventName] = handler));
  }
  // remove custom funcion on click
  removeEventListner (eventName) {
    if (this.events && this.events[eventName]) {
      delete this.events[eventName];
    }
  }
}
// attache to the window if availabel
if (window) {
  window.FusionCalendar = Calendar;
}
/* harmony default export */ exports["default"] = Calendar;


/***/ }
/******/ ]);