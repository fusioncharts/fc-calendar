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
        // check if the year is leap year or not
        checkLeapYear = function (year) {
            return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        },
        // get current local date
        getCurrentDate = function () {
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1,
                yyyy = today.getFullYear();

            dd < 10 && (dd = '0' + dd);
            mm < 10 && (mm = '0' + mm);
            return mm + '/' + dd + '/' + yyyy;
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
        // validate Input
        validateDate = function (_date) {
            var timestamp,
                newDate,
                date,
                slash = '/';
            if(typeof _date === 'object'){
                date = _date.month + slash + _date.day + slash + _date.year;
            }else{
                date = _date;
            }
            
            timestamp = Date.parse(date);
            // check input date is valid or not
            if (isNaN(timestamp) === false) {
                return date;
            } else {
                throw new Error('invalid Date: ' + date);
            }
        },
        // this function will update the calendar
        // without re-drawing the elements
        setDate = function (date, calendarObj) {
            var calendar = calendarObj,
                calendarInfo = calendar.calendarInfo,
                date = validateDate(date),
                splitedDate = date.split('/'),
                graphic = calendar.graphic,
                style = graphic.style,
                dayElements = graphic.dayElements,
                weekElements = graphic.weekElements,
                monthStr = graphic.monthStr,
                yearStr = graphic.yearStr,
                dateSpan = graphic.spanElement,
                len = dayElements.length,
                currMon = calendarInfo.currMon = Number(splitedDate[0]),
                currYear = calendarInfo.currYear = splitedDate[2],
                currDate = calendarInfo.currDate = Number(splitedDate[1]),
                startingDay = (calendarInfo.weekStartingDay - 1) || 0,
                startingOfMonth = new Date(currMon + '/1/' + currYear),
                weekDay = startingOfMonth.getDay() - startingDay,
                printDate,
                limit,
                isRangeSet,
                className,
                dateStr,
                i,
                j,
                // date range
                isUnderRange = function (date){
                    var date1 = calendarInfo.rangeStart || 0,
                        date2 = calendarInfo.rangeEnd || 0,
                        date = new Date(date),
                        returnType = true;
                    if(date1 && date2){
                        returnType = date1 <= date && date2 >= date;
                    }
                    else if( date1 || date2){
                        date1 && (returnType = date1 <= date);
                        date2 && (returnType = date2 >= date);
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
                    // check if the date is in range or not
                    // change class of the date element
                    isRangeSet = !isUnderRange(dateStr);
                    calendar.previousDate === dateStr && !isRangeSet ? className = 'active' : className = 'normal';
                    isRangeSet && (className = 'disabled');
                    dateSpan[i].className = className;
                    // add date in date element
                    dateSpan[i].innerHTML = printDate;
                    dayElements[i].dateData = {
                        day: printDate,
                        month: currMon,
                        year: currYear
                    };
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
                    if (!isUnderRange) {
                        calendar.previousDate = date;
                        date && setDate(date, calendar);
                        calendar.events.onDateChange && calendar.events.onDateChange(element.dateData);
                    }
                };
            element.addEventListener('click', callFun);
        },
        // initialise the calendar graphicaration
        validateStyle = function (calendar, _graphic) {
            var graphic = calendar.graphic,
                style = {},
                cnt = info.containerCnt || (info.containerCnt = 0);

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

            graphic.style = style;
            setStyle(graphic.container, style);
            info.containerCnt++;
            return graphic;
        },
        // addClickEvent on click
        addClickEvent = function (calendarObj) {
            var calendar = calendarObj,
                calendarInfo = calendar.calendarInfo,
                graphic = calendar.graphic,
                style = graphic.style,
                gotoPreviousMon = graphic.prevMon,
                gotoNextMon = graphic.nextMon,
                gotoPreviousYear = graphic.prevYear,
                gotoNextYear = graphic.nextYear,
                date,
                currDate,
                currMon,
                currYear,
                getCurrentDate = function () {
                    currDate = calendarInfo.currDate;
                    currMon = calendarInfo.currMon;
                    currYear = calendarInfo.currYear;
                    date = {day: currDate, month: currMon, year: currYear};
                    return date;
                };
            // adding events to the month and year changer
            gotoPreviousMon.addEventListener('click', function () {
                getCurrentDate();
                currMon--;
                currMon < 1 && (currMon = 12, currYear--);
                setDate((currMon + '/' + currDate + '/' + currYear), calendar);
                calendar.events.onMonthChange && calendar.events.onMonthChange(date);
            });

            gotoNextMon.addEventListener('click', function () {
                getCurrentDate();
                currMon++;
                currMon > 12 && (currMon = 1, currYear++);
                setDate((currMon + '/' + currDate + '/' + currYear), calendar);
                calendar.events.onMonthChange && calendar.events.onMonthChange(date);
            });

            gotoNextYear.addEventListener('click', function () {
                getCurrentDate();
                currYear++;
                setDate((currMon + '/' + currDate + '/' + currYear), calendar);
                calendar.events.onYearChange && calendar.events.onYearChange(date);
            });

            gotoPreviousYear.addEventListener('click', function () {
                getCurrentDate();
                currYear--;
                setDate((currMon + '/' + currDate + '/' + currYear), calendar);
                calendar.events.onYearChange && calendar.events.onYearChange(date);
            });
        },
        // function to create dom elements
        createElement = function (type, id, appendTo, val, _class) {
            var element = document.createElement(type),
                typeOfVal = typeof val;
            element.id = id;
            element.className = _class || id;

            if (typeOfVal === 'object') {
                element.appendChild(val);
            } else if (typeOfVal === 'string' || typeOfVal === 'number') {
                element.innerHTML = val;
            }
            appendTo && appendTo.appendChild(element);
            return element;
        },
        init = function (calendarObj) {
            var calendar = calendarObj,
                graphic = calendar.graphic,
                cnt = info.containerCnt || (info.containerCnt = 0),
                container = graphic.container = createElement('div', 'calendar ' + cnt, document.body),
                dayElements = [],
                weekElements = [],
                spanElement = [],
                nextMon = createElement('li', 'gotoNextMon ' + cnt, UNDEFINED, '&#10095;', 'next'),
                nextYear = createElement('li', 'gotoNextYear ' + cnt, UNDEFINED, '&#10095;', 'next'),
                prevYear = createElement('li', 'gotoPreviousYear ' + cnt, UNDEFINED, '&#10094;', 'prev'),
                prevMon = createElement('li', 'gotoPreviousMon ' + cnt, UNDEFINED, '&#10094;', 'prev'),
                monthStr = createElement('span', 'monthStr ' + cnt, UNDEFINED, ''),
                yearStr = createElement('span', 'yearStr ' + cnt, UNDEFINED, ''),
                calendarHeader = createElement('div', 'month ' + cnt, container),
                headerMonthUl = createElement('ul', 'month-ul ' + cnt, calendarHeader),
                headerMonthLi = createElement('li', 'month-li ' + cnt, headerMonthUl, ''),
                headerYearLi = createElement('li', 'year-li ' + cnt, headerMonthUl, ''),
                weekDays = createElement('ul', 'weekdays ' + cnt, container),
                days = graphic.dayCell = createElement('ul', 'days ' + cnt, container),
                i;
                // append childs to parent
                headerMonthLi.appendChild(prevMon);
                headerMonthLi.appendChild(monthStr);
                headerMonthLi.appendChild(nextMon);
                headerYearLi.appendChild(prevYear);
                headerYearLi.appendChild(yearStr);
                headerYearLi.appendChild(nextYear);
                graphic.container.className += ' calendar-container';

                for (i = 0; i < 37; i++) {
                    // create week elements
                    if(i < 7){
                        element = createElement('li', (i + '-weekdays ' + cnt), weekDays, info.weekLabel[i]);
                        weekElements.push(element);
                    }
                    // create date elements
                    dateSpan = createElement('span', 'normal', UNDEFINED, '');
                    element = createElement('li', 'dayElement-' + i + cnt, days, dateSpan, true);
                    element.dateData = '';
                    element.isUnderRange = true;
                    addEvent(element, calendar);
                    spanElement.push(dateSpan);
                    dayElements.push(element);
                }
                // add elements to calendar graphic
                graphic.dayElements = dayElements;
                graphic.weekElements = weekElements;
                graphic.headerMonthLi = headerMonthLi;
                graphic.headerYearLi = headerYearLi;
                graphic.prevMon = prevMon;
                graphic.monthStr = monthStr;
                graphic.nextMon = nextMon;
                graphic.prevYear = prevYear;
                graphic.yearStr = yearStr;
                graphic.nextYear = nextYear;
                graphic.spanElement = spanElement;
        },
        calendarProto = Calendar.prototype;
    
    // calendar constructor
    function Calendar (config) {
        var calendar = this;
        calendar.events = {};
        calendar.graphic = {};
        calendar.calendarInfo = {};
        // create the elements for first time only
        init(calendar);
        // configure Calendar with initial config
        calendar.configure(config);
        //add event on change month and year
        addClickEvent(calendar);

    };
    // configure calendar
    calendarProto.configure = function (_config) {
        var calendar = this,
            config = _config || {},
            graphic = _config.style || calendar.graphic,
            events = calendar.events,
            calendarInfo = calendar.calendarInfo,
            userEvents = config.events || {},
            container = config.container && document.getElementById(_config.container);
        // set container
        container && calendar.graphic.container && (container.appendChild(calendar.graphic.container));
        // set events on date, month and year change
        typeof userEvents.onDateChange === 'function' && (events.onDateChange = userEvents.onDateChange);
        typeof userEvents.onYearChange === 'function' && (events.onYearChange = userEvents.onYearChange);
        typeof userEvents.onMonthChange === 'function' && (events.onMonthChange = userEvents.onMonthChange);
        //set calendar date
        calendar.date = config.activeDate && validateDate(config.activeDate) || getCurrentDate();
        calendar.previousDate = calendar.date;
        // configure the style elements
        calendar.graphic = validateStyle(calendar, graphic);
        // set Starting day of week
        config.weekStart && (calendarInfo.weekStartingDay = config.weekStart);
        // Set active range start
        if(config.rangeStart){
            calendarInfo.rangeStart = new Date(validateDate(config.rangeStart))
        }
        else if (config.rangeStart === null){
            calendarInfo.rangeStart = 0;
        }
        // Set active range end
        if(config.rangeEnd){
            calendarInfo.rangeEnd = new Date(validateDate(config.rangeEnd))
        }
        else if (config.rangeEnd === null){
            calendarInfo.rangeEnd = 0;
        }
        // set calendar to the desired date
        setDate(calendar.date, calendar);
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
        return info.date;
    };
    // goto the desired date
    calendarProto.setDate = function (date) {
        var calendar = this;
        setDate(date, calendar);
    };
    // add custom funcion on click
    calendarProto.addEventListner = function (eventName, handler) {
        typeof handler === 'function' && (this.events && (this.events[eventName] = handler));
    };
    // remove custom funcion on click
    calendarProto.removeEventListner = function (eventName) {
        if(this.events && this.events[eventName]) {
            delete this.events[eventName];
        }
    };

    return Calendar;
})();
