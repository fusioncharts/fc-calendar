(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(3);
var entryUnbind = __webpack_require__(51);

module.exports = entryUnbind('String', 'startsWith');


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var toLength = __webpack_require__(40);
var notARegExp = __webpack_require__(46);
var requireObjectCoercible = __webpack_require__(14);
var correctIsRegExpLogic = __webpack_require__(50);

var nativeStartsWith = ''.startsWith;
var min = Math.min;

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('startsWith') }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 4 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var getOwnPropertyDescriptor = (__webpack_require__(6).f);
var hide = __webpack_require__(20);
var redefine = __webpack_require__(23);
var setGlobal = __webpack_require__(25);
var copyConstructorProperties = __webpack_require__(33);
var isForced = __webpack_require__(45);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 5 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof __webpack_require__.g == O && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var propertyIsEnumerableModule = __webpack_require__(9);
var createPropertyDescriptor = __webpack_require__(10);
var toIndexedObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(15);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(18);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 7 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(8);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 10 */
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 11 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(12);
var requireObjectCoercible = __webpack_require__(14);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 12 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(8);
var classof = __webpack_require__(13);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 13 */
/***/ (function(module) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 14 */
/***/ (function(module) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 15 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(16);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 16 */
/***/ (function(module) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 17 */
/***/ (function(module) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var fails = __webpack_require__(8);
var createElement = __webpack_require__(19);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 19 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var isObject = __webpack_require__(16);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 20 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var definePropertyModule = __webpack_require__(21);
var createPropertyDescriptor = __webpack_require__(10);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(18);
var anObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(15);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 22 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(16);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 23 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var shared = __webpack_require__(24);
var hide = __webpack_require__(20);
var has = __webpack_require__(17);
var setGlobal = __webpack_require__(25);
var nativeFunctionToString = __webpack_require__(27);
var InternalStateModule = __webpack_require__(28);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),
/* 24 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var setGlobal = __webpack_require__(25);
var IS_PURE = __webpack_require__(26);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.1.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 25 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var hide = __webpack_require__(20);

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 26 */
/***/ (function(module) {

module.exports = false;


/***/ }),
/* 27 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(24);

module.exports = shared('native-function-to-string', Function.toString);


/***/ }),
/* 28 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(29);
var global = __webpack_require__(5);
var isObject = __webpack_require__(16);
var hide = __webpack_require__(20);
var objectHas = __webpack_require__(17);
var sharedKey = __webpack_require__(30);
var hiddenKeys = __webpack_require__(32);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 29 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var nativeFunctionToString = __webpack_require__(27);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),
/* 30 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(24);
var uid = __webpack_require__(31);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 31 */
/***/ (function(module) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 32 */
/***/ (function(module) {

module.exports = {};


/***/ }),
/* 33 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(17);
var ownKeys = __webpack_require__(34);
var getOwnPropertyDescriptorModule = __webpack_require__(6);
var definePropertyModule = __webpack_require__(21);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 34 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(35);
var getOwnPropertyNamesModule = __webpack_require__(37);
var getOwnPropertySymbolsModule = __webpack_require__(44);
var anObject = __webpack_require__(22);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 35 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(36);
var global = __webpack_require__(5);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 36 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(38);
var enumBugKeys = __webpack_require__(43);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIndexedObject = __webpack_require__(11);
var indexOf = (__webpack_require__(39).indexOf);
var hiddenKeys = __webpack_require__(32);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 39 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(11);
var toLength = __webpack_require__(40);
var toAbsoluteIndex = __webpack_require__(42);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 40 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(41);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 41 */
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 42 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(41);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 43 */
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 45 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(8);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 46 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isRegExp = __webpack_require__(47);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),
/* 47 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var classof = __webpack_require__(13);
var wellKnownSymbol = __webpack_require__(48);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 48 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var shared = __webpack_require__(24);
var uid = __webpack_require__(31);
var NATIVE_SYMBOL = __webpack_require__(49);

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),
/* 49 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(8);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 50 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(48);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),
/* 51 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(5);
var bind = __webpack_require__(52);

var call = Function.call;

module.exports = function (CONSTRUCTOR, METHOD, length) {
  return bind(call, global[CONSTRUCTOR].prototype[METHOD], length);
};


/***/ }),
/* 52 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aFunction = __webpack_require__(53);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 53 */
/***/ (function(module) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 54 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(55);


/***/ }),
/* 55 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(56);
var entryUnbind = __webpack_require__(51);

module.exports = entryUnbind('String', 'endsWith');


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(4);
var toLength = __webpack_require__(40);
var notARegExp = __webpack_require__(46);
var requireObjectCoercible = __webpack_require__(14);
var correctIsRegExpLogic = __webpack_require__(50);

var nativeEndsWith = ''.endsWith;
var min = Math.min;

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('endsWith') }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 57 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(58);


/***/ }),
/* 58 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(59);
var path = __webpack_require__(36);

module.exports = path.Object.assign;


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(4);
var assign = __webpack_require__(60);

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),
/* 60 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(7);
var fails = __webpack_require__(8);
var objectKeys = __webpack_require__(61);
var getOwnPropertySymbolsModule = __webpack_require__(44);
var propertyIsEnumerableModule = __webpack_require__(9);
var toObject = __webpack_require__(62);
var IndexedObject = __webpack_require__(12);

var nativeAssign = Object.assign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !nativeAssign || fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),
/* 61 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(38);
var enumBugKeys = __webpack_require__(43);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 62 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(14);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _insert_function_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66);
/* harmony import */ var _insert_function_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_insert_function_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithAttributesAndNonce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithAttributesAndNonce_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithAttributesAndNonce_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {"attributes":{"id":"fc__calendar__style"}};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithAttributesAndNonce_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = (_insert_function_js__WEBPACK_IMPORTED_MODULE_2___default());
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ __webpack_exports__["default"] = ((_node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_fc_calendar_css__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),
/* 64 */
/***/ (function(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 65 */
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 66 */
/***/ (function(module) {

function insertAtTop(element) {
  var parent = document.querySelector('head'); // eslint-disable-next-line no-underscore-dangle

  var metaTag = document.querySelector('meta[http-equiv="Content-Security-Policy"]');

  if (metaTag) {
    var content = metaTag.getAttribute('content');

    if (content) {
      var match = content.match(/'nonce-([^']+)'/);

      if (match) {
        element.setAttribute('nonce', match[1]);
      }
    }
  }

  var lastInsertedElement = window._lastElementInsertedByStyleLoader;

  if (!lastInsertedElement) {
    parent.insertBefore(element, parent.firstChild);
  } else if (lastInsertedElement.nextSibling) {
    parent.insertBefore(element, lastInsertedElement.nextSibling);
  } else {
    parent.appendChild(element);
  } // eslint-disable-next-line no-underscore-dangle


  window._lastElementInsertedByStyleLoader = element;
}

module.exports = insertAtTop;

/***/ }),
/* 67 */
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement, attributes) {
  Object.keys(attributes).forEach(function (key) {
    styleElement.setAttribute(key, attributes[key]);
  });
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 68 */
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 69 */
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(71)(false);
// Module
exports.push([module.id, "", ""]);


/***/ }),
/* 71 */
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";
exports.__esModule=true;exports["default"]=void 0;var trustedPolicy;if(window.trustedTypes){trustedPolicy=window.trustedTypes.createPolicy("fusionChartsPolicy",{createHTML:function createHTML(input){return input}})}var _default=exports["default"]=trustedPolicy||{createHTML:function createHTML(input){return input}};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_features_string_starts_with_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_features_string_starts_with_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_features_string_starts_with_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_features_string_ends_with_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var core_js_features_string_ends_with_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_features_string_ends_with_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_features_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);
/* harmony import */ var core_js_features_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_features_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _css_fc_calendar_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63);
/* harmony import */ var _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






