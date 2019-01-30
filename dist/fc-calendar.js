(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!./fc-calendar.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./fc-calendar.css");
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
exports.push([module.i, ".fc-cal-date-li {\n  box-sizing: border-box!important;\n  float: left!important;\n  list-style-type: none!important;\n  width: 14.28571%!important;\n  height: auto!important;\n  padding: 2px 0 2px !important;\n  margin: 0 !important;\n  background-color: #fff !important;\n}\n.fc-cal-nav-inactive {\n  opacity: 0;\n  cursor: default !important;\n}\n.fc-cal-weekend-default {\n  background-color: #F7F6FF!important;\n}\n.fc-cal-date-normal-default{\n  cursor: pointer!important;\n}\n.fc-cal-date-normal-default:hover {\n  color: #5F5F5F!important;\n  background-color: #dcdcdc!important;\n}\n.fc-cal-date-selected-default,\n.fc-cal-date-selected-default:hover {\n  background-color: #5648D4!important;\n  color: #F3F3F3!important;\n}\n\n.fc-cal-date-disabled-default {\n  color: #cacaca!important;\n}\n", ""]);

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
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
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

let idNo = 0;
const UNDEFINED = undefined,
  // basic calendar configaration
  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  defaultClassNames = {
    container: 'fc-cal-container',
    header: 'fc-cal-header',
    month: 'fc-cal-month-header',
    year: 'fc-cal-year-header',
    monthname: 'fc-cal-month',
    yearname: 'fc-cal-year',
    nav: 'fc-cal-nav',
    navprev: 'fc-cal-nav-prev',
    navnext: 'fc-cal-nav-next',
    navinactive: 'fc-cal-nav-inactive',
    navmonth: 'fc-cal-nav-month',
    navyear: 'fc-cal-nav-year',
    subheader: 'fc-cal-sub-header',
    days: 'fc-cal-day',
    indexeddays: 'fc-cal-day-', // Index will be added at the end
    body: 'fc-cal-body',
    date: 'fc-cal-date',
    dateLI: 'fc-cal-date-li',
    selecteddatedefault: 'fc-cal-date-selected-default',
    disableddatedefault: 'fc-cal-date-disabled-default',
    normaldatedefault: 'fc-cal-date-normal-default',
    highlighteddatedefault: 'fc-cal-date-highlight-default',
    selecteddate: 'fc-cal-date-selected',
    normaldate: 'fc-cal-date-normal',
    disableddate: 'fc-cal-date-disabled',
    highlighteddate: 'fc-cal-date-highlight',
    daycol: 'fc-cal-day-col',
    weekenddefault: 'fc-cal-weekend-default',
    weekend: 'fc-cal-weekend'
  },
  inlineStyle = {
    container: 'box-sizing: border-box !important; -webkit-touch-callout: none !important; -webkit-user-select: none !important; -khtml-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; text-align: center !important; vertical-align: top !important; padding-bottom: 0 !important; margin: 0px 0px 0px 0px !important; float: left;' +
      'font-family: Source sans pro, sans-seriff !important; font-size: 11px !important; max-width: 163px !important; background-color: #fff !important; border: 1px solid #a5a4a4;',
    header: 'box-sizing: border-box !important; overflow: hidden !important; height: 26px !important; line-height: 2.4 !important' +
      'font-size: 12px !important; background-color: #5648D4 !important;',
    month: 'display: block !important; width: 100% !important; float: left !important; height: 100% !important;' +
      'font-weight: bold !important; color: #F3F3F3 !important; font-size: 13px !important;',
    year: 'display: block !important; width: 35% !important; float: right !important;',
    monthname: 'display: inline-block !important; padding: 4px !important;',
    yearname: 'display: inline-block !important; padding-right: 5px !important; padding-left: 5px !important;',
    nav: 'display: inline-block !important; cursor: pointer !important; padding: 4px;',
    navprev: 'float: left !important; padding-left: 8px !important;',
    navnext: 'float: right !important; padding-right: 8px !important;',
    navinactive: 'cursor: default !important;',
    navmonth: '',
    navyear: '',
    subheader: 'text-transform: uppercase !important; overflow: hidden !important; color: #666 !important;',
    days: 'box-sizing: border-box !important; display: block !important; float: left !important; width: 14.28571% !important; line-height: 2.3 !important;',
    indexeddays: '',
    body: 'width: 100% !important;',
    date: 'box-sizing: border-box !important; text-align: center !important; display: block !important; margin: 0 auto !important;' +
      'border: 0px solid transparent !important; width: 14.2857% !important; padding: 0px !important;',
    dateLI: 'box-sizing: border-box !important; float: left !important; list-style-type: none !important; width: 14.28571% !important; height: auto!important;',
    selecteddate: '',
    disableddate: '',
    normaldate: 'cursor: pointer !important;',
    highlightedDate: '',
    daycol: '',
    weekenddefault: 'background-color: #F7F6FF!important;',
    weekend: ''
  },
  ulPadZeroStyle = {
    padding: '0',
    margin: 0
  },
  minHeight = 300,
  minWidth = 300,
  PX = 'px',
  SP = ' ',
  BLANK = '',
  SPACE = '&nbsp;',
  DASH = '-',
  SLASH = '/',
  vAlignMultiplier = {
    top: 0,
    middle: -0.5,
    bottom: -1
  },
  hAlignMultiplier = {
    left: 0,
    center: -0.5,
    right: -1
  },
  // get id for container
  getuid = () => `fc_calendar-${idNo++}`,
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
  removeClassName = (className, element) => {
    let classNameList = element && element.className;
    if (classNameList && className) {
      element.className = classNameList.replace(new RegExp('(?:^|\\s*)' + className.trim() + '(?:\\s*|$)'), ' ');
    }
  },
  removeClassInChilds = (parent, className) => {
    let children, i, j, l, classArr;
    if (parent && parent.getElementsByClassName) {
      classArr = className.trim().split(SP);
      for (j = 0, l = classArr.length; j < l; j += 1) {
        className = classArr[j];
        children = parent.getElementsByClassName(className);
        for (i = children.length - 1; i >= 0; i--) {
          removeClassName(className, children[i]);
        }
      }
    }
  },
  // this function will update the calendar
  // without re-drawing the elements
  displayMonth = calendar => {
    const {info, graphic, classNames} = calendar,
      {active, rangeStart, rangeEnd, weekStartingDay, highlight, highlightClasses, showInactiveMonths} = info,
      {monthStr, yearStr, dateElements, dateLiElements, container, prevMonth, prevMonthPointer, nextMonth, nextMonthPointer, prevYear, nextYear} = graphic,
      {month, year} = active,
      highlightMonth = highlight && highlight[year] && highlight[year][month],
      startingOfMonth = new Date(`${month}/1/${year}`),
      monthStaringDay = startingOfMonth.getDay(),
      monthStaringWeekDay = info.startingPos = (monthStaringDay - weekStartingDay) + (weekStartingDay <= monthStaringDay ? 0 : 7),
      totalDays = daysInMonth[month - 1] + (checkLeapYear(year) && month === 2 ? 1 : 0),
      limit = totalDays + monthStaringWeekDay,
      startActive = validateActiveStart({day: 1, month, year}, rangeStart),
      endActive = validateActiveEnd({day: totalDays, month, year}, rangeEnd),
      startInactiveLimit = startActive ? 0 : (rangeStart.month === month && rangeStart.year === year ? rangeStart.day - 1 : totalDays),
      endInactiveLimit = endActive ? totalDays + 1 : (rangeEnd.month === month && rangeEnd.year === year ? rangeEnd.day + 1 : 1);
    let i, j, l,
      cur,
      highlightInfo,
      highLightClass,
      dateList,
      weekenddefault,
      weekend,
      element,
      disablePrevMonthLi = rangeStart && rangeStart.year === active.year && rangeStart.month === active.month,
      disableNextMonthLi = rangeEnd && rangeEnd.year === active.year && rangeEnd.month === active.month;

    info.curMonthInfo = {
      start: monthStaringDay,
      end: limit
    };
    dateList = graphic.calendarBody.children[0];
    // remove previously applied Classes
    removeClassInChilds(container, classNames.normaldatedefault);
    removeClassInChilds(container, classNames.selecteddatedefault);
    removeClassInChilds(container, classNames.disableddatedefault);
    removeClassInChilds(container, classNames.normaldate);
    removeClassInChilds(container, classNames.selecteddate);
    removeClassInChilds(container, classNames.disableddate);
    removeClassInChilds(container, classNames.navinactive);

    // make navigators inactive
    if (disableNextMonthLi) {
      nextMonthPointer.className += SP + classNames.navinactive;
    } else {
      removeClassName(classNames.navinactive, nextMonth);
    }

    if (disablePrevMonthLi) {
      prevMonthPointer.className += SP + classNames.navinactive;
    } else {
      removeClassName(classNames.navinactive, prevMonth);
    }

    // remobve all highlight classes
    while (highlightClasses.length) {
      highLightClass = highlightClasses.pop();
      removeClassInChilds(container, highLightClass);
    }

    // If not enough list items are present, create them
    if (dateList.childElementCount < 42) {
      while (dateList.childElementCount < 42) {
        i = dateList.childElementCount;
        weekenddefault = SP + (i % 7 === 5 || i % 7 === 6 ? classNames.weekenddefault : BLANK);
        weekend = SP + (i % 7 === 5 || i % 7 === 6 ? classNames.weekend : BLANK);

        // create date elements
        element = createElement('li', {
          appendTo: dateList,
          className: weekenddefault,
          events: {
            click: () => {
              const {info, events} = calendar,
                selectedDate = info.selectedDate,
                active = info.active,
                tempDate = {
                  day: i - info.startingPos + 1,
                  month: active.month,
                  year: active.year
                };
              if (tempDate.day >= 1 &&
                tempDate.day <= (info.curMonthInfo.end - info.startingPos) &&
                validateActiveStart(tempDate, info.rangeStart) && validateActiveEnd(tempDate, info.rangeEnd)) {
                selectedDate.day = tempDate.day;
                selectedDate.month = tempDate.month;
                selectedDate.year = tempDate.year;
                setSelectedDate(calendar);
                events.onDateChange && events.onDateChange(selectedDate);
              }
            }
          }
        });
        dateLiElements.push(element);
        element = createElement('span', {
          appendTo: element,
          className: classNames.date + SP + classNames.daycol + DASH + (i % 7) + weekend,
          innerHTML: SPACE
        });
        dateElements.push(element);
      }
    }

    // month and year changed
    monthStr.innerHTML = info.monthLabel[month - 1] + SP + year;
    // print dates
    for (i = 0, l = dateElements.length; i < l; i++) {
      if (i < monthStaringWeekDay) {
        // show days of previous month
        dateElements[i].innerHTML = new Date(year, month - 1, i - monthStaringWeekDay + 1).getDate();
        dateLiElements[i].className += SP + classNames.disableddatedefault;
        dateElements[i].className += SP + classNames.disableddate;
        dateLiElements[i].eventAttached && dateLiElements[i].removeEventListener('click', dateElements[i]._clickHandler);
        dateLiElements[i].eventAttached = false;
      } else if (i >= limit) {
        // show days of next month
        cur = new Date(year, month - 1, i - monthStaringWeekDay + 1).getDate();
        dateElements[i].innerHTML = (cur < 10 ? '0' + cur : cur);
        dateLiElements[i].className += SP + classNames.disableddatedefault;
        dateElements[i].className += SP + classNames.disableddate;
        dateLiElements[i].eventAttached && dateLiElements[i].removeEventListener('click', dateElements[i]._clickHandler);
        dateLiElements[i].eventAttached = false;
      } else {
        j = i - monthStaringWeekDay + 1;
        dateElements[i].innerHTML = (j < 10 ? '0' + j : j);
        highlightInfo = highlightMonth && highlightMonth[j];
        if (highlightInfo) {
          highLightClass = SP + classNames.highlightedDate;
          highlightInfo !== true && (highLightClass += SP + highlightInfo);
          highlightClasses.push(highLightClass);
        }
        !dateLiElements[i].eventAttached && dateLiElements[i].addEventListener('click', dateLiElements[i]._clickHandler);
        dateLiElements[i].eventAttached = true;
        dateElements[i].className += SP + (j <= startInactiveLimit || j >= endInactiveLimit ? classNames.disableddate : classNames.normaldate) + (highlightInfo ? (highLightClass) : BLANK);
        dateLiElements[i].className += SP + (j <= startInactiveLimit || j >= endInactiveLimit ? classNames.disableddatedefault : classNames.normaldatedefault) + (highlightInfo ? (highLightClass) : BLANK);
      }
    }

    // if the selected date is on this month, heighlight it
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
    const {classNames} = calendar,
      {selectedDate, active, startingPos} = calendar.info,
      {container, dateLiElements, dateElements} = calendar.graphic;
    // if the selected date is on this month, heighlight it
    if (selectedDate.month === active.month && selectedDate.year === active.year) {
      // remove the class form the old element
      removeClassInChilds(container, classNames.selecteddatedefault);
      removeClassInChilds(container, classNames.selecteddate);
      dateLiElements[(selectedDate.day + startingPos - 1)].className += SP + classNames.selecteddatedefault;
      dateElements[(selectedDate.day + startingPos - 1)].className += SP + classNames.selecteddate;
    }
  },

  // function to create dom elements
  createElement = (type, options) => {
    const {appendTo, className, inline, id, innerHTML, events} = options,
      element = document.createElement(type);
    // set the class
    className && (element.className = className);
    // set inline style of the element
    inline && element.setAttribute('style', inline);
    // set the attributes
    id && (element.id = id);
    // add the innerHTML
    innerHTML && (element.innerHTML = innerHTML);
    if (events) {
      for (let event in events) {
        element.addEventListener(event, events[event]);
        if (event === 'click') {
          element['_' + event + 'Handler'] = events[event];
          element.eventAttached = true;
        }
      }
    }
    // append to it's parent
    appendTo && appendTo.appendChild(element);
    return element;
  },

  // initailise calendar for the first time
  init = (calendar, config) => {
    const graphic = calendar.graphic,
      weekLabel = calendar.info.weekLabel,
      {dateElements, dayElements, dateLiElements} = graphic,

      classNames = calendar.classNames = Object.assign({}, defaultClassNames, calendar._customCssClass),
      // create the cntainer
      container = graphic.container = createElement('div', {
        appendTo: graphic.parentElement,
        inline: inlineStyle.container,
        className: classNames.container,
        id: calendar.id
      }),

      // create the header div
      calendarHeader = graphic.calendarHeader = createElement('div', {
        appendTo: container,
        inline: inlineStyle.header
        // className: classNames.header
      }),

      // Create the header UL
      headerUl = graphic.headerUl = createElement('ul', {
        appendTo: calendarHeader,
        className: classNames.header,
        inline: 'height: 100% !important;'
      }),

      // create the LI for month -header
      headerMonthLi = graphic.headerMonthLi = createElement('li', {
        appendTo: headerUl,
        inline: inlineStyle.month
      }),

      // Create the UL for month
      headerMonthUl = graphic.headerMonthUl = createElement('ul', {
        appendTo: headerMonthLi,
        className: classNames.month,
        inline: 'height: 100% !important;'
      }),

      calendarSubHeader = graphic.calendarSubHeader = createElement('div', {
        appendTo: container,
        // className: classNames.subHeader,
        inline: inlineStyle.subheader
      }),

      weekDays = graphic.weekDays = createElement('ul', {
        appendTo: calendarSubHeader,
        className: classNames.subheader
      }),

      calendarBody = graphic.calendarBody = createElement('div', {
        appendTo: container,
        inline: inlineStyle.body
      }),

      days = graphic.days = graphic.dayCell = createElement('ul', {
        appendTo: calendarBody,
        inline: 'padding: 1px !important; margin: 0px !important;',
        className: classNames.body
      });

    let element,
      i,
      weekend,
      weekenddefault;

    // set the container style
    setStyle(container, calendar.style);
    // set the UL styles
    setStyle(headerUl, ulPadZeroStyle);
    setStyle(weekDays, ulPadZeroStyle);
    setStyle(days, ulPadZeroStyle);
    setStyle(headerMonthUl, ulPadZeroStyle);

    // li for previous month pointer
    graphic.prevMonth = createElement('li', {
      appendTo: headerMonthUl,
      inline: inlineStyle.nav + SP + inlineStyle.navprev + SP,
      events: {
        click () {
          let info = calendar.info,
            graphic = calendar.graphic,
            nextMonth = (info.active && info.active.month) - 1,
            year = info.active && info.active.year,
            rangeStart = info.rangeStart;

          if (nextMonth < 1) {
            nextMonth = 12;
            year--;
          }

          if (!rangeStart || year > rangeStart.year) {
            removeClassName(classNames.navinactive, graphic.prevMonth);
            removeClassName(classNames.navinactive, graphic.nextMonth);
            calendar.configure({
              active: {
                month: nextMonth,
                year: year
              }
            });
          } else if ((year === rangeStart.year && nextMonth >= rangeStart.month)) {
            removeClassName(classNames.navinactive, graphic.nextMonth);
            (nextMonth === rangeStart.month) && (graphic.prevMonth.className += SP + classNames.navinactive);
            calendar.configure({
              active: {
                month: nextMonth,
                year: year
              }
            });
          }
        }
      }
    });
    // span containing the left arrow
    graphic.prevMonthPointer = createElement('span', {
      appendTo: graphic.prevMonth,
      className: classNames.navprev,
      innerHTML: '&#10094;'
    });

    // li for month name
    graphic.monthStrLi = createElement('li', {
      appendTo: headerMonthUl,
      inline: inlineStyle.monthname
    });
    // span containing the month name
    graphic.monthStr = createElement('span', {
      appendTo: graphic.monthStrLi,
      className: classNames.monthname
    });

    // li for next month pointer
    graphic.nextMonth = createElement('li', {
      appendTo: headerMonthUl,
      inline: inlineStyle.nav + SP + inlineStyle.navnext + SP,
      events: {
        click () {
          let info = calendar.info,
            graphic = calendar.graphic,
            nextMonth = (info.active && info.active.month) + 1,
            year = info.active && info.active.year,
            rangeEnd = info.rangeEnd;

          if (nextMonth > 12) {
            nextMonth = 1;
            year++;
          }

          if (!rangeEnd || year < rangeEnd.year) {
            removeClassName(classNames.navinactive, graphic.prevMonth);
            removeClassName(classNames.navinactive, graphic.nextMonth);
            calendar.configure({
              active: {
                month: nextMonth,
                year: year
              }
            });
          } else if ((year === rangeEnd.year && nextMonth <= rangeEnd.month)) {
            (nextMonth === rangeEnd.month) && (graphic.nextMonth.className += SP + classNames.navinactive);
            removeClassName(classNames.navinactive, graphic.prevMonth);
            calendar.configure({
              active: {
                month: nextMonth,
                year: year
              }
            });
          }
        }
      }
    });
    // span containing the right arrow
    graphic.nextMonthPointer = createElement('span', {
      appendTo: graphic.nextMonth,
      className: classNames.navnext,
      innerHTML: '&#10095;'
    });

    // Create the days of week list items
    for (i = 1; i < 8; i++) {
      weekend = SP + (i > 5 ? classNames.weekend : BLANK);
      weekenddefault = SP + (i > 5 ? classNames.weekenddefault : BLANK);
      // create week elements
      element = createElement('li', {
        appendTo: weekDays,
        inline: inlineStyle.days,
        className: weekenddefault
      });
      element = createElement('span', {
        appendTo: element,
        innerHTML: weekLabel[i % 7],
        inline: 'display: block !important;',
        className: classNames.days + SP + classNames.indexeddays + (i % 7) + weekend
      });
      dayElements.push(element);
    }

    // Create the days of month list items
    for (let i = 0; i < 42; i++) {
      weekenddefault = SP + (i % 7 === 5 || i % 7 === 6 ? classNames.weekenddefault : BLANK);
      weekend = SP + (i % 7 === 5 || i % 7 === 6 ? classNames.weekend : BLANK);
      // create date elements
      element = createElement('li', {
        appendTo: days,
        inline: inlineStyle.date,
        className: classNames.dateLI + weekenddefault
      });
      dateLiElements.push(element);
      element = createElement('span', {
        appendTo: element,
        className: classNames.date + SP + classNames.daycol + DASH + (i % 7) + weekend,
        inline: 'display: block !important; padding: 4px 0px !important;',
        innerHTML: SPACE,
        events: {
          click: () => {
            const {info, events} = calendar,
              selectedDate = info.selectedDate,
              active = info.active,
              tempDate = {
                day: i - info.startingPos + 1,
                month: active.month,
                year: active.year
              };
            if (tempDate.day >= 1 &&
              tempDate.day <= (info.curMonthInfo.end - info.startingPos) &&
              validateActiveStart(tempDate, info.rangeStart) && validateActiveEnd(tempDate, info.rangeEnd)) {
              selectedDate.day = tempDate.day;
              selectedDate.month = tempDate.month;
              selectedDate.year = tempDate.year;
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
  constructor (config = {}) {
    const calendar = this,
      today = new Date(),
      currentDate = {
        day: today.getDate(),
        month: (today.getMonth() + 1),
        year: today.getFullYear()
      };
    calendar._customCssClass = {};
    calendar.graphic = {
      parentElement: config.container || document.body,
      dateElements: [],
      dateLiElements: [],
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
    calendar.id = config.id || getuid();
    calendar.events = {};
    calendar.info = {
      selectedDate: currentDate,
      active: {
        month: currentDate.month,
        year: currentDate.year
      },
      weekLabel: [...weekLabel],
      monthLabel: [...monthLabel],
      weekStartingDay: 1,
      posX: 0,
      posY: 0,
      height: minHeight,
      width: minWidth,
      vAlignment: 'top',
      hAlignment: 'left',
      highlightClasses: []
    };
    if (config.customCssClass) {
      calendar._customCssClass = config.customCssClass;
    }
    // create the elements for first time only
    init(calendar, config);
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

    if (config.customCssClass) {
      calendar._customCssClass = config.customCssClass;
    }
    calendar.classNames = Object.assign({}, defaultClassNames, calendar._customCssClass);
    // set container
    if (config.container && (parentElement = document.getElementById(config.container))) {
      graphic.parentElement = parentElement;
      parentElement.appendChild(graphic.container);
    } else if (config.container instanceof Element) {
      graphic.parentElement = config.container;
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
    if (config.vAlignment && (temp = config.vAlignment.toLowerCase()) && (vAlignMultiplier[temp] !== UNDEFINED)) {
      info.vAlignment = temp;
      positioningChanged = true;
    }
    if (config.hAlignment && (temp = config.hAlignment.toLowerCase()) && (hAlignMultiplier[temp] !== UNDEFINED)) {
      info.hAlignment = temp;
      positioningChanged = true;
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
    if (positioningChanged) {
      style.left = (info.posX + (info.width * (hAlignMultiplier[info.hAlignment] || 0))) + PX;
      info.height = (graphic.container && graphic.container.offsetHeight) || minHeight;
      style.top = (info.posY + (info.height * (vAlignMultiplier[info.vAlignment] || 0))) + PX;
      setStyle(graphic.container, style);
    }
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

  getDimension () {
    let graphic = this.graphic;

    return {
      width: graphic.container.offsetWidth,
      height: graphic.container.offsetHeight
    };
  }
  // dispose the dom elements
  dispose () {
    let graphic = this.graphic,
      parentElement = graphic.parentElement,
      container = graphic.container;

    parentElement.removeChild(container);
  }
}
// attache to the window if availabel
// if (window) {
//   window.FusionCalendar = Calendar;
// }
/* harmony default export */ exports["default"] = Calendar;


/***/ }
/******/ ]);
});