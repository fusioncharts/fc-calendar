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
        // get id for container
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
                date = calendarInfo.selectedDate,
                active = calendarInfo.active,
                graphic = calendar.graphic,
                weekElements = graphic.weekElements,
                monthStr = graphic.monthStr,
                yearStr = graphic.yearStr,
                dateSpan = graphic.spanElement,
                currMon = active.month,
                currYear = active.year,
                startingDay = (calendarInfo.weekStartingDay - 1) || 0,
                startingOfMonth = new Date(currMon + '/1/' + currYear),
                monthStaringDay = startingOfMonth.getDay(),
                weekDay = calendarInfo.startingPos = monthStaringDay - startingDay,
                rangeStart = calendarInfo.rangeStart,
                rangeEnd = calendarInfo.rangeEnd,
                printDate,
                limit,
                i,
                j;

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

            // blank dates
            for (i = 0; i < weekDay; i++) {
                dateSpan[i].innerHTML = '';
                dateSpan[i].className = 'normal';
            }

            // print dates
            for (;i <= limit; i++) {
                printDate = (i - weekDay + 1);
                dateSpan[i].innerHTML = printDate;
                dateSpan[i].className = 'hovered';
                // rangeStart && printDate <= rangeStart.day &&
            }
            // print blank dates
            for (;i < 37; i++) {
                dateSpan[i].innerHTML = '';
                dateSpan[i].className = 'normal';
            }

            // if the selected date is on this month, heighlight it
            if (date.month === currMon && date.year === currYear) {
                dateSpan[(date.day + weekDay - 1)].className = 'active';
            }
            // if the start range is in this month, set the inactive initial dates
            if (rangeStart && validateRangeStart(active, rangeStart)) {
                for (i = weekDay; i <= rangeStart.day; i++) {
                    dateSpan[i].className = 'disabled';
                }
            }
            // if the end range is in this month, set the inactive end dates
            if (rangeEnd && validateRangeEnd(active, rangeEnd)) {
                for (i = rangeEnd.day; i <= limit; i++) {
                    dateSpan[i].className = 'disabled';
                }
            }
        },
        // initialise the calendar graphicaration
        validateStyle = function (calendar, _graphic) {
            var graphic = calendar.graphic,
                visuals = graphic.visuals,
                style = {};

            graphic.posX = (_graphic.x || 0);
            graphic.posY = (_graphic.y || 0);
            graphic.verticalAlignment = _graphic.verticalalignment || 'top';
            graphic.horizontalAlignment = _graphic.horizontalalignment || 'left';
            graphic.height = (graphic.height > 199 && _graphic.height || 
                (visuals.height && Number((visuals.height).match(/\d+/g)[0])) || 200);
            graphic.width = (_graphic.width > 299 && _graphic.width ||
             (visuals.width && Number((visuals.width).match(/\d+/g)[0])) || 300);

            style.position = graphic.position || 'relative';
            style.height = graphic.height + 'px';
            style.width = graphic.width + 'px';
            style.top = visuals.top || (function (conf) {
                if (conf.verticalAlignment.toLowerCase() === 'top') {
                    return conf.posY + 'px';
                } else if (conf.verticalAlignment.toLowerCase() === 'middle') {
                    return (conf.posY + conf.height / 2) + 'px';
                } else if (conf.verticalAlignment.toLowerCase() === 'bottom') {
                    return (conf.posY + conf.height) + 'px';
                }
            })(graphic);
            style.left = visuals.left || (function (conf) {
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
        // function to create dom elements
        createElement = function (type, options) {
            var appendTo = options.appendTo,
                _class = options.className,
                id = options.id,
                innerHTML = options.innerHTML,
                events = options.events,
                element = document.createElement(type),
                event;
            // set the class
            _class && (element.className = _class);
            // set the attributes
            id && (element.id = id);
            // add the innerHTML
            innerHTML && (element.innerHTML = innerHTML);
            if (events) {
                for (event in events) {
                    element.addEventListener(event, events[event]);
                }
            }
            // append to it's parent
            appendTo && appendTo.appendChild(element);
            return element;
        },
        // return the date object
        showDate = function (calendar, index) {
            var calendarInfo = calendar && calendar.calendarInfo,
                startingPos = calendarInfo.startingPos,
                pos = startingPos < 0 && (startingPos + 7) || startingPos,
                day = (index - pos + 1),
                selectedDate = calendarInfo.selectedDate,
                events = calendar.events;

            if (validateActive({
                day: day,
                month: selectedDate.month,
                year: selectedDate.year
            }, calendarInfo.rangeStart, calendarInfo.rangeEnd)) {
                // change the date
                selectedDate.day = day;
                setDate(calendar);
                events.onDateChange && events.onDateChange(selectedDate);
            }
        },
        // initailise calendar for the first time
        init = function (calendar) {
            var graphic = calendar.graphic,
                container = graphic.container = createElement('div', {appendTo: graphic.parentElement,
                 className: 'calendar-container', id: calendar.id}),
                dayElements = graphic.dayElements = [],
                weekElements = graphic.weekElements = [],
                spanElement = graphic.spanElement = [],
                calendarHeader = graphic.calendarHeader = createElement('div', {appendTo: container, className: 'month'}),
                headerMonthUl = graphic.headerMonthUl = createElement('ul', {appendTo: calendarHeader, className: 'month-ul'}),
                headerMonthLi = graphic.headerMonthLi = createElement('li', {appendTo: headerMonthUl, className: 'month-li'}),
                headerYearLi = graphic.headerYearLi = createElement('li', {appendTo: headerMonthUl, className: 'year-li'}),
                weekDays = graphic.weekDays = createElement('ul', {appendTo: container, className: 'weekdays'}),
                days = graphic.days = graphic.dayCell = createElement('ul', {appendTo: container, className: 'days'}),
                element,
                dateSpan,
                i,
                callback = function (index) {
                    return function () {
                        showDate(calendar, index);
                    };
                };

            graphic.nextMon = createElement('li', {appendTo:headerMonthLi, className: 'next',
             innerHTML: '&#10095;', events: {
                click: function () {
                    var nextMonth = (calendar.calendarInfo.active && calendar.calendarInfo.active.month) + 1,
                        year = calendar.calendarInfo.active && calendar.calendarInfo.active.year;
                    if (nextMonth > 12) {
                        nextMonth = 1;
                        year++;
                    }
                    info.moveToNext = true;
                    calendar.configure({
                        active: {
                            month: nextMonth,
                            year: year
                        }
                    });
                }
             }});
            graphic.nextYear = createElement('li', {appendTo:headerYearLi, className: 'next',
             innerHTML: '&#10095;', events: {
                click: function () {
                    info.moveToNext = true;
                    calendar.configure({
                        active: {
                            year: (calendar.calendarInfo.active && calendar.calendarInfo.active.year) + 1,
                            month: (calendar.calendarInfo.active && calendar.calendarInfo.active.month)
                        }
                    });
                }
             }});
            graphic.prevYear = createElement('li', {appendTo:headerYearLi, className: 'prev',
             innerHTML: '&#10094;', events: {
                click: function () {
                    info.moveToNext = false;
                    calendar.configure({
                        active: {
                            year: (calendar.calendarInfo.active && calendar.calendarInfo.active.year) - 1,
                            month: (calendar.calendarInfo.active && calendar.calendarInfo.active.month)
                        }
                    });
                }
             }});
            graphic.prevMon = createElement('li', {appendTo:headerMonthLi, className: 'prev',
             innerHTML: '&#10094;', events: {
                click: function () {
                    var nextMonth = (calendar.calendarInfo.active && calendar.calendarInfo.active.month) - 1,
                        year = calendar.calendarInfo.active && calendar.calendarInfo.active.year;
                    if (nextMonth < 1) {
                        nextMonth = 12;
                        year--;
                    }
                    info.moveToNext = false;
                    calendar.configure({
                        active: {
                            month: nextMonth,
                            year: year
                        }
                    });
                }
             }});
            graphic.monthStr = createElement('span', {appendTo: headerMonthLi, className: 'monthStr'});
            graphic.yearStr = createElement('span', {appendTo: headerYearLi, className: 'yearStr'});

            for (i = 0; i < 7; i++) {
                // create week elements
                element = createElement('li', {appendTo: weekDays, className: weekDays});
                weekElements.push(element);
            }
            for (i = 0; i < 37; i++) {
                // create date elements
                element = createElement('li', {appendTo: days, className: days, events: {
                    click: callback(i)
                }});
                dateSpan = createElement('span', {appendTo: element, className: 'normal'});
                spanElement.push(dateSpan);
                dayElements.push(element);
            }
        },
        // validate range start date
        validateRangeStart = function (date1, date2) {
            return (date2.month >= date1.month) && (date2.year >= date1.year);
        },
        // validate range End date
        validateRangeEnd = function (date1, date2) {
            return (date2.month <= date1.month) && (date2.year <= date1.year);
        },
        // validate active date
        validateActive = function (date, date1, date2) {
            var returntype = true,
                rangeEnd = date2 || 0,
                rangeStart = date1 || 0,
                nextMonth = date.month,
                nextYear = date.year,
                type1,
                type2;

            rangeEnd && (type1 = (nextMonth <= rangeEnd.month) && (nextYear <= rangeEnd.year));
            rangeStart && (type2 = (nextMonth >= rangeStart.month) && (nextYear >= rangeStart.year));

            if (rangeStart && rangeEnd) {
                returntype = type1 && type2;
            }
            else if (!rangeStart && rangeEnd) {
                // move backward with no issues
                // check move
                if (!info.moveToNext) {
                    returntype = true;
                } else {
                    returntype = (nextMonth > rangeEnd.month && nextYear < rangeEnd.year) || type1;
                }
            }
            else if (rangeStart && !rangeEnd) {
                // move forward with no issues
                // check move
                if (info.moveToNext) {
                    returntype = true;
                } else {
                    returntype = (nextMonth < rangeEnd.month && nextYear > rangeEnd.year) || type2;
                }
            }
            return returntype;
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
            weekStartingDay: 0
        };
        // create the elements for first time only
        init(calendar);
        // configure Calendar with initial config
        calendar.configure(config);
    };
    // configure calendar
    calendarProto.configure = function (_config) {
        var calendar = this,
            config = _config || {},
            graphic = calendar.graphic,
            events = calendar.events,
            calendarInfo = calendar.calendarInfo,
            displayDisabledMonth = calendarInfo.displayDisabledMonth,
            userEvents = config.events || {},
            parentElement,
            visuals = config.style,
            doRepaint = false;

        // set container
        if (config.container && (parentElement = document.getElementById(config.container))) {
            graphic.parentElement = parentElement;
            parentElement.appendChild(graphic.container);
        }
        // applying visual styles to the container
        visuals && validateStyle(calendar, visuals);
        // set events on date, month and year change
        typeof userEvents.onDateChange === 'function' && (events.onDateChange = userEvents.onDateChange);
        typeof userEvents.onYearChange === 'function' && (events.onYearChange = userEvents.onYearChange);
        typeof userEvents.onMonthChange === 'function' && (events.onMonthChange = userEvents.onMonthChange);
        // set calendar date
        if (config.selectedDate && validateDate(config.selectedDate)) {
            calendarInfo.selectedDate = config.selectedDate;
            // update the active month as well
            calendarInfo.active.month = calendarInfo.selectedDate.month;
            calendarInfo.active.year = calendarInfo.selectedDate.year;
            doRepaint = true;
        }
        // set active month
        if (config.active && validateActive(config.active, calendarInfo.rangeStart, calendarInfo.rangeEnd)
         && (calendarInfo.active.month !== config.active.month ||
            calendarInfo.active.year !== config.active.year)) {
            calendarInfo.active.month = config.active.month || calendarInfo.active.month;
            calendarInfo.active.year = config.active.year || calendarInfo.active.year;
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
        doRepaint && setDate(calendar);
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