var idNo = 0;

var UNDEFINED = undefined,
    cssMap = new Map(),
    isObject = function isObject(x) {
  return x !== null && _typeof(x) === 'object' && !Array.isArray(x);
},
    // basic calendar configaration
daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // classes in cssStyleSheet will be applied in the gievn order
// so that styles get applied correctly
CLASS_PRECEDENCE_SEQUENCE = ['container', 'container:hover', 'header-container', 'header-container:hover', 'header', 'header:hover', 'year', 'year:hover', 'headername', 'headername:hover', 'yearname', 'yearname:hover', 'nav', 'nav:hover', 'navprev', 'navprev:hover', 'navnext', 'navnext:hover', 'navinactive', 'navinactive:hover', 'navmonth', 'navmonth:hover', 'navyear', 'navyear:hover', 'subheader', 'subheader:hover', 'body', 'body:hover', 'days', 'days:hover', 'indexeddays', 'indexeddays:hover', 'dateLI', 'dateLI:hover', 'date', 'date:hover', 'daycol', 'daycol:hover', 'normaldatedefault', 'normaldatedefault:hover', 'activedate', 'activedate:hover', 'disableddatedefault', 'disableddatedefault:hover', 'disableddate', 'disableddate:hover', 'weekenddefault', 'weekenddefault:hover', 'weekend', 'weekend:hover', 'selecteddatedefault', 'selecteddatedefault:hover', 'selecteddate', 'selecteddate:hover', 'highlighteddatedefault', 'highlighteddatedefault:hover', 'highlighteddate', 'highlighteddate:hover'],
    defaultCss = {
  dateLI: {
    'box-sizing': 'border-box!important',
    'float': 'left!important',
    'list-style-type': 'none!important',
    'width': '14.28571%!important',
    'height': 'auto!important',
    'padding': '2px 0 2px !important',
    'margin': '0 !important',
    'background-color': '#fff !important'
  },
  navinactive: {
    opacity: 0,
    cursor: 'default !important'
  },
  weekenddefault: {
    'background-color': '#F7F6FF!important'
  },
  'normaldatedefault': {
    cursor: 'pointer!important'
  },
  'normaldatedefault:hover': {
    color: '#5F5F5F!important',
    'background-color': '#dcdcdc!important'
  },
  'selecteddatedefault': {
    'background-color': '#5648D4!important',
    color: '#F3F3F3!important'
  },
  'selecteddatedefault:hover': {
    'background-color': '#5648D4!important',
    color: '#F3F3F3!important'
  },
  disableddatedefault: {
    color: '#cacaca!important'
  }
},
    defaultClassNames = {
  container: 'fc-cal-container',
  'header-container': 'fc-cal-header-container',
  header: 'fc-cal-month-header',
  year: 'fc-cal-year-header',
  headername: 'fc-cal-month',
  yearname: 'fc-cal-year',
  nav: 'fc-cal-nav',
  navprev: 'fc-cal-nav-prev',
  navnext: 'fc-cal-nav-next',
  navinactive: 'fc-cal-nav-inactive',
  navmonth: 'fc-cal-nav-month',
  navyear: 'fc-cal-nav-year',
  subheader: 'fc-cal-sub-header',
  body: 'fc-cal-body',
  days: 'fc-cal-day',
  indexeddays: 'fc-cal-day-',
  // Index will be added at the end
  dateLI: 'fc-cal-date-li',
  date: 'fc-cal-date',
  daycol: 'fc-cal-day-col',
  normaldatedefault: 'fc-cal-date-normal-default',
  activedate: 'fc-cal-date-normal',
  disableddatedefault: 'fc-cal-date-disabled-default',
  disableddate: 'fc-cal-date-disabled',
  weekenddefault: 'fc-cal-weekend-default',
  weekend: 'fc-cal-weekend',
  selecteddatedefault: 'fc-cal-date-selected-default',
  selecteddate: 'fc-cal-date-selected',
  highlighteddatedefault: 'fc-cal-date-highlight-default',
  highlighteddate: 'fc-cal-date-highlight'
},
    inlineStyle = {
  container: 'box-sizing: border-box !important; -webkit-touch-callout: none !important; -webkit-user-select: none !important; -khtml-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; text-align: center !important; vertical-align: top !important; padding-bottom: 0 !important; margin: 0px 0px 0px 0px !important; float: left;' + 'font-size: 11px !important; max-width: 163px !important; background-color: #fff !important; border: 1px solid #a5a4a4;',
  header: 'box-sizing: border-box !important; overflow: hidden !important; height: 26px !important; line-height: 2.4 !important' + 'font-size: 12px !important; background-color: #5648D4 !important;',
  month: 'display: block !important; width: 100% !important; float: left !important; height: 100% !important;' + 'font-weight: bold !important; color: #F3F3F3 !important; font-size: 13px !important;',
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
  date: 'box-sizing: border-box !important; text-align: center !important; display: block !important; margin: 0 auto !important;' + 'border: 0px solid transparent !important; width: 14.2857% !important; padding: 0px !important;',
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
getuid = function getuid() {
  return "fc_calendar-".concat(idNo++);
},
    // check if the year is leap year or not
checkLeapYear = function checkLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
},
    // apply custom style to the container
