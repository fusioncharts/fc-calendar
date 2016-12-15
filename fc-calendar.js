var Calendar = (function () {
    var UNDEFINED,
        // basic calendar configaration
        info = {
            daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            monthLabel: ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'
            ]
        },
        counter = 0,
        getuid = function () {
            return 'fc_calendar-' + (counter++);
        },
        // check if the year is leap year or not
        checkLeapYear = function (year) {
            return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        },
        // get current local date
        getCurrentDate = function () {
            var today = new Date();

            return {
                day: today.getDate(),
                month: (today.getMonth() + 1),
                year: today.getFullYear()
            };
        },
        // apply custom style to the container
        setStyle = function (element, graphic) {
            var container,
                property;

            if (typeof element === 'object') {
                container = element;
            } else {
                container = document.getElementById(element);
            }
            for (property in graphic) {
                if (graphic.hasOwnProperty(property)) {
                    container.style[property] = graphic[property];
                }
            }
        },
        // return date as string
        getDateString = function (dateObj) {
            if (typeof dateObj === 'object') {
                return dateObj.month + '/' + dateObj.day + '/' + dateObj.year;
            }
        },
        // validate Input
        validateDate = function (date) {
            var timestamp,
                slash = '/';
            if (typeof date === 'object') {
                date = date.month + slash + date.day + slash + date.year;
            }
            timestamp = Date.parse(date);
            return (isNaN(timestamp) === false);
        },
        // this function will update the calendar
        // without re-drawing the elements
        setDate = function (calendar) {
            var calendarInfo = calendar && calendar.calendarInfo,
                date = getDateString(calendarInfo.selectedDate),
                active = calendarInfo.active,
                graphic = calendar.graphic,
                dayElements = graphic.dayElements,
                weekElements = graphic.weekElements,
                monthStr = graphic.monthStr,
                yearStr = graphic.yearStr,
                dateSpan = graphic.spanElement,
                len = dayElements.length,
                currMon = active.month,
                currYear = active.year,
                startingDay = (calendarInfo.weekStartingDay - 1) || 0,
                startingOfMonth = new Date(currMon + '/1/' + currYear),
                weekDay = startingOfMonth.getDay() - startingDay,
                dateObj = {},
                printDate,
                limit,
                isRangeSet,
                className,
                dateStr,
                i,
                j,
                // date range
                isUnderRange = function (date) {
                    var rangeStart = calendarInfo.rangeStart || 0,
                        rangeEnd = calendarInfo.rangeEnd || 0,
                        returnType = true,
                        isValidRangeStart,
                        isValidRangeEnd;
                    if (rangeStart && rangeEnd) {
                        isValidRangeStart = rangeStart.year <= date.year && (rangeStart.month < date.month
                         || (rangeStart.month === date.month && rangeStart.day <= date.day));
                        isValidRangeEnd = rangeEnd.year >= date.year && (rangeEnd.month > date.month
                         || (rangeEnd.month === date.month && rangeEnd.day >= date.day));

                        returnType = isValidRangeStart && isValidRangeEnd;
                    }
                    else if ( rangeStart || rangeEnd) {
                        rangeStart && (returnType = (rangeStart.year < date.year) || rangeStart.year === date.year
                         && (rangeStart.month < date.month || (rangeStart.month === date.month && rangeStart.day <= date.day)));

                        rangeEnd && (returnType = (rangeEnd.year > date.year) || rangeEnd.year === date.year
                         && (rangeEnd.month > date.month || (rangeEnd.month === date.month && rangeEnd.day >= date.day)));
                    }
                    return returnType;
                };

            // manage week day
            weekDay < 0 && (weekDay += 7);
            // check leap year for february
            checkLeapYear(currYear) ? info.daysInMonth[1] = 29 : info.daysInMonth[1] = 28;

            limit = info.daysInMonth[currMon - 1] + weekDay - 1;
            // month and year changed
            monthStr.innerHTML = info.monthLabel[currMon - 1];
            yearStr.innerHTML = currYear;
            // if calendar weeks have to repaint then do it
            if (calendarInfo.weekStartingDay > 0) {
                for (j = 0, i = startingDay; j < (7 - startingDay); i++, j++) {
                    weekElements[j].innerHTML = info.weekLabel[i];
                }
                for (j, i = 7 - i; j < 7; j++, i++) {
                    weekElements[j].innerHTML = info.weekLabel[i];
                }
            }

            // repaint date elements
            for (i = 0; i < len; i++) {
                if (i < weekDay || i > limit) {
                    dateSpan[i].innerHTML = '';
                    dayElements[i].dateData = '';
                    dateSpan[i].className = 'normal';
                } else {
                    printDate = (i - weekDay + 1);
                    dateStr = currMon + '/' + printDate + '/' + currYear;
                    dateObj = {
                        day: printDate,
                        month: currMon,
                        year: currYear
                    };
                    // check if the date is in range or not
                    // change class of the date element
                    isRangeSet = !isUnderRange(dateObj);
                    date === dateStr && !isRangeSet ? className = 'active' : className = 'normal';
                    isRangeSet && (className = 'disabled');
                    dateSpan[i].className = className;
                    // add date in date element
                    dateSpan[i].innerHTML = printDate;
                    dayElements[i].dateData = dateObj;
                    dayElements[i].isUnderRange = isRangeSet;
                }
            }
        },
        // add event and apply custom functions to date
        addEvent = function (element, calendarObj, func) {
            var calendar = calendarObj,
                calendarInfo = calendar.calendarInfo,
                date,
                isUnderRange,
                callFun = func || function () {
                    date = validateDate(element.dateData);
                    isUnderRange = element.isUnderRange;
                    calendarInfo.selectedDate = element.dateData;
                    if (!isUnderRange) {
                        calendar.date = date;
                        date && setDate(calendar);
                        calendar.events.onDateChange && calendar.events.onDateChange(element.dateData);
                    }
                };
            element.addEventListener('click', callFun);
        },
        // initialise the calendar graphicaration
        validateStyle = function (calendar, _graphic) {
            var graphic = calendar.graphic,
                style = {};

            graphic.posX = (_graphic.x || 0);
            graphic.posY = (_graphic.y || 0);
            graphic.verticalAlignment = _graphic.verticalalignment || 'top';
            graphic.horizontalAlignment = _graphic.horizontalalignment || 'left';
            graphic.height = (_graphic.height || 200);
            graphic.width = (_graphic.width || 300);

            style.position = graphic.position || 'relative';
            style.height = graphic.height + 'px';
            style.width = graphic.width + 'px';
            style.top = (function (conf) {
                if (conf.verticalAlignment.toLowerCase() === 'top') {
                    return conf.posY + 'px';
                } else if (conf.verticalAlignment.toLowerCase() === 'middle') {
                    return (conf.posY + conf.height / 2) + 'px';
                } else if (conf.verticalAlignment.toLowerCase() === 'bottom') {
                    return (conf.posY + conf.height) + 'px';
                }
            })(graphic);
            style.left = (function (conf) {
                if (conf.horizontalAlignment.toLowerCase() === 'left') {
                    return conf.posX + 'px';
                } else if (conf.horizontalAlignment.toLowerCase() === 'middle') {
                    return (conf.posX + conf.width / 2) + 'px';
                } else if (conf.horizontalAlignment.toLowerCase() === 'right') {
                    return (conf.posX + conf.width) + 'px';
                }
            })(graphic);

            graphic.visuals = style;
            setStyle(graphic.container, style);
            info.containerCnt++;
            return graphic;
        },
        // addClickEvent on click
        addClickEvent = function (calendar) {
            var calendarInfo = calendar && calendar.calendarInfo,
                graphic = calendar && calendar.graphic,
                gotoPreviousMon = graphic.prevMon,
                gotoNextMon = graphic.nextMon,
                gotoPreviousYear = graphic.prevYear,
                gotoNextYear = graphic.nextYear;

            // adding events to the month and year changer
            gotoPreviousMon.addEventListener('click', function () {
                calendarInfo.active.month--;
                calendarInfo.active.month < 1 && (calendarInfo.active.month = 12, calendarInfo.active.year--);
                calendarInfo.selectedDate.month = calendarInfo.active.month;
                calendarInfo.selectedDate.year = calendarInfo.active.year;
                setDate(calendar);
                // call user defined function
                calendar.events.onMonthChange && calendar.events.onMonthChange(calendarInfo.active.month);
            });

            gotoNextMon.addEventListener('click', function () {
                calendarInfo.active.month++;
                calendarInfo.active.month > 12 && (calendarInfo.active.month = 1, calendarInfo.active.year++);
                setDate(calendar);
                calendarInfo.selectedDate.month = calendarInfo.active.month;
                calendarInfo.selectedDate.year = calendarInfo.active.year;
                // call user defined function
                calendar.events.onYearChange && calendar.events.onYearChange(calendarInfo.active.month);
            });

            gotoNextYear.addEventListener('click', function () {
                calendarInfo.active.year++;
                setDate(calendar);
                calendarInfo.selectedDate.year = calendarInfo.active.year;
                // call user defined function
                calendar.events.onYearChange && calendar.events.onYearChange(calendarInfo.active.year);
            });
            gotoPreviousYear.addEventListener('click', function () {
                calendarInfo.active.year--;
                setDate(calendar);
                calendarInfo.selectedDate.year = calendarInfo.active.year;
                // call user defined function
                calendar.events.onYearChange && calendar.events.onYearChange(calendarInfo.active.year);
            });
        },
        // function to create dom elements
        createElement = function (type, appendTo, _class, id, innerHTML) {
            var element = document.createElement(type);
            // set the class
            _class && (element.className = _class);

            // set the attributes
            id && (element.id = id);
            // add the innerHTML
            if (innerHTML !== undefined) {
                element.innerHTML = innerHTML;
            }
            // append to it's parent
            appendTo && appendTo.appendChild(element);
            return element;
        },
        // initailise calendar for the first time
        init = function (calendar) {
            var graphic = calendar.graphic,
                container = graphic.container = createElement('div', graphic.parentElement, UNDEFINED, calendar.id),
                dayElements = graphic.dayElements = [],
                weekElements = graphic.weekElements = [],
                spanElement = graphic.spanElement = [],
                calendarHeader = graphic.calendarHeader = createElement('div', container, 'month'),
                headerMonthUl = graphic.headerMonthUl = createElement('ul', calendarHeader, 'month-ul '),
                headerMonthLi = graphic.headerMonthLi = createElement('li', headerMonthUl, 'month-li '),
                headerYearLi = graphic.headerYearLi = createElement('li', headerMonthUl, 'year-li '),
                weekDays = graphic.weekDays = createElement('ul', container, 'weekdays'),
                days = graphic.days = graphic.dayCell = createElement('ul', container, 'days'),
                element,
                dateSpan,
                i;
            graphic.nextMon = createElement('li', headerMonthLi, 'next', UNDEFINED, '&#10095;');
            graphic.nextYear = createElement('li', headerYearLi, 'next', UNDEFINED, '&#10095;');
            graphic.prevYear = createElement('li', headerYearLi, 'prev', UNDEFINED, '&#10094;');
            graphic.prevMon = createElement('li', headerMonthLi, 'prev', UNDEFINED, '&#10094;');
            graphic.monthStr = createElement('span', headerMonthLi, 'monthStr');
            graphic.yearStr = createElement('span', headerYearLi, 'yearStr');

            graphic.container.className += ' calendar-container';

            for (i = 0; i < 37; i++) {
                // create week elements
                if (i < 7) {
                    element = createElement('li', weekDays, UNDEFINED, UNDEFINED, info.weekLabel[i]);
                    weekElements.push(element);
                }
                // create date elements
                element = createElement('li', days);
                dateSpan = createElement('span', element, 'normal');
                element.dateData = '';
                element.isUnderRange = true;
                addEvent(element, calendar);
                spanElement.push(dateSpan);
                dayElements.push(element);
            }
        },
        validateRangeStart = function (date1, date2) {
            return (date2.month >= date1.month) && (date2.year >= date1.year);
        },
        validateRangeEnd = function (date1, date2) {
            return (date2.month <= date1.month) && (date2.year <= date1.year);
        },
        calendarProto = Calendar.prototype;

    // calendar constructor
    function Calendar (config) {
        var calendar = this,
            currentDate = getCurrentDate();
        calendar.graphic = {
            parentElement: document.body,
            visuals: {}
        };
        calendar.id = getuid();
        calendar.events = {};
        calendar.calendarInfo = {
            selectedDate: currentDate,
            active: {
                month: currentDate.month,
                year: currentDate.year
            },
            weekStartingDay: 0,
            rendered: false
        };
        
        // create the elements for first time only
        init(calendar);
        // configure Calendar with initial config
        calendar.configure(config);
        
        calendar.calendarInfo.rendered = true;
        setDate(calendar);
        // add event on change month and year
        addClickEvent(calendar);
    };
    // configure calendar
    calendarProto.configure = function (_config) {
        var calendar = this,
            config = _config || {},
            graphic = calendar.graphic,
            events = calendar.events,
            calendarInfo = calendar.calendarInfo,
            userEvents = config.events || {},
            parentElement,
            visuals = config.style,
            doRepaint = false;

        
        // set container
        if (config.container && (parentElement = document.getElementById(config.container))) {
            graphic.parentElement = parentElement;
            if (calendarInfo.rendered) {
                parentElement.appendChild(graphic.container);
            }
        }
        
        // applying visual styles to the container
        visuals && validateStyle(calendar, visuals);
        // set events on date, month and year change
        typeof userEvents.onDateChange === 'function' && (events.onDateChange = userEvents.onDateChange);
        typeof userEvents.onYearChange === 'function' && (events.onYearChange = userEvents.onYearChange);
        typeof userEvents.onMonthChange === 'function' && (events.onMonthChange = userEvents.onMonthChange);
        // set calendar date
        if (config.activeDate && validateDate(config.activeDate)) {
            calendarInfo.selectedDate = config.activeDate;
            // update the active month as well
            calendarInfo.active.month = calendarInfo.selectedDate.month;
            calendarInfo.active.year = calendarInfo.selectedDate.year;
            doRepaint = true;
        }
        // set Starting day of week
        if (config.weekStart && calendarInfo.weekStartingDay !== config.weekStart) {
            calendarInfo.weekStartingDay = config.weekStart;
            doRepaint = true;
        }
        // Set active range start
        if (config.rangeStart && validateRangeStart(config.rangeStart, calendarInfo.selectedDate)) {
            calendarInfo.rangeStart = config.rangeStart;
            doRepaint = true;
        }
        else if (config.rangeStart === null) {
            delete calendarInfo.rangeStart;
            doRepaint = true;
        }
        // Set active range end
        if (config.rangeEnd && validateRangeEnd(config.rangeEnd, calendarInfo.selectedDate)) {
            calendarInfo.rangeEnd = config.rangeEnd;
            doRepaint = true;
            // Check whether the old active date is valid or not
        }
        else if (config.rangeEnd === null) {
            delete calendarInfo.rangeEnd;
            doRepaint = true;
        }
        // set calendar to the desired date
        doRepaint && calendarInfo.rendered && setDate(calendar);
    };
    // call show function show calendar
    calendarProto.show = function () {
        var calendar = this,
            container = calendar.graphic.container;
        container.style.visibility = 'visible';
        container.style.opacity = '1';
    };
    // call hide function to hide calendar
    calendarProto.hide = function () {
        var calendar = this,
            container = calendar.graphic.container;
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
    };
    // returns the current or selected date
    calendarProto.getDate = function () {
        return this.calendarInfo.selectedDate;
    };
    // add custom funcion on click
    calendarProto.addEventListner = function (eventName, handler) {
        typeof handler === 'function' && (this.events && (this.events[eventName] = handler));
    };
    // remove custom funcion on click
    calendarProto.removeEventListner = function (eventName) {
        if (this.events && this.events[eventName]) {
            delete this.events[eventName];
        }
    };

    return Calendar;
})();
