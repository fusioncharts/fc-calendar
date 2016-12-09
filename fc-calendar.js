var Calendar = (function() {
    var private = {
            daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

            weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

            monthLabel: ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'
            ],
            //create dom element
            createElement: function(type, id, appendTo, val, _class) {
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
            init: function(_config) {
                var privateFun = this,
                    config = {},
                    graphic = {},
                    container = _config.container && document.getElementById(_config.container),
                    cnt = privateFun.containerCnt || (privateFun.containerCnt = 0);

                config.posX = (_config.x || 0);
                config.posY = (_config.y || 0);
                config.verticalAlignment = _config.verticalalignment || 'top';
                config.horizontalAlignment = _config.horizontalalignment || 'left';
                config.container = container || privateFun.createElement('div', 'calendar-container-' + cnt, document.body);
                config.date = _config.date || privateFun.getCurrentDate();
                config.height = (_config.height || 200);
                config.width = (_config.width || 300);

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
                privateFun.setStyle(config.container, graphic);
                privateFun.containerCnt++;
                return config;
            },
            //get current local date
            getCurrentDate: function() {
                var today = new Date(),
                    dd = today.getDate(),
                    mm = today.getMonth() + 1,
                    yyyy = today.getFullYear();

                dd < 10 && (dd = '0' + dd);
                mm < 10 && (mm = '0' + mm);
                return mm + '-' + dd + '-' + yyyy;

            },
            //apply custom style to the container
            setStyle: function(element, config) {
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
            //add event and apply custom functions to date
            addEvent: function(element, calendarObj, func) {
                var privateFun = this,
                    calendar = calendarObj,
                    calendarInfo = calendar.calendarInfo,
                    date,
                    callFun = func || function() {
                        date = element.dateData;
                        if (calendarInfo.isRangeSet && !privateFun.getDateRange(date, calendarObj)) {
                            //add function to the disabled date
                        } else {
                            date && privateFun.setDate(date, calendar);
                            privateFun.customFun && privateFun.customFun();
                        }
                    };

                element.addEventListener('click', callFun);
            },
            //check if it is leap year
            checkLeapYear: function(year) {
                return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
            },
            //changeDate on click
            changeDate: function(calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
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
                    privateFun.setDate((currMon + '-' + currDate + '-' + currYear), calendar);
                });

                gotoNextMon.addEventListener('click', function() {
                    getCurrentDate();
                    currMon++;
                    currMon > 12 && (currMon = 1, currYear++);
                    privateFun.setDate((currMon + '-' + currDate + '-' + currYear), calendar);
                });

                gotoNextYear.addEventListener('click', function() {
                    getCurrentDate();
                    currYear++;
                    privateFun.setDate((currMon + '-' + currDate + '-' + currYear), calendar);
                });

                gotoPreviousYear.addEventListener('click', function() {
                    getCurrentDate();
                    currYear--;
                    privateFun.setDate((currMon + '-' + currDate + '-' + currYear), calendar);
                });
            },
            //this function will update the calender
            //without re-drawing the elements
            update: function(calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
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
                currMon === 2 && privateFun.checkLeapYear(currYear) ? i = 29 : i = 28;
                privateFun.daysInMonth[1] = i;
                limit = privateFun.daysInMonth[currMon - 1] + weekDay - 1;
                //month and year changed
                monthStr.innerHTML = privateFun.monthLabel[currMon - 1];
                yearStr.innerHTML = currYear;
                //if calendar weeks have to repaint then do it
                if (calendarInfo.weekdayLabelChanged) {
                    for (i = 0; i < 7; i++) {
                        weekElements[i].innerHTML = privateFun.tempWeekLabel[i];
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
                        isRangeSet = !!calendarInfo.isRangeSet && !privateFun.getDateRange(dateStr, calendarObj);
                        printDate === currDate && !isRangeSet ? className = 'active' : className = 'normal';
                        dateSpan[i].className = className;
                        dateSpan[i].innerHTML = printDate;
                        dayElements[i].dateData = dateStr;
                        isRangeSet && (dateSpan[i].className = 'disabled');
                    }
                }
            },
            //function responsible for drawing the calendar-container
            draw: function(calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
                    calendarInfo = calendar.calendarInfo,
                    cnt = privateFun.containerCnt,
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
                    nextMon = privateFun.createElement('li', 'gotoNextMon ' + cnt, undefined, '&#10095;', 'next'),
                    nextYear = privateFun.createElement('li', 'gotoNextYear ' + cnt, undefined, '&#10095;', 'next'),
                    prevYear = privateFun.createElement('li', 'gotoPreviousYear ' + cnt, undefined, '&#10094;', 'prev'),
                    prevMon = privateFun.createElement('li', 'gotoPreviousMon ' + cnt, undefined, '&#10094;', 'prev'),
                    monthStr = privateFun.createElement('span', 'monthStr ' + cnt, undefined, privateFun.monthLabel[currMon - 1]),
                    yearStr = privateFun.createElement('span', 'yearStr ' + cnt, undefined, currYear),
                    calendarHeader = privateFun.createElement('div', 'month ' + cnt, container),
                    headerMonthUl = privateFun.createElement('ul', 'month-ul ' + cnt, calendarHeader),
                    headerMonthLi = privateFun.createElement('li', 'month-li ' + cnt, headerMonthUl, ''),
                    headerYearLi = privateFun.createElement('li', 'year-li ' + cnt, headerMonthUl, ''),
                    weekDays = privateFun.createElement('ul', 'weekdays ' + cnt, container),
                    days = config.dayCell = privateFun.createElement('ul', 'days ' + cnt, container),
                    startingOfMonth = new Date(currMon + '-01-' + currYear),
                    weekDay = startingOfMonth.getDay(),
                    printDate,
                    limit = privateFun.daysInMonth[currMon - 1] + weekDay - 1,
                    element,
                    isRangeSet,
                    className,
                    dateSpan,
                    i;

                headerMonthLi.appendChild(prevMon);
                headerMonthLi.appendChild(monthStr);
                headerMonthLi.appendChild(nextMon);
                headerYearLi.appendChild(prevYear)
                headerYearLi.appendChild(yearStr)
                headerYearLi.appendChild(nextYear)

                privateFun.checkLeapYear(currYear) && (privateFun.daysInMonth[1] = 29);

                for (i = 0; i < 7; i++) {
                    element = privateFun.createElement('li', (i + '-weekdays ' + cnt), weekDays, privateFun.weekLabel[i]);
                    weekElements.push(element);
                }

                for (i = 0; i < 37; i++) {
                    if (i < weekDay || i > limit) {
                        dateSpan = privateFun.createElement('span', 'normal', undefined, '');
                        element.dateData = '';
                    } else {
                        printDate = (i - weekDay + 1);
                        dateStr = currMon + '-' + printDate + '-' + currYear;
                        printDate === currDate ? className = 'active' : className = 'normal';
                        dateSpan = privateFun.createElement('span', className, undefined, printDate);

                    }
                    element = privateFun.createElement('li', 'dayElement-' + i + cnt, days, dateSpan, true);
                    element.dateData = dateStr;
                    privateFun.addEvent(element, calendar);
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
                privateFun.changeDate(calendar);
                calendar.isCalendarDrawn = true;
                calendarInfo.weekStartingDay = 0;
            },
            //shows the calender
            show: function(calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
                    calendarInfo = calendar.calendarInfo,
                    config = calendar.config,
                    container = config.container;
                if (calendar.isCalendarDrawn) {
                    container.style.visibility = 'visible';
                    container.style.opacity = '1';
                }
            },
            //hides the calender
            hide: function(calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
                    calendarInfo = calendar.calendarInfo,
                    config = calendar.config,
                    container = config.container;
                if (calendar.isCalendarDrawn) {
                    container.style.visibility = 'hidden';
                    container.style.opacity = '0';
                }
            },
            //Change the date to user input date
            setDate: function(date, calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
                    calendarInfo = calendar.calendarInfo,
                    config = calendar.config,
                    timestamp = Date.parse(date);

                if (isNaN(timestamp) == false) {
                    config.date = date;
                    newDate = new Date(date);
                    calendarInfo.currYear = newDate.getFullYear();
                    calendarInfo.currMon = newDate.getMonth() + 1;
                    calendarInfo.currDate = newDate.getDate();
                    privateFun.update(calendarObj);
                } else {
                    //throw error invalid Date
                }
            },
            //Adds the date range
            addDateRange: function(date1, date2, calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
                    calendarInfo = calendar.calendarInfo;
                calendarInfo.firstDate = new Date(date1);
                calendarInfo.lastDate = new Date(date2);
                calendarInfo.isRangeSet = true;
            },
            // returns the date that can be selectable
            getDateRange: function(_date, calendarObj) {
                var privateFun = this,
                    calendar = calendarObj,
                    calendarInfo = calendar.calendarInfo,
                    date = new Date(_date),
                    date1 = calendarInfo.firstDate,
                    date2 = calendarInfo.lastDate,
                    tempDate;

                date1 > date2 && (tempDate = date1, date1 = date2, date2 = tempDate);
                return date1 <= date && date2 >= date;
            },
            //Re-arrange week labels
            arrangeWeekLabel: function(_day, calendarObj) {
                var privateFun = this,
                    weekdayLabel = privateFun.weekLabel,
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
                privateFun.tempWeekLabel = newWeekArr;
                calendarInfo.weekStartingDay = startingDay;
                calendarInfo.weekdayLabelChanged = true;
                privateFun.update(calendar);
            }
        },
        calendarProto = Calendar.prototype;

    function Calendar(config) {
        var calendar = this;
        calendar.calendarInfo = {};
        calendar.config = private.init(config);
        private.draw(calendar);
    };

    calendarProto.show = function() {
        var calendar = this;
        private.show(calendar);
    };
    calendarProto.hide = function() {
        var calendar = this;
        private.hide(calendar);
    };
    calendarProto.getDate = function() {
        var calendar = this,
            config = calendar.config;
        return config.date;
    };
    calendarProto.setDate = function(date) {
        var calendar = this;
        private.setDate(date, calendar);
    };
    calendarProto.setDateRange = function(firstDate, lastDate) {
        var calendar = this;
        private.addDateRange(firstDate, lastDate, calendar);
        private.update(calendar);
    };
    calendarProto.startingDay = function(day) {
        var calendar = this;
        private.arrangeWeekLabel(day, calendar);
    };
    calendarProto.onClick = function(defination) {
        private.customFun = defination;
    };
    return Calendar;
})();