setStyle = function setStyle(element, style) {
  if (style && element && element.style) {
    for (var key in style) {
      if (style.hasOwnProperty(key)) {
        element.style[key] = style[key];
      }
    }
  }
},
    removeClassName = function removeClassName(className, element) {
  var classNameList = element && element.className;

  if (classNameList && className) {
    element.className = classNameList.replace(new RegExp('(?:^|\\s*)' + className.trim() + '(?:\\s*|$)'), ' ');
  }
},
    removeClassInChilds = function removeClassInChilds(parent, className) {
  var children, i, j, l, classArr;

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
displayMonth = function displayMonth(calendar) {
  var info = calendar.info,
      graphic = calendar.graphic,
      classNames = calendar.classNames,
      active = info.active,
      rangeStart = info.rangeStart,
      rangeEnd = info.rangeEnd,
      weekStartingDay = info.weekStartingDay,
      highlight = info.highlight,
      highlightClasses = info.highlightClasses,
      showInactiveMonths = info.showInactiveMonths,
      monthStr = graphic.monthStr,
      yearStr = graphic.yearStr,
      dateElements = graphic.dateElements,
      dateLiElements = graphic.dateLiElements,
      container = graphic.container,
      prevMonth = graphic.prevMonth,
      prevMonthPointer = graphic.prevMonthPointer,
      nextMonth = graphic.nextMonth,
      nextMonthPointer = graphic.nextMonthPointer,
      prevYear = graphic.prevYear,
      nextYear = graphic.nextYear,
      month = active.month,
      year = active.year,
      highlightMonth = highlight && highlight[year] && highlight[year][month],
      startingOfMonth = new Date("".concat(month, "/1/").concat(year)),
      monthStaringDay = startingOfMonth.getDay(),
      monthStaringWeekDay = info.startingPos = monthStaringDay - weekStartingDay + (weekStartingDay <= monthStaringDay ? 0 : 7),
      totalDays = daysInMonth[month - 1] + (checkLeapYear(year) && month === 2 ? 1 : 0),
      limit = totalDays + monthStaringWeekDay,
      startActive = validateActiveStart({
    day: 1,
    month: month,
    year: year
  }, rangeStart),
      endActive = validateActiveEnd({
    day: totalDays,
    month: month,
    year: year
  }, rangeEnd),
      startInactiveLimit = startActive ? 0 : rangeStart.month === month && rangeStart.year === year ? rangeStart.day - 1 : totalDays,
      endInactiveLimit = endActive ? totalDays + 1 : rangeEnd.month === month && rangeEnd.year === year ? rangeEnd.day + 1 : 1;
  var i,
      j,
      l,
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
  dateList = graphic.calendarBody.children[0]; // remove previously applied Classes

  removeClassInChilds(container, classNames.normaldatedefault);
  removeClassInChilds(container, classNames.selecteddatedefault);
  removeClassInChilds(container, classNames.disableddatedefault);
  removeClassInChilds(container, classNames.activedate);
  removeClassInChilds(container, classNames.selecteddate);
  removeClassInChilds(container, classNames.disableddate);
  removeClassInChilds(container, classNames.navinactive); // make navigators inactive

  if (disableNextMonthLi) {
    nextMonthPointer.className += SP + classNames.navinactive;
  } else {
    removeClassName(classNames.navinactive, nextMonth);
  }

  if (disablePrevMonthLi) {
    prevMonthPointer.className += SP + classNames.navinactive;
  } else {
    removeClassName(classNames.navinactive, prevMonth);
  } // remobve all highlight classes


  while (highlightClasses.length) {
    highLightClass = highlightClasses.pop();
    removeClassInChilds(container, highLightClass);
  } // If not enough list items are present, create them


  if (dateList.childElementCount < 42) {
    while (dateList.childElementCount < 42) {
      i = dateList.childElementCount;
      weekenddefault = SP + (i % 7 === 5 || i % 7 === 6 ? classNames.weekenddefault : BLANK);
      weekend = SP + (i % 7 === 5 || i % 7 === 6 ? classNames.weekend : BLANK); // create date elements

      element = createElement('li', {
        appendTo: dateList,
        className: weekenddefault,
        events: {
          click: function click() {
            var info = calendar.info,
                events = calendar.events,
                selectedDate = info.selectedDate,
                active = info.active,
                tempDate = {
              day: i - info.startingPos + 1,
              month: active.month,
              year: active.year
            };

            if (tempDate.day >= 1 && tempDate.day <= info.curMonthInfo.end - info.startingPos && validateActiveStart(tempDate, info.rangeStart) && validateActiveEnd(tempDate, info.rangeEnd)) {
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
        className: classNames.date + SP + classNames.daycol + DASH + i % 7 + weekend,
        innerHTML: _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(SPACE)
      });
      dateElements.push(element);
    }
  } // month and year changed


  monthStr.innerHTML = _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(info.monthLabel[month - 1] + SP + year); // print dates

  for (i = 0, l = dateElements.length; i < l; i++) {
    if (i < monthStaringWeekDay) {
      // show days of previous month
      dateElements[i].innerHTML = _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(new Date(year, month - 1, i - monthStaringWeekDay + 1).getDate());
      dateLiElements[i].className += SP + classNames.disableddatedefault;
      dateElements[i].className += SP + classNames.disableddate;
      dateLiElements[i].eventAttached && dateLiElements[i].removeEventListener('click', dateElements[i]._clickHandler);
      dateLiElements[i].eventAttached = false;
    } else if (i >= limit) {
      // show days of next month
      cur = new Date(year, month - 1, i - monthStaringWeekDay + 1).getDate();
      dateElements[i].innerHTML = _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(cur < 10 ? '0' + cur : cur);
      dateLiElements[i].className += SP + classNames.disableddatedefault;
      dateElements[i].className += SP + classNames.disableddate;
      dateLiElements[i].eventAttached && dateLiElements[i].removeEventListener('click', dateElements[i]._clickHandler);
      dateLiElements[i].eventAttached = false;
    } else {
      j = i - monthStaringWeekDay + 1;
      dateElements[i].innerHTML = _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(j < 10 ? '0' + j : j);
      highlightInfo = highlightMonth && highlightMonth[j];

      if (highlightInfo) {
        highLightClass = SP + classNames.highlightedDate;
        highlightInfo !== true && (highLightClass += SP + highlightInfo);
        highlightClasses.push(highLightClass);
      }

      !dateLiElements[i].eventAttached && dateLiElements[i].addEventListener('click', dateLiElements[i]._clickHandler);
      dateLiElements[i].eventAttached = true;
      dateElements[i].className += SP + (j <= startInactiveLimit || j >= endInactiveLimit ? classNames.disableddate : classNames.activedate) + (highlightInfo ? highLightClass : BLANK);
      dateLiElements[i].className += SP + (j <= startInactiveLimit || j >= endInactiveLimit ? classNames.disableddatedefault : classNames.normaldatedefault) + (highlightInfo ? highLightClass : BLANK);
    }
  } // if the selected date is on this month, heighlight it


  setSelectedDate(calendar);
},
    // this function update the day labels
disPlayDays = function disPlayDays(calendar) {
  var info = calendar.info,
      weekStartingDay = info.weekStartingDay,
      dayElements = calendar.graphic.dayElements;
  var j;

  for (j = 0; j < 7; j++) {
    dayElements[j].innerHTML = _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(info.weekLabel[(j + weekStartingDay) % 7]);
  }
},
    setSelectedDate = function setSelectedDate(calendar) {
  var classNames = calendar.classNames,
      _calendar$info = calendar.info,
      selectedDate = _calendar$info.selectedDate,
      active = _calendar$info.active,
      startingPos = _calendar$info.startingPos,
      _calendar$graphic = calendar.graphic,
      container = _calendar$graphic.container,
      dateLiElements = _calendar$graphic.dateLiElements,
      dateElements = _calendar$graphic.dateElements; // if the selected date is on this month, heighlight it

  if (selectedDate.month === active.month && selectedDate.year === active.year) {
    // remove the class form the old element
    removeClassInChilds(container, classNames.selecteddatedefault);
    removeClassInChilds(container, classNames.selecteddate);
    dateLiElements[selectedDate.day + startingPos - 1].className += SP + classNames.selecteddatedefault;
    dateElements[selectedDate.day + startingPos - 1].className += SP + classNames.selecteddate;
  }
},
    // function to create dom elements
createElement = function createElement(type, options) {
  var appendTo = options.appendTo,
      className = options.className,
      inline = options.inline,
      id = options.id,
      innerHTML = options.innerHTML,
      events = options.events,
      element = document.createElement(type); // set the class

  className && (element.className = className); // set inline style of the element

  inline && element.setAttribute('style', inline); // set the attributes

  id && (element.id = id); // add the innerHTML

  innerHTML && (element.innerHTML = innerHTML);

  if (events) {
    for (var event in events) {
      element.addEventListener(event, events[event]);

      if (event === 'click') {
        element['_' + event + 'Handler'] = events[event];
        element.eventAttached = true;
      }
    }
  } // append to it's parent


  appendTo && appendTo.appendChild(element);
  return element;
},
    // initailise calendar for the first time
init = function init(calendar, config) {
  var graphic = calendar.graphic,
      weekLabel = calendar.info.weekLabel,
      dateElements = graphic.dateElements,
      dayElements = graphic.dayElements,
      dateLiElements = graphic.dateLiElements,
      fontFamily = config['font-family'] && " font-family: ".concat(config['font-family'], ";") || '',
      classNames = calendar.classNames = Object.assign({}, defaultClassNames, calendar._customCssClass),
      container = graphic.container = createElement('div', {
    appendTo: graphic.parentElement,
    inline: inlineStyle.container + fontFamily,
    className: classNames.container,
    id: calendar.id
  }),
      calendarHeader = graphic.calendarHeader = createElement('div', {
    appendTo: container,
    inline: inlineStyle.header // className: classNames.header

  }),
      headerUl = graphic.headerUl = createElement('ul', {
    appendTo: calendarHeader,
    className: classNames['header-container'],
    inline: 'height: 100% !important;'
  }),
      headerMonthLi = graphic.headerMonthLi = createElement('li', {
    appendTo: headerUl,
    inline: inlineStyle.month
  }),
      headerMonthUl = graphic.headerMonthUl = createElement('ul', {
    appendTo: headerMonthLi,
    className: classNames.header,
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
  var element, i, weekend, weekenddefault; // set the container style

  setStyle(container, calendar.style); // set the UL styles

  setStyle(headerUl, ulPadZeroStyle);
  setStyle(weekDays, ulPadZeroStyle);
  setStyle(days, ulPadZeroStyle);
  setStyle(headerMonthUl, ulPadZeroStyle); // li for previous month pointer

  graphic.prevMonth = createElement('li', {
    appendTo: headerMonthUl,
    inline: inlineStyle.nav + SP + inlineStyle.navprev + SP,
    events: {
      click: function click() {
        var info = calendar.info,
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
            },
            doNotUpdateStyle: true
          });
        } else if (year === rangeStart.year && nextMonth >= rangeStart.month) {
          removeClassName(classNames.navinactive, graphic.nextMonth);
          nextMonth === rangeStart.month && (graphic.prevMonth.className += SP + classNames.navinactive);
          calendar.configure({
            active: {
              month: nextMonth,
              year: year
            },
            doNotUpdateStyle: true
          });
        }
      }
    }
  }); // span containing the left arrow

  graphic.prevMonthPointer = createElement('span', {
    appendTo: graphic.prevMonth,
    className: classNames.navprev,
    innerHTML: _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML('&#10094;')
  }); // li for month name

  graphic.monthStrLi = createElement('li', {
    appendTo: headerMonthUl,
    inline: inlineStyle.monthname
  }); // span containing the month name

  graphic.monthStr = createElement('span', {
    appendTo: graphic.monthStrLi,
    className: classNames.headername
  }); // li for next month pointer

  graphic.nextMonth = createElement('li', {
    appendTo: headerMonthUl,
    inline: inlineStyle.nav + SP + inlineStyle.navnext + SP,
    events: {
      click: function click() {
        var info = calendar.info,
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
            },
            doNotUpdateStyle: true
          });
        } else if (year === rangeEnd.year && nextMonth <= rangeEnd.month) {
          nextMonth === rangeEnd.month && (graphic.nextMonth.className += SP + classNames.navinactive);
          removeClassName(classNames.navinactive, graphic.prevMonth);
          calendar.configure({
            active: {
              month: nextMonth,
              year: year
            },
            doNotUpdateStyle: true
          });
        }
      }
    }
  }); // span containing the right arrow

  graphic.nextMonthPointer = createElement('span', {
    appendTo: graphic.nextMonth,
    className: classNames.navnext,
    innerHTML: _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML('&#10095;')
  }); // Create the days of week list items

  for (i = 1; i < 8; i++) {
    weekend = SP + (i > 5 ? classNames.weekend : BLANK);
    weekenddefault = SP + (i > 5 ? classNames.weekenddefault : BLANK); // create week elements

    element = createElement('li', {
      appendTo: weekDays,
      inline: inlineStyle.days,
      className: weekenddefault
    });
    element = createElement('span', {
      appendTo: element,
      innerHTML: _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(weekLabel[i % 7]),
      inline: 'display: block !important;',
      className: classNames.days + SP + classNames.indexeddays + i % 7 + weekend
    });
    dayElements.push(element);
  } // Create the days of month list items


  var _loop = function _loop(_i) {
    weekenddefault = SP + (_i % 7 === 5 || _i % 7 === 6 ? classNames.weekenddefault : BLANK);
    weekend = SP + (_i % 7 === 5 || _i % 7 === 6 ? classNames.weekend : BLANK); // create date elements

    element = createElement('li', {
      appendTo: days,
      inline: inlineStyle.date,
      className: classNames.dateLI + weekenddefault
    });
    dateLiElements.push(element);
    element = createElement('span', {
      appendTo: element,
      className: classNames.date + SP + classNames.daycol + DASH + _i % 7 + weekend,
      inline: 'display: block !important; padding: 4px 0px !important;',
      innerHTML: _fusioncharts_utils_src_trusted_policy__WEBPACK_IMPORTED_MODULE_4__["default"].createHTML(SPACE),
      events: {
        click: function click() {
          var info = calendar.info,
              events = calendar.events,
              selectedDate = info.selectedDate,
              active = info.active,
              tempDate = {
            day: _i - info.startingPos + 1,
            month: active.month,
            year: active.year
          };

          if (tempDate.day >= 1 && tempDate.day <= info.curMonthInfo.end - info.startingPos && validateActiveStart(tempDate, info.rangeStart) && validateActiveEnd(tempDate, info.rangeEnd)) {
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
  };

  for (var _i = 0; _i < 42; _i++) {
    _loop(_i);
  }
},
    // validate active date
validateActiveStart = function validateActiveStart(date, start) {
  var day = date.day,
      month = date.month,
      year = date.year;
  return !(start && (start.year > year || start.year === year && (start.month > month || start.month === month && start.day > day)));
},
    // validate active date
validateActiveEnd = function validateActiveEnd(date, end) {
  var day = date.day,
      month = date.month,
      year = date.year;
  return !(end && (end.year < year || end.year === year && (end.month < month || end.month === month && end.day < day)));
},
    toCssString = function toCssString(key, obj) {
  var className = "fc-cal-user-".concat(key),
      css = '';

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      css += "".concat(key, ": ").concat(obj[key], "; ");
    }
  }

  return {
    className: className,
    cssString: ".".concat(className, " { ").concat(css, "}")
  };
},

/**
 * the api help in segregating the css given in string format or
 * in object format
 */
separateCssClass = function separateCssClass() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var classObj = {},
      styleEle = document.getElementById('fc__calendar__style'),
      sheet = styleEle && styleEle.sheet;

  if (!sheet) {
    return classObj;
  }

  CLASS_PRECEDENCE_SEQUENCE.forEach(function (key) {
    if (styles.hasOwnProperty(key) || defaultCss[key]) {
      var value = styles[key] || defaultCss[key]; // when string is given as the value it will act as class
      // and user is suppose to define the css of the class in his
      // stylesheet

      if (typeof value === 'string') {
        classObj[key] = value;
      } else if (isObject(value)) {
        // the user can pass an object as well
        var _toCssString = toCssString(key, value),
            className = _toCssString.className,
            cssString = _toCssString.cssString; // the css for hover does not get return as classname since
        // hover css class gets applied by bowser itself


        !key.endsWith(':hover') && (classObj[key] = className);

        if (!(cssMap.has(className) && cssMap.get(className).cssStr === cssString)) {
          // the css only gets applied if the class contains new configurations
          var rulePos = sheet.cssRules.length;

          if (cssMap.has(className)) {
            // if the class is already present i the css sheet then that css needs to be
            // deleted and the new css class with different config willl be added in the
            // same position to maintain the order
            rulePos = cssMap.get(className).index;
            sheet.deleteRule(rulePos);
          }

          cssMap.set(className, {
            cssStr: cssString,
            index: rulePos
          });
          sheet.insertRule(cssString, rulePos);
        }
      }
    }
  });
  return classObj;
}; // calendar constructor


var Calendar =
/*#__PURE__*/
function () {
  function Calendar() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Calendar);

    var calendar = this,
        today = new Date(),
        currentDate = {
      day: today.getDate(),
      month: today.getMonth() + 1,
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
      weekLabel: [].concat(weekLabel),
      monthLabel: [].concat(monthLabel),
      weekStartingDay: 1,
      posX: 0,
      posY: 0,
      height: minHeight,
      width: minWidth,
      vAlignment: 'top',
      hAlignment: 'left',
      highlightClasses: []
    };
    calendar._customCssClass = separateCssClass(config.customCssClass); // create the elements for first time only

    init(calendar, config); // configure Calendar with initial config

    config.doNotUpdateStyle = true;
    calendar.configure(config, true);
  } // configure calendar


  _createClass(Calendar, [{
    key: "configure",
    value: function configure(config, doRepaint) {
      var calendar = this,
          graphic = calendar.graphic,
          events = calendar.events,
          info = calendar.info,
          style = calendar.style,
          userEvents = config && config.events;
      var parentElement,
          temp,
          positioningChanged = false;

      if (!config) {
        return;
      }

      if (!config.doNotUpdateStyle) {
        calendar._customCssClass = separateCssClass(config.customCssClass);
      }

      calendar.classNames = Object.assign({}, defaultClassNames, calendar._customCssClass); // set container

      if (config.container && (parentElement = document.getElementById(config.container))) {
        graphic.parentElement = parentElement;
        parentElement.appendChild(graphic.container);
      } else if (config.container instanceof Element) {
        graphic.parentElement = config.container;
      } // set User applied styles


      if (config.style && config.style.position) {
        style.position = config.style.position;
        setStyle(graphic.container, style);
      } // applying visual positioning configuraions to the container


      if (!isNaN(temp = Number(config.posX))) {
        info.posX = temp;
        positioningChanged = true;
      }

      if (!isNaN(temp = Number(config.posY))) {
        info.posY = temp;
        positioningChanged = true;
      } // if (!isNaN(temp = Number(config.height)) && temp > minHeight) {
      //   info.height = temp;
      //   style.height = temp + PX;
      //   positioningChanged = true;
      // }


      if (!isNaN(temp = Number(config.width)) && temp > minWidth) {
        info.width = temp;
        style.width = temp + PX;
        positioningChanged = true;
      }

      if (config.vAlignment && (temp = config.vAlignment.toLowerCase()) && vAlignMultiplier[temp] !== UNDEFINED) {
        info.vAlignment = temp;
        positioningChanged = true;
      }

      if (config.hAlignment && (temp = config.hAlignment.toLowerCase()) && hAlignMultiplier[temp] !== UNDEFINED) {
        info.hAlignment = temp;
        positioningChanged = true;
      } // set events on date, month and year change


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
      } // set calendar date


      if ((temp = config.selectedDate) && !isNaN(Date.parse(temp.month + SLASH + temp.day + SLASH + temp.year))) {
        info.selectedDate = config.selectedDate; // update the active month as well

        info.active.month = info.selectedDate.month;
        info.active.year = info.selectedDate.year;
        doRepaint = true;
      }

      if (config.showInactiveMonths !== UNDEFINED) {
        info.showInactiveMonths = !!config.showInactiveMonths;
      } // set active month


      if (config.active) {
        temp = {
          month: config.active.month || info.active.month,
          year: config.active.year || info.active.year
        };

        if ((info.active.month !== temp.month || info.active.year !== temp.year) && (info.showInactiveMonths || validateActiveStart(temp, info.rangeStart) && validateActiveEnd(temp, info.rangeEnd))) {
          info.active.month = temp.month;
          info.active.year = temp.year;
          doRepaint = true;
        }
      } // set month names


      if (config.monthLabel && config.monthLabel.length === 12) {
        info.monthLabel = config.monthLabel;
        doRepaint = true;
      } // set day names


      if (config.weekLabel && config.weekLabel.length === 7) {
        info.weekLabel = config.weekLabel;
        disPlayDays(calendar);
      } // set Starting day of week


      if (config.weekStart !== UNDEFINED && info.weekStartingDay !== config.weekStart) {
        info.weekStartingDay = config.weekStart;
        disPlayDays(calendar);
      } // Set active range start


      if (config.rangeStart && validateActiveStart(info.selectedDate, config.rangeStart)) {
        info.rangeStart = config.rangeStart;
        doRepaint = true;
      } else if (config.rangeStart === null) {
        delete info.rangeStart;
        doRepaint = true;
      } // Set active range end


      if (config.rangeEnd && validateActiveEnd(info.selectedDate, config.rangeEnd)) {
        info.rangeEnd = config.rangeEnd;
        doRepaint = true; // Check whether the old active date is valid or not
      } else if (config.rangeEnd === null) {
        delete info.rangeEnd;
        doRepaint = true;
      } // set calendar to the desired date


      doRepaint && displayMonth(calendar);

      if (positioningChanged) {
        style.left = info.posX + info.width * (hAlignMultiplier[info.hAlignment] || 0) + PX;
        info.height = graphic.container && graphic.container.offsetHeight || minHeight;
        style.top = info.posY + info.height * (vAlignMultiplier[info.vAlignment] || 0) + PX;
        setStyle(graphic.container, style);
      }
    } // call show function show calendar

  }, {
    key: "show",
    value: function show() {
      var calendar = this,
          container = calendar.graphic.container;
      container.style.visibility = 'visible';
      container.style.opacity = '1';
    } // call hide function to hide calendar

  }, {
    key: "hide",
    value: function hide() {
      var calendar = this,
          container = calendar.graphic.container;
      container.style.visibility = 'hidden';
      container.style.opacity = '0';
    } // returns the current or selected date

  }, {
    key: "getDate",
    value: function getDate() {
      return this.info.selectedDate;
    } // add custom funcion on click

  }, {
    key: "addEventListner",
    value: function addEventListner(eventName, handler) {
      typeof handler === 'function' && this.events && (this.events[eventName] = handler);
    } // remove custom funcion on click

  }, {
    key: "removeEventListner",
    value: function removeEventListner(eventName) {
      if (this.events && this.events[eventName]) {
        delete this.events[eventName];
      }
    }
  }, {
    key: "getDimension",
    value: function getDimension() {
      var graphic = this.graphic;
      return {
        width: graphic.container.offsetWidth,
        height: graphic.container.offsetHeight
      };
    } // dispose the dom elements

  }, {
    key: "dispose",
    value: function dispose() {
      var graphic = this.graphic,
          parentElement = graphic.parentElement,
          container = graphic.container;
      parentElement.removeChild(container);
    }
  }]);

  return Calendar;
}(); // attache to the window if availabel
// if (window) {
//   window.FusionCalendar = Calendar;
// }


/* harmony default export */ __webpack_exports__["default"] = (Calendar);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});