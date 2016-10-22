module.exports =
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsShallowCompare = __webpack_require__(2);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _OutsideClickHandler = __webpack_require__(30);

	var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

	var _CalendarMonthGrid = __webpack_require__(31);

	var _CalendarMonthGrid2 = _interopRequireDefault(_CalendarMonthGrid);

	var _arrowLeft = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../svg/arrow-left.svg\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _arrowLeft2 = _interopRequireDefault(_arrowLeft);

	var _arrowRight = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../svg/arrow-right.svg\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _arrowRight2 = _interopRequireDefault(_arrowRight);

	var _chevronUp = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../svg/chevron-up.svg\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _chevronUp2 = _interopRequireDefault(_chevronUp);

	var _chevronDown = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../svg/chevron-down.svg\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _chevronDown2 = _interopRequireDefault(_chevronDown);

	var _getTransformStyles = __webpack_require__(13);

	var _getTransformStyles2 = _interopRequireDefault(_getTransformStyles);

	var _OrientationShape = __webpack_require__(8);

	var _OrientationShape2 = _interopRequireDefault(_OrientationShape);

	var _constants = __webpack_require__(9);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var CALENDAR_MONTH_WIDTH = 300;
	var DAY_PICKER_PADDING = 9;
	var MONTH_PADDING = 23;
	var PREV_TRANSITION = 'prev';
	var NEXT_TRANSITION = 'next';

	var propTypes = {
	  enableOutsideDays: _react.PropTypes.bool,
	  numberOfMonths: _react.PropTypes.number,
	  modifiers: _react.PropTypes.object,
	  orientation: _OrientationShape2['default'],
	  withPortal: _react.PropTypes.bool,
	  hidden: _react.PropTypes.bool,
	  initialVisibleMonth: _react.PropTypes.func,
	  onDayClick: _react.PropTypes.func,
	  onDayMouseDown: _react.PropTypes.func,
	  onDayMouseUp: _react.PropTypes.func,
	  onDayMouseEnter: _react.PropTypes.func,
	  onDayMouseLeave: _react.PropTypes.func,
	  onDayTouchStart: _react.PropTypes.func,
	  onDayTouchEnd: _react.PropTypes.func,
	  onDayTouchTap: _react.PropTypes.func,
	  onPrevMonthClick: _react.PropTypes.func,
	  onNextMonthClick: _react.PropTypes.func,
	  onOutsideClick: _react.PropTypes.func,

	  // i18n
	  monthFormat: _react.PropTypes.string
	};

	var defaultProps = {
	  enableOutsideDays: false,
	  numberOfMonths: 1,
	  modifiers: {},
	  orientation: _constants.HORIZONTAL_ORIENTATION,
	  withPortal: false,
	  hidden: false,
	  initialVisibleMonth: function () {
	    function initialVisibleMonth() {
	      return (0, _moment2['default'])();
	    }

	    return initialVisibleMonth;
	  }(),
	  onDayClick: function () {
	    function onDayClick() {}

	    return onDayClick;
	  }(),
	  onDayMouseDown: function () {
	    function onDayMouseDown() {}

	    return onDayMouseDown;
	  }(),
	  onDayMouseUp: function () {
	    function onDayMouseUp() {}

	    return onDayMouseUp;
	  }(),
	  onDayMouseEnter: function () {
	    function onDayMouseEnter() {}

	    return onDayMouseEnter;
	  }(),
	  onDayMouseLeave: function () {
	    function onDayMouseLeave() {}

	    return onDayMouseLeave;
	  }(),
	  onDayTouchStart: function () {
	    function onDayTouchStart() {}

	    return onDayTouchStart;
	  }(),
	  onDayTouchTap: function () {
	    function onDayTouchTap() {}

	    return onDayTouchTap;
	  }(),
	  onDayTouchEnd: function () {
	    function onDayTouchEnd() {}

	    return onDayTouchEnd;
	  }(),
	  onPrevMonthClick: function () {
	    function onPrevMonthClick() {}

	    return onPrevMonthClick;
	  }(),
	  onNextMonthClick: function () {
	    function onNextMonthClick() {}

	    return onNextMonthClick;
	  }(),
	  onOutsideClick: function () {
	    function onOutsideClick() {}

	    return onOutsideClick;
	  }(),

	  // i18n
	  monthFormat: 'MMMM YYYY'
	};

	var DayPicker = function (_React$Component) {
	  _inherits(DayPicker, _React$Component);

	  function DayPicker(props) {
	    _classCallCheck(this, DayPicker);

	    var _this = _possibleConstructorReturn(this, (DayPicker.__proto__ || Object.getPrototypeOf(DayPicker)).call(this, props));

	    _this.hasSetInitialVisibleMonth = !props.hidden;
	    _this.state = {
	      currentMonth: props.hidden ? (0, _moment2['default'])() : props.initialVisibleMonth(),
	      monthTransition: null,
	      translationValue: 0
	    };

	    _this.handlePrevMonthClick = _this.handlePrevMonthClick.bind(_this);
	    _this.handleNextMonthClick = _this.handleNextMonthClick.bind(_this);
	    _this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind(_this);
	    return _this;
	  }

	  _createClass(DayPicker, [{
	    key: 'componentDidMount',
	    value: function () {
	      function componentDidMount() {
	        if (this.isHorizontal()) {
	          this.adjustDayPickerHeight();
	          this.initializeDayPickerWidth();
	        }
	      }

	      return componentDidMount;
	    }()
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function () {
	      function componentWillReceiveProps(nextProps) {
	        if (!this.hasSetInitialVisibleMonth && !nextProps.hidden) {
	          this.hasSetInitialVisibleMonth = true;
	          this.setState({
	            currentMonth: nextProps.initialVisibleMonth()
	          });
	        }
	      }

	      return componentWillReceiveProps;
	    }()
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function () {
	      function shouldComponentUpdate(nextProps, nextState) {
	        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
	      }

	      return shouldComponentUpdate;
	    }()
	  }, {
	    key: 'componentDidUpdate',
	    value: function () {
	      function componentDidUpdate() {
	        if (this.state.monthTransition) {
	          if (this.isHorizontal()) {
	            this.adjustDayPickerHeight();
	          }
	        }
	      }

	      return componentDidUpdate;
	    }()
	  }, {
	    key: 'getMonthHeightByIndex',
	    value: function () {
	      function getMonthHeightByIndex(i) {
	        return this.getMonthHeight(_reactDom2['default'].findDOMNode(this.refs.transitionContainer).querySelectorAll('.CalendarMonth')[i]);
	      }

	      return getMonthHeightByIndex;
	    }()
	  }, {
	    key: 'getMonthHeight',
	    value: function () {
	      function getMonthHeight(el) {
	        var caption = el.querySelector('.js-CalendarMonth__caption');
	        var grid = el.querySelector('.js-CalendarMonth__grid');

	        // Need to separate out table children for FF
	        // Add an additional +1 for the border
	        return this.calculateDimension(caption, 'height', true, true) + this.calculateDimension(grid, 'height') + 1;
	      }

	      return getMonthHeight;
	    }()
	  }, {
	    key: 'applyTransformStyles',
	    value: function () {
	      function applyTransformStyles(el, transform) {
	        var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	        var transformStyles = (0, _getTransformStyles2['default'])(transform);
	        transformStyles.opacity = opacity;

	        Object.keys(transformStyles).forEach(function (styleKey) {
	          // eslint-disable-next-line no-param-reassign
	          el.style[styleKey] = transformStyles[styleKey];
	        });
	      }

	      return applyTransformStyles;
	    }()
	  }, {
	    key: 'calculateDimension',
	    value: function () {
	      function calculateDimension(el, axis) {
	        var borderBox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	        var withMargin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        if (!el) {
	          return 0;
	        }

	        var axisStart = axis === 'width' ? 'Left' : 'Top';
	        var axisEnd = axis === 'width' ? 'Right' : 'Bottom';

	        // Only read styles if we need to
	        var style = !borderBox || withMargin ? window.getComputedStyle(el) : {};

	        // Offset includes border and padding
	        var size = axis === 'width' ? el.offsetWidth : el.offsetHeight;

	        // Get the inner size
	        if (!borderBox) {
	          size -= parseFloat(style['padding' + axisStart]) + parseFloat(style['padding' + axisEnd]) + parseFloat(style['border' + axisStart + 'Width']) + parseFloat(style['border' + axisEnd + 'Width']);
	        }

	        // Apply margin
	        if (withMargin) {
	          size += parseFloat(style['margin' + axisStart]) + parseFloat(style['margin' + axisEnd]);
	        }

	        return size;
	      }

	      return calculateDimension;
	    }()
	  }, {
	    key: 'isHorizontal',
	    value: function () {
	      function isHorizontal() {
	        return this.props.orientation === _constants.HORIZONTAL_ORIENTATION;
	      }

	      return isHorizontal;
	    }()
	  }, {
	    key: 'isVertical',
	    value: function () {
	      function isVertical() {
	        return this.props.orientation === _constants.VERTICAL_ORIENTATION;
	      }

	      return isVertical;
	    }()
	  }, {
	    key: 'initializeDayPickerWidth',
	    value: function () {
	      function initializeDayPickerWidth() {
	        this.dayPickerWidth = this.calculateDimension(_reactDom2['default'].findDOMNode(this.refs.calendarMonthGrid).querySelector('.CalendarMonth'), 'width', true);
	      }

	      return initializeDayPickerWidth;
	    }()
	  }, {
	    key: 'updateStateAfterMonthTransition',
	    value: function () {
	      function updateStateAfterMonthTransition() {
	        var _state = this.state;
	        var currentMonth = _state.currentMonth;
	        var monthTransition = _state.monthTransition;

	        var newMonth = currentMonth;
	        if (monthTransition === PREV_TRANSITION) {
	          newMonth = currentMonth.clone().subtract(1, 'month');
	        } else if (monthTransition === NEXT_TRANSITION) {
	          newMonth = currentMonth.clone().add(1, 'month');
	        }

	        // clear the previous transforms
	        this.applyTransformStyles(_reactDom2['default'].findDOMNode(this.refs.calendarMonthGrid).querySelector('.CalendarMonth'), 'none');

	        this.setState({
	          currentMonth: newMonth,
	          monthTransition: null,
	          translationValue: 0
	        });
	      }

	      return updateStateAfterMonthTransition;
	    }()
	  }, {
	    key: 'handlePrevMonthClick',
	    value: function () {
	      function handlePrevMonthClick(e) {
	        if (e) e.preventDefault();

	        if (this.props.onPrevMonthClick) {
	          this.props.onPrevMonthClick(e);
	        }

	        var translationValue = this.isVertical() ? this.getMonthHeightByIndex(0) : this.dayPickerWidth;

	        // The first CalendarMonth is always positioned absolute at top: 0 or left: 0
	        // so we need to transform it to the appropriate location before the animation.
	        // This behavior is because we would otherwise need a double-render in order to
	        // adjust the container position once we had the height the first calendar
	        // (ie first draw all the calendar, then in a second render, use the first calendar's
	        // height to position the container). Variable calendar heights, amirite? <3 Maja
	        this.translateFirstDayPickerForAnimation(translationValue);

	        this.setState({
	          monthTransition: PREV_TRANSITION,
	          translationValue: translationValue
	        });
	      }

	      return handlePrevMonthClick;
	    }()
	  }, {
	    key: 'handleNextMonthClick',
	    value: function () {
	      function handleNextMonthClick(e) {
	        if (e) e.preventDefault();
	        if (this.props.onNextMonthClick) {
	          this.props.onNextMonthClick(e);
	        }

	        var translationValue = this.isVertical() ? -this.getMonthHeightByIndex(1) : -this.dayPickerWidth;

	        this.setState({
	          monthTransition: NEXT_TRANSITION,
	          translationValue: translationValue
	        });
	      }

	      return handleNextMonthClick;
	    }()
	  }, {
	    key: 'adjustDayPickerHeight',
	    value: function () {
	      function adjustDayPickerHeight() {
	        var _this2 = this;

	        var transitionContainer = _reactDom2['default'].findDOMNode(this.refs.transitionContainer);
	        var heights = [];

	        // convert node list to array
	        [].concat(_toConsumableArray(transitionContainer.querySelectorAll('.CalendarMonth'))).forEach(function (el) {
	          if (el.getAttribute('data-visible') === 'true') {
	            heights.push(_this2.getMonthHeight(el));
	          }
	        });

	        var newMonthHeight = Math.max.apply(Math, heights) + MONTH_PADDING;

	        if (newMonthHeight !== this.calculateDimension(transitionContainer, 'height')) {
	          this.monthHeight = newMonthHeight;
	          transitionContainer.style.height = String(newMonthHeight) + 'px';
	        }
	      }

	      return adjustDayPickerHeight;
	    }()
	  }, {
	    key: 'translateFirstDayPickerForAnimation',
	    value: function () {
	      function translateFirstDayPickerForAnimation(translationValue) {
	        var transformType = this.isVertical() ? 'translateY' : 'translateX';
	        var transformValue = transformType + '(-' + String(translationValue) + 'px)';

	        this.applyTransformStyles(_reactDom2['default'].findDOMNode(this.refs.transitionContainer).querySelector('.CalendarMonth'), transformValue, 1);
	      }

	      return translateFirstDayPickerForAnimation;
	    }()
	  }, {
	    key: 'renderNavigation',
	    value: function () {
	      function renderNavigation() {
	        var isVertical = this.isVertical();

	        return _react2['default'].createElement('div', { className: 'DayPicker__nav' }, _react2['default'].createElement('span', {
	          className: 'DayPicker__nav--prev',
	          onClick: this.handlePrevMonthClick
	        }, isVertical ? _react2['default'].createElement(_chevronUp2['default'], null) : _react2['default'].createElement(_arrowLeft2['default'], null)), _react2['default'].createElement('span', {
	          className: 'DayPicker__nav--next',
	          onClick: this.handleNextMonthClick
	        }, isVertical ? _react2['default'].createElement(_chevronDown2['default'], null) : _react2['default'].createElement(_arrowRight2['default'], null)));
	      }

	      return renderNavigation;
	    }()
	  }, {
	    key: 'renderWeekHeader',
	    value: function () {
	      function renderWeekHeader(index) {
	        var numberOfMonths = this.props.numberOfMonths;

	        var widthPercentage = 100 / numberOfMonths;
	        var horizontalStyle = {
	          width: widthPercentage + '%',
	          left: widthPercentage * index + '%'
	        };

	        var style = this.isHorizontal() ? horizontalStyle : {};

	        var header = [];
	        for (var i = 0; i < 7; i++) {
	          header.push(_react2['default'].createElement('li', { key: i }, _react2['default'].createElement('small', null, (0, _moment2['default'])().weekday(i).format('dd'))));
	        }

	        return _react2['default'].createElement('div', {
	          className: 'DayPicker__week-header',
	          key: 'week-' + String(index),
	          style: style
	        }, _react2['default'].createElement('ul', null, header));
	      }

	      return renderWeekHeader;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _state2 = this.state;
	        var currentMonth = _state2.currentMonth;
	        var monthTransition = _state2.monthTransition;
	        var translationValue = _state2.translationValue;
	        var _props = this.props;
	        var enableOutsideDays = _props.enableOutsideDays;
	        var numberOfMonths = _props.numberOfMonths;
	        var orientation = _props.orientation;
	        var modifiers = _props.modifiers;
	        var withPortal = _props.withPortal;
	        var onDayClick = _props.onDayClick;
	        var onDayMouseDown = _props.onDayMouseDown;
	        var onDayMouseUp = _props.onDayMouseUp;
	        var onDayTouchStart = _props.onDayTouchStart;
	        var onDayTouchEnd = _props.onDayTouchEnd;
	        var onDayTouchTap = _props.onDayTouchTap;
	        var onDayMouseEnter = _props.onDayMouseEnter;
	        var onDayMouseLeave = _props.onDayMouseLeave;
	        var onOutsideClick = _props.onOutsideClick;
	        var monthFormat = _props.monthFormat;

	        var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
	        var weekHeaders = [];
	        for (var i = 0; i < numOfWeekHeaders; i++) {
	          weekHeaders.push(this.renderWeekHeader(i));
	        }

	        var firstVisibleMonthIndex = 1;
	        if (monthTransition === PREV_TRANSITION) {
	          firstVisibleMonthIndex -= 1;
	        } else if (monthTransition === NEXT_TRANSITION) {
	          firstVisibleMonthIndex += 1;
	        }

	        var dayPickerClassNames = (0, _classnames2['default'])('DayPicker', {
	          'DayPicker--horizontal': this.isHorizontal(),
	          'DayPicker--vertical': this.isVertical(),
	          'DayPicker--portal': withPortal
	        });

	        var transitionContainerClasses = (0, _classnames2['default'])('transition-container', {
	          'transition-container--horizontal': this.isHorizontal(),
	          'transition-container--vertical': this.isVertical()
	        });

	        var horizontalWidth = CALENDAR_MONTH_WIDTH * numberOfMonths + 2 * DAY_PICKER_PADDING;

	        // this is a kind of made-up value that generally looks good. we'll
	        // probably want to let the user set this explicitly.
	        var verticalHeight = 1.75 * CALENDAR_MONTH_WIDTH;

	        var dayPickerStyle = {
	          width: this.isHorizontal() && horizontalWidth,

	          // These values are to center the datepicker (approximately) on the page
	          marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
	          marginTop: this.isHorizontal() && withPortal && -CALENDAR_MONTH_WIDTH / 2
	        };

	        var transitionContainerStyle = {
	          width: this.isHorizontal() && horizontalWidth,
	          height: this.isVertical() && !withPortal && verticalHeight
	        };

	        var isCalendarMonthGridAnimating = monthTransition !== null;
	        var transformType = this.isVertical() ? 'translateY' : 'translateX';
	        var transformValue = transformType + '(' + String(translationValue) + 'px)';

	        return _react2['default'].createElement('div', { className: dayPickerClassNames, style: dayPickerStyle }, _react2['default'].createElement(_OutsideClickHandler2['default'], { onOutsideClick: onOutsideClick }, this.renderNavigation(), _react2['default'].createElement('div', { className: 'DayPicker__week-headers' }, weekHeaders), _react2['default'].createElement('div', {
	          className: transitionContainerClasses,
	          ref: 'transitionContainer',
	          style: transitionContainerStyle
	        }, _react2['default'].createElement(_CalendarMonthGrid2['default'], {
	          ref: 'calendarMonthGrid',
	          transformValue: transformValue,
	          enableOutsideDays: enableOutsideDays,
	          firstVisibleMonthIndex: firstVisibleMonthIndex,
	          initialMonth: currentMonth,
	          isAnimating: isCalendarMonthGridAnimating,
	          modifiers: modifiers,
	          orientation: orientation,
	          withPortal: withPortal,
	          numberOfMonths: numberOfMonths,
	          onDayClick: onDayClick,
	          onDayMouseDown: onDayMouseDown,
	          onDayMouseUp: onDayMouseUp,
	          onDayTouchStart: onDayTouchStart,
	          onDayTouchEnd: onDayTouchEnd,
	          onDayTouchTap: onDayTouchTap,
	          onDayMouseEnter: onDayMouseEnter,
	          onDayMouseLeave: onDayMouseLeave,
	          onMonthTransitionEnd: this.updateStateAfterMonthTransition,
	          monthFormat: monthFormat
	        }))));
	      }

	      return render;
	    }()
	  }]);

	  return DayPicker;
	}(_react2['default'].Component);

	exports['default'] = DayPicker;

	DayPicker.propTypes = propTypes;
	DayPicker.defaultProps = defaultProps;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-addons-shallow-compare");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	module.exports = require("../shapes/OrientationShape");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("../constants/constants");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	module.exports = require("../utils/getTransformStyles");

/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	module.exports = require("./OutsideClickHandler");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("./CalendarMonthGrid");

/***/ }
/******/ ]);
