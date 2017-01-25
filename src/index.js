
require('./css/fc-calendar.css');

let idNo = 0;
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
    days: 'fc-cal-day',
    indexedDays: 'fc-cal-day-', // Index will be added at the end
    body: 'fc-cal-body',
    date: 'fc-cal-date',
    dateLI: 'fc-cal-date-li',
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
  remoVeClassName = (className, element) => {
    let classNames = element && element.className;
    if (classNames && className) {
      element.className = classNames.replace(new RegExp('(?:^|\\s*)' + className.trim() + '(?:\\s*|$)'), ' ');
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
          remoVeClassName(className, children[i]);
        }
      }
    }
  },
  // this function will update the calendar
  // without re-drawing the elements
  displayMonth = calendar => {
    const {info, graphic} = calendar,
      {active, rangeStart, rangeEnd, weekStartingDay, highlight, highlightClasses, showInactiveMonths} = info,
      {monthStr, yearStr, dateElements, container, prevMonth, nextMonth, prevYear, nextYear} = graphic,
      {month, year} = active,
      highlightMonth = highlight && highlight[year] && highlight[year][month],
      startingOfMonth = new Date(`${month}/1/${year}`),
      monthStaringDay = startingOfMonth.getDay(),
      monthStaringWeekDay = info.startingPos = (monthStaringDay - weekStartingDay) + (weekStartingDay <= monthStaringDay ? 0 : 7),
      totalDays = daysInMonth[month - 1] + (checkLeapYear(year) && month === 2 ? 1 : 0),
      limit = totalDays + monthStaringWeekDay,
      l = dateElements.length,
      startActive = validateActiveStart({day: 1, month, year}, rangeStart),
      endActive = validateActiveEnd({day: totalDays, month, year}, rangeEnd),
      startInactiveLimit = startActive ? 0 : (rangeStart.month === month && rangeStart.year === year ? rangeStart.day - 1 : totalDays),
      endInactiveLimit = endActive ? totalDays + 1 : (rangeEnd.month === month && rangeEnd.year === year ? rangeEnd.day + 1 : 1);
    let i, j, highlightInfo, highLightClass;

    // remove previously applied Classes
    removeClassInChilds(container, classNames.enabledDate);
    removeClassInChilds(container, classNames.selectedDate);
    removeClassInChilds(container, classNames.disabledDate);
    removeClassInChilds(container, classNames.navInactive);

    // make navigators inactive
    if (!showInactiveMonths) {
      if (!startActive) {
        prevMonth.className += SP + classNames.navInactive;
        prevYear.className += SP + classNames.navInactive;
      }
      if (!endActive) {
        nextMonth.className += SP + classNames.navInactive;
        nextYear.className += SP + classNames.navInactive;
      }
    }

    // remobve all highlight classes
    while (highlightClasses.length) {
      highLightClass = highlightClasses.pop();
      removeClassInChilds(container, highLightClass);
    }

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
        if (highlightInfo) {
          highLightClass = SP + classNames.highlightedDate;
          highlightInfo !== true && (highLightClass += SP + highlightInfo);
          highlightClasses.push(highLightClass);
        }
        dateElements[i].className += SP + (j <= startInactiveLimit || j >= endInactiveLimit ? classNames.disabledDate : classNames.enabledDate) + (highlightInfo ? (highLightClass) : BLANK);
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

    graphic.prevMonth = createElement('li', {
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
              year: year
            }
          });
        }
      }
    });
    graphic.monthStr = createElement('li', {
      appendTo: headerMonthUl,
      className: classNames.monthName
    });
    graphic.nextMonth = createElement('li', {
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
              year: year
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
        className: classNames.days + SP + classNames.indexedDays + i
      });
      dayElements.push(element);
    }
    for (let i = 0; i < 42; i++) {
      // create date elements
      element = createElement('li', {
        appendTo: days,
        className: classNames.dateLI
      });
      element = createElement('span', {
        appendTo: element,
        className: classNames.date + SP + classNames.dayCol + DASH + (i % 7),
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
            if (validateActiveStart(tempDate, info.rangeStart) && validateActiveEnd(tempDate, info.rangeEnd)) {
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
      hAlignment: 'left',
      highlightClasses: []
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
}
// attache to the window if availabel
if (window) {
  window.FusionCalendar = Calendar;
}
export default Calendar;
