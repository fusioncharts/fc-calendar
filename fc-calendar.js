var Calendar = (function() {
    var UNDEFINED = undefined,
    info = {
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthLabel: ['January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ]
    },
    checkLeapYear = function(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    },
    //get current local date
    getCurrentDate = function() {
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();

        dd < 10 && (dd = '0' + dd);
        mm < 10 && (mm = '0' + mm);
        return mm + '-' + dd + '-' + yyyy;
    },
    //apply custom style to the container
    setStyle = function(element, config) {
        var container;

        if (typeof element === 'object') {
            container = element;
        } else {
            container = document.getElementById(element);
        }
        for (var property in config) {
            if (config.hasOwnProperty(property)) {
                container.style[property] = config[property];
            }
        }
    },
    //Change the date to user input date
    setDate = function(date, calendarObj) {
        var calendar = calendarObj,
            calendarInfo = calendar.calendarInfo,
            config = calendar.config,
            timestamp = Date.parse(date);

        if (isNaN(timestamp) == false) {
            config.date = date;
            newDate = new Date(date);
            calendarInfo.currYear = newDate.getFullYear();
            calendarInfo.currMon = newDate.getMonth() + 1;
            calendarInfo.currDate = newDate.getDate();
            update(calendarObj);
        } else {
            //throw error invalid Date
        }
    },
    // returns the date that can be selectable
    getDateRange = function(_date, calendarObj) {
        var calendar = calendarObj,
            calendarInfo = calendar.calendarInfo,
            date = new Date(_date),
            date1 = calendarInfo.firstDate,
            date2 = calendarInfo.lastDate,
            tempDate;

        date1 > date2 && (tempDate = date1, date1 = date2, date2 = tempDate);
        return date1 <= date && date2 >= date;
    },
    //add event and apply custom functions to date
    addEvent = function(element, calendarObj, func) {
        var calendar = calendarObj,
            calendarInfo = calendar.calendarInfo,
            date,
            isRangeSet = !!calendarInfo.isRangeSet && !getDateRange(dateStr, calendarObj);
            callFun = func || function() {
                date = element.dateData;
                if (!isRangeSet){
                    date && setDate(date, calendar);
                    calendar.customFun && calendar.customFun(); 
                }
            };
        element.addEventListener('click', callFun);
    },
    //this function will update the calender
    //without re-drawing the elements
    update = function(calendarObj) {
        var calendar = calendarObj,
            calendarInfo = calendar.calendarInfo,
            config = calendar.config,
            graphic = config.graphic,
            dayElements = config.graphic.dayElements,
            weekElements = config.graphic.weekElements,
            headerMonthLi = config.graphic.headerMonthLi,
            headerYearLi = config.graphic.headerYearLi,
            dateSpan = config.graphic.spanElement,
            len = dayElements.length,
            currDate = calendarInfo.currDate,
            currMon = calendarInfo.currMon,
            currYear = calendarInfo.currYear,
            dateStr,
            startingOfMonth = new Date(currMon + '-01-' + currYear),
            weekDay = startingOfMonth.getDay() - calendarInfo.weekStartingDay,
            printDate,
            limit,
            monthStr = graphic.monthStr,
            yearStr = graphic.yearStr,
            isRangeSet,
            dateColor,
            className,
            i;

        weekDay < 0 && (weekDay += 7);
        currMon === 2 && checkLeapYear(currYear) ? i = 29 : i = 28;
        info.daysInMonth[1] = i;
        limit = info.daysInMonth[currMon - 1] + weekDay - 1;
        //month and year changed
        monthStr.innerHTML = info.monthLabel[currMon - 1];
        yearStr.innerHTML = currYear;
        //if calendar weeks have to repaint then do it
        if (calendarInfo.weekdayLabelChanged) {
            for (i = 0; i < 7; i++) {
                weekElements[i].innerHTML = info.tempWeekLabel[i];
            }
            calendarInfo.weekdayLabelChanged = false;
        }

        //repaint date elements
        for (i = 0; i < len; i++) {
            if (i < weekDay || i > limit) {
                dateSpan[i].innerHTML = '';
                dayElements[i].dateData = '';
                dateSpan[i].className = 'normal';
            } else {
                printDate = (i - weekDay + 1);
                dateStr = currMon + '-' + printDate + '-' + currYear;
                isRangeSet = !!calendarInfo.isRangeSet && !getDateRange(dateStr, calendarObj);
                printDate === currDate && !isRangeSet ? className = 'active' : className = 'normal';
                dateSpan[i].className = className;
                dateSpan[i].innerHTML = printDate;
                dayElements[i].dateData = dateStr;
                isRangeSet && (dateSpan[i].className = 'disabled');
            }
        }
    },
    init = function(_config) {
        var config = {},
            graphic = {},
            container = _config.container && document.getElementById(_config.container),
            cnt = info.containerCnt || (info.containerCnt = 0);

        config.posX = (_config.x || 0);
        config.posY = (_config.y || 0);
        config.verticalAlignment = _config.verticalalignment || 'top';
        config.horizontalAlignment = _config.horizontalalignment || 'left';
        config.container = container || createElement('div', 'calendar-container-' + cnt, document.body);
        config.date = _config.date || getCurrentDate();
        config.height = (_config.height || 200);
        config.width = (_config.width || 300);
        config.container.className += ' fc-calendar-container';

        graphic.position = config.position || 'relative';
        graphic.height = config.height + 'px';
        graphic.width = config.width + 'px';
        graphic.top = (function(conf) {
            if (conf.verticalAlignment.toLowerCase() === 'top') {
                return conf.posY + 'px';
            } else if (conf.verticalAlignment.toLowerCase() === 'middle') {
                return (conf.posY + conf.height / 2) + 'px';
            } else if (conf.verticalAlignment.toLowerCase() === 'bottom') {
                return (conf.posY + conf.height) + 'px';
            }
        })(config);
        graphic.left = (function(conf) {
            if (conf.horizontalAlignment.toLowerCase() === 'left') {
                return conf.posX + 'px';
            } else if (conf.horizontalAlignment.toLowerCase() === 'middle') {
                return (conf.posX + conf.width / 2) + 'px';
            } else if (conf.horizontalAlignment.toLowerCase() === 'right') {
                return (conf.posX + conf.width) + 'px';
            }
        })(config);

        config.graphic = graphic;
        setStyle(config.container, graphic);
        info.containerCnt++;
        return config;
    },
    //Re-arrange week labels
    arrangeWeekLabel = function(_day, calendarObj) {
        var weekdayLabel = info.weekLabel,
            calendar = calendarObj,
            calendarInfo = calendar.calendarInfo,
            startingDay = weekdayLabel.indexOf(_day),
            newWeekArr = [],
            i;
        for (i = startingDay; i < 7; i++) {
            newWeekArr.push(weekdayLabel[i]);
        }
        for (i = 0; i < startingDay; i++) {
            newWeekArr.push(weekdayLabel[i]);
        }
        info.tempWeekLabel = newWeekArr;
        calendarInfo.weekStartingDay = startingDay;
        calendarInfo.weekdayLabelChanged = true;
        update(calendar);
    },
    //changeDate on click
    changeDate = function(calendarObj) {
        var calendar = calendarObj,
            calendarInfo = calendar.calendarInfo,
            config = calendar.config,
            graphic = config.graphic,
            gotoPreviousMon = graphic.prevMon,
            gotoNextMon = graphic.nextMon,
            gotoPreviousYear = graphic.prevYear,
            gotoNextYear = graphic.nextYear,
            date,
            currDate,
            currMon,
            currYear,
            getCurrentDate = function() {
                date = new Date(config.date);
                currDate = calendarInfo.currDate;
                currMon = calendarInfo.currMon;
                currYear = calendarInfo.currYear;
            };

        gotoPreviousMon.addEventListener('click', function() {
            getCurrentDate();
            currMon--;
            currMon < 1 && (currMon = 12, currYear--);
            setDate((currMon + '-' + currDate + '-' + currYear), calendar);
        });

        gotoNextMon.addEventListener('click', function() {
            getCurrentDate();
            currMon++;
            currMon > 12 && (currMon = 1, currYear++);
            setDate((currMon + '-' + currDate + '-' + currYear), calendar);
        });

        gotoNextYear.addEventListener('click', function() {
            getCurrentDate();
            currYear++;
            setDate((currMon + '-' + currDate + '-' + currYear), calendar);
        });

        gotoPreviousYear.addEventListener('click', function() {
            getCurrentDate();
            currYear--;
            setDate((currMon + '-' + currDate + '-' + currYear), calendar);
        });
    },
    createElement = function (type, id, appendTo, val, _class) {
        var element = document.createElement(type),
            typeOfVal = typeof val;
        element.id = id,
            element.className = _class || id;

        if (typeOfVal === 'object') {
            element.appendChild(val);
        } else if (typeOfVal === 'string' || typeOfVal === 'number') {
            element.innerHTML = val;
        }
        appendTo && appendTo.appendChild(element);
        return element;
    },
    draw = function (calendarObj){
        var calendar = calendarObj,
            calendarInfo = calendar.calendarInfo,
            cnt = info.containerCnt,
            config = calendar.config,
            graphic = config.graphic,
            dayElements = [],
            weekElements = [],
            spanElement = [],
            container = config.container,
            date = new Date(config.date),
            currDate = calendarInfo.currDate = date.getDate(),
            currMon = calendarInfo.currMon = (date.getMonth() + 1),
            currYear = calendarInfo.currYear = date.getFullYear(),
            dateStr,
            nextMon = createElement('li', 'gotoNextMon ' + cnt, UNDEFINED, '&#10095;', 'next'),
            nextYear = createElement('li', 'gotoNextYear ' + cnt, UNDEFINED, '&#10095;', 'next'),
            prevYear = createElement('li', 'gotoPreviousYear ' + cnt, UNDEFINED, '&#10094;', 'prev'),
            prevMon = createElement('li', 'gotoPreviousMon ' + cnt, UNDEFINED, '&#10094;', 'prev'),
            monthStr = createElement('span', 'monthStr ' + cnt, UNDEFINED, info.monthLabel[currMon - 1]),
            yearStr = createElement('span', 'yearStr ' + cnt, UNDEFINED, currYear),
            calendarHeader = createElement('div', 'month ' + cnt, container),
            headerMonthUl = createElement('ul', 'month-ul ' + cnt, calendarHeader),
            headerMonthLi = createElement('li', 'month-li ' + cnt, headerMonthUl, ''),
            headerYearLi = createElement('li', 'year-li ' + cnt, headerMonthUl, ''),
            weekDays = createElement('ul', 'weekdays ' + cnt, container),
            days = config.dayCell = createElement('ul', 'days ' + cnt, container),
            startingOfMonth = new Date(currMon + '-01-' + currYear),
            weekDay = startingOfMonth.getDay(),
            printDate,
            limit = info.daysInMonth[currMon - 1] + weekDay - 1,
            element,
            isRangeSet,
            className,
            dateSpan,
            i;

            headerMonthLi.appendChild(prevMon);
            headerMonthLi.appendChild(monthStr);
            headerMonthLi.appendChild(nextMon);
            headerYearLi.appendChild(prevYear);
            headerYearLi.appendChild(yearStr);
            headerYearLi.appendChild(nextYear);
            checkLeapYear(currYear) && (info.daysInMonth[1] = 29);

            for (i = 0; i < 7; i++) {
                element = createElement('li', (i + '-weekdays ' + cnt), weekDays, info.weekLabel[i]);
                weekElements.push(element);
            }

            for (i = 0; i < 37; i++) {
                if (i < weekDay || i > limit) {
                    dateSpan = createElement('span', 'normal', UNDEFINED, '');
                    element.dateData = '';
                } else {
                    printDate = (i - weekDay + 1);
                    dateStr = currMon + '-' + printDate + '-' + currYear;
                    printDate === currDate ? className = 'active' : className = 'normal';
                    dateSpan = createElement('span', className, UNDEFINED, printDate);

                }
                element = createElement('li', 'dayElement-' + i + cnt, days, dateSpan, true);
                element.dateData = dateStr;
                addEvent(element, calendar);
                spanElement.push(dateSpan);
                dayElements.push(element);
            }
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
            changeDate(calendar);
            calendar.isCalendarDrawn = true;
            calendarInfo.weekStartingDay = 0;
    },
    calendarProto = Calendar.prototype;

    function Calendar(config) {
        var calendar = this;
        calendar.calendarInfo = {};
        calendar.config = init(config);
        draw(calendar);
    };
    //call show function show calendar
    calendarProto.show = function() {
        var calendar = this,
            calendarInfo = calendar.calendarInfo,
            config = calendar.config,
            container = config.container;
        if (calendar.isCalendarDrawn) {
            container.style.visibility = 'visible';
            container.style.opacity = '1';
        }
    };
    //call hide function to hide calendar
    calendarProto.hide = function() {
        var calendar = this,
            calendarInfo = calendar.calendarInfo,
            config = calendar.config,
            container = config.container;
        if (calendar.isCalendarDrawn) {
            container.style.visibility = 'hidden';
            container.style.opacity = '0';
        }
    };
    //returns the current or selected date
    calendarProto.getDate = function() {
        var calendar = this,
            config = calendar.config;
        return config.date;
    };
    calendarProto.setDate = function(date) {
        var calendar = this;
        setDate(date, calendar);
    };
    calendarProto.setDateRange = function(firstDate, lastDate) {
        var calendar = this;
            calendarInfo = calendar.calendarInfo,
        calendarInfo.firstDate = new Date(firstDate);
        calendarInfo.lastDate = new Date(lastDate);
        calendarInfo.isRangeSet = true;
        update(calendar);
    };
    calendarProto.startingDay = function(day) {
        var calendar = this;
        arrangeWeekLabel(day, calendar);
    };
    calendarProto.onClick = function(defination) {
        calendar.customFun = defination;
    };
    return Calendar;
})();