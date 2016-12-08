var Calendar = ( function Calendar(){
	var _private = {
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

		weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

		monthLabel: ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'],
        //containg private members of calender
        calendarInfo: {},
        //create dom element
        createElement: function (type, id, appendTo, val, _class){
        	var element = document.createElement(type),
        		typeOfVal = typeof val;
        		element.id = id,
        		element.className = _class || id;

        	if(typeOfVal === 'object'){
        		element.appendChild(val);
        	}else if(typeOfVal === 'string' || typeOfVal === 'number'){
        		element.innerHTML = val;
        	}
        	appendTo && appendTo.appendChild(element);
        	return element;
        },
        //add event and apply custom functions to date
        addEvent: function(element, func){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo,
        		date,
                callFun = func || function (){
                    date = element.dateData;
                    if(calendarInfo.isRangeSet && !privateFun.getDateRange(date)){
                        //add function to the disabled date
                    }else{
                        date && privateFun.setDate(date);
                        privateFun.customFun && privateFun.customFun();
                    }
                };

        	element.addEventListener('click', callFun);
        },
        //apply custom style to the container
        setStyle: function (element, config){
			var container;

			if(typeof element === 'object'){
				container = element;
			}else{
				container = document.getElementById(element);
			}
			for (var property in config) {
			    if (config.hasOwnProperty(property)) {
			        container.style[property] = config[property];
			    }
			}
		},
        //get current local date
		getCurrentDate: function (){
			var today = new Date(),
				dd = today.getDate(),
				mm = today.getMonth()+1,
				yyyy = today.getFullYear();

			dd < 10 && (dd = '0' + dd);
			mm < 10 && (mm = '0' + mm);
			today = mm + '-' + dd + '-' + yyyy;
			return today;
		},
        //check if it is leap year
		checkLeapYear: function(year){
        	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        },
        //initialise calendar
        init: function(_conf){
        	var privateFun = this,
        		config = {},
        		graphic = {},
                _config = _conf.config,
                container = _config.container && document.getElementById(_config.container);

        	config.posX = (_config.x || 0);
        	config.posY = (_config.y || 0);
        	config.verticalAlignment = _config.verticalalignment || 'top';
        	config.horizontalAlignment = _config.horizontalalignment || 'left';
        	config.container = container || privateFun.createElement('div','calendar-container', document.body);
        	config.date = _config.date || privateFun.getCurrentDate();

        	graphic.position = config.position || 'relative';
        	graphic.height = (_config.height || 200) + 'px';
        	graphic.width = (_config.width || 300) + 'px';
        	graphic.top = (function(conf){
        			if(conf.verticalAlignment === 'top'){
        				return conf.posY + 'px';
        			}
        			else if (conf.verticalAlignment === 'middle'){
        				return (conf.posY + conf.height / 2) + 'px';
        			}
        			else if (conf.verticalAlignment === 'bottom'){
        				return (conf.posY + conf.height) + 'px';
        			}
	        	})(config);
	        graphic.left = (function(conf){
        			if(conf.horizontalAlignment === 'left'){
        				return conf.posX + 'px';
        			}
        			else if (conf.horizontalAlignment === 'middle'){
        				return (conf.posX + conf.width / 2) + 'px';
        			}
        			else if (conf.horizontalAlignment === 'right'){
        				return (conf.posX + conf.width) + 'px';
        			}
	        	})(config);

        	config.graphic = graphic;
        	privateFun.setStyle(config.container, graphic);
        	return config;
        },
        //changeDate on click
        changeDate: function (){
            var privateFun = this,
                calendarInfo = privateFun.calendarInfo,
                calendar = calendarInfo.calendar,
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
                getCurrentDate = function (){
                    date = new Date(config.date);
                    currDate = calendarInfo.currDate;
                    currMon = calendarInfo.currMon;
                    currYear = calendarInfo.currYear;
                };

                gotoPreviousMon.addEventListener('click', function(){
                    getCurrentDate();
                    currMon--;
                    currMon < 1 && (currMon = 12, currYear--);
                    privateFun.setDate(currMon + '-'+ currDate +'-'+currYear);
                });

                gotoNextMon.addEventListener('click', function(){
                    getCurrentDate();
                    currMon++;
                    currMon > 12 && (currMon = 1, currYear++);
                    privateFun.setDate(currMon + '-'+ currDate +'-'+currYear);
                });
                
                gotoNextYear.addEventListener('click', function(){
                    getCurrentDate();
                    currYear++;
                    privateFun.setDate(currMon + '-'+ currDate +'-'+currYear);
                });
                
                gotoPreviousYear.addEventListener('click', function(){
                    getCurrentDate();
                    currYear--;
                    privateFun.setDate(currMon + '-'+ currDate +'-'+currYear);
                });
        },
        //this function will update the calender
        //without re-drawing the elements
        update: function (){
            var privateFun = this,
                calendarInfo = privateFun.calendarInfo,
                calendar = calendarInfo.calendar,
                config = calendar.config,
                graphic = config.graphic,
                dayElements = config.graphic.dayElements,
                weekElements = config.graphic.weekElements,
                headerMonthLi = config.graphic.headerMonthLi,
                headerYearLi = config.graphic.headerYearLi,
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
                i;

            weekDay < 0 && (weekDay += 7);
            privateFun.checkLeapYear(currYear) ? i = 29 : i = 28;
            privateFun.daysInMonth[1] = i;
            limit = privateFun.daysInMonth[currMon - 1] + weekDay -1;
            //month and year changed
            monthStr.innerHTML = privateFun.monthLabel[currMon - 1];
            yearStr.innerHTML = currYear;
            //if calendar weeks have to repaint then do it
            if(calendarInfo.weekdayLabelChanged){
                for(i = 0; i < 7; i++){
                    weekElements[i].innerHTML = privateFun.weekLabel2[i];
                }
                calendarInfo.weekdayLabelChanged = false;
            }

            //repaint date elements
            for(i = 0; i < len; i++){
                if(i < weekDay || i > limit){
                    dayElements[i].innerHTML = '';
                }else{
                    printDate = (i - weekDay + 1);
                    dateStr = currMon + '-' + printDate + '-' + currYear;
                    isRangeSet = privateFun.calendarInfo.isRangeSet && privateFun.getDateRange(dateStr);
                    if(printDate === currDate && isRangeSet){
                        var choosed = privateFun.createElement('span', 'active', undefined, printDate);
                        dayElements[i].innerHTML = '';
                        dayElements[i].appendChild(choosed);
                    }else{
                        dayElements[i].innerHTML = printDate;
                    }
                    dayElements[i].dateData = dateStr;
                    !isRangeSet ? dateColor = '#777' : dateColor = '#ff0000';
                    dayElements[i].style.color = dateColor;
                }
            }
        },
        //function responsible for drawing the calendar-container
        draw: function (){
        	var privateFun = this,
                calendarInfo = privateFun.calendarInfo,
                calendar = calendarInfo.calendar,
        		config = calendar.config,
                graphic = config.graphic,
                dayElements = [],
                weekElements = [],
        		container = config.container,
        		date = new Date(config.date),
        		currDate = calendarInfo.currDate = date.getDate(),
				currMon = calendarInfo.currMon = (date.getMonth() + 1),
				currYear = calendarInfo.currYear = date.getFullYear(),
                dateStr,
                nextMon = privateFun.createElement('li','gotoNextMon', undefined, '&#10095;', 'next'),
                nextYear = privateFun.createElement('li','gotoNextYear', undefined, '&#10095;', 'next'),
                prevYear = privateFun.createElement('li','gotoPreviousYear', undefined, '&#10094;', 'prev'),
                prevMon = privateFun.createElement('li','gotoPreviousMon', undefined, '&#10094;', 'prev'),
                monthStr = privateFun.createElement('span','monthStr', undefined, privateFun.monthLabel[currMon - 1]),
                yearStr = privateFun.createElement('span','yearStr', undefined, currYear),
		    	calendarHeader = privateFun.createElement('div','month', container),
				headerMonthUl = privateFun.createElement('ul', 'month-ul', calendarHeader),
				headerMonthLi = privateFun.createElement('li', 'month-li', headerMonthUl, ''),
                headerYearLi = privateFun.createElement('li', 'year-li', headerMonthUl, ''),
				weekDays = privateFun.createElement('ul', 'weekdays', container),
				days = config.dayCell = privateFun.createElement('ul', 'days', container),
				startingOfMonth = new Date(currMon + '-01-' + currYear),
				weekDay = startingOfMonth.getDay(),
				printDate,
				limit = privateFun.daysInMonth[currMon - 1] + weekDay -1,
				element,
                isRangeSet,
                dateColor,
				i;

                headerMonthLi.appendChild(prevMon);
                headerMonthLi.appendChild(monthStr);
                headerMonthLi.appendChild(nextMon);
                headerYearLi.appendChild(prevYear)
                headerYearLi.appendChild(yearStr)
                headerYearLi.appendChild(nextYear)

			privateFun.checkLeapYear(currYear) && (privateFun.daysInMonth[1] = 29);

			for(i = 0; i < 7; i++){
				element = privateFun.createElement('li', (i+'-weekdays'), weekdays, privateFun.weekLabel[i]);
                weekElements.push(element);
			}

			for(i = 0; i < 37; i++){
				if(i < weekDay || i > limit){
					element = privateFun.createElement('li','dayElement-' + i, days, '');
                    element.dateData = '';
				}else{
					printDate = (i - weekDay + 1);
                    dateStr = currMon + '-' + printDate + '-' + currYear;
                    isRangeSet = privateFun.calendarInfo.isRangeSet && privateFun.getDateRange(dateStr);
					if(printDate === currDate){
						var choosed = privateFun.createElement('span', 'active', undefined, printDate);
						element = privateFun.createElement('li', 'dayElement-' + i, days, choosed, true);
                    }else{
						element = privateFun.createElement('li', 'dayElement-' + i, days, printDate);
					}
                    element.dateData = dateStr;
                    isRangeSet ? dateColor = '#ff0000' : dateColor = '#777';
                    element.style.color = dateColor;
				}
                privateFun.addEvent(element);
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
            privateFun.changeDate();
			calendar.isCalendarDrawn = true;
            calendarInfo.weekStartingDay = 0;
        },
        //shows the calender
        show: function(){
        	var privateFun = this,
        		calendar = privateFun.calendarInfo.calendar,
        		config = calendar.config,
        		container = config.container;
        	if(calendar.isCalendarDrawn){
				container.style.visibility = 'visible';
		    	container.style.opacity = '1';
			}
        },
        //hides the calender
        hide: function(){
        	var privateFun = this,
        		calendar = privateFun.calendarInfo.calendar,
        		config = calendar.config,
        		container = config.container;
        	if(calendar.isCalendarDrawn){
				container.style.visibility = 'hidden';
		    	container.style.opacity = '0';
			}
        },
        //Change the date to user input date
        setDate: function(date){
        	var privateFun = this,
                calendarInfo = privateFun.calendarInfo,
        		calendar = calendarInfo.calendar,
        		config = calendar.config,
                timestamp=Date.parse(date);

            if (isNaN(timestamp)==false)
            {
                config.date = date;
                newDate = new Date(date);
                calendarInfo.currYear = newDate.getFullYear();
                calendarInfo.currMon = newDate.getMonth()+1;
                calendarInfo.currDate = newDate.getDate();
                privateFun.update();
            }else{
                //throw error invalid Date
            }
        },
        //Adds the date range
        addDateRange: function (date1, date2){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo;
        		calendarInfo.firstDate = new Date(date1);
        		calendarInfo.lastDate = new Date(date2);
                calendarInfo.isRangeSet = true;  
        },
        // returns the date that can be selectable
        getDateRange: function (_date){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo,
        		date = new Date(_date),
        		date1 = calendarInfo.firstDate,
        		date2 = calendarInfo.lastDate,
                tempDate;
        		calendarInfo.isRangeSet = true;

                date1 > date2 && (tempDate = date1, date1 = date2, date2 = tempDate);
        		return date1 <= date && date2 >= date;
        },
        //Re-arrange week labels
        arrangeWeekLabel: function (_day){
            var privateFun = this,
                weekdayLabel = privateFun.weekLabel,
                calendarInfo = privateFun.calendarInfo,
                startingDay = weekdayLabel.indexOf(_day),
                newWeekArr = [],
                i;
            for(i = startingDay; i < 7; i++){
                newWeekArr.push(weekdayLabel[i]);
            }
            for(i = 0; i < startingDay; i++){
                newWeekArr.push(weekdayLabel[i]);
            }
            privateFun.weekLabel2 = newWeekArr;
            calendarInfo.weekStartingDay = startingDay;
            calendarInfo.weekdayLabelChanged = true;
            privateFun.update();
        }
	};

	return function CalendarConstructor(style){
		var calendar = this,
			config = calendar.config = _private.init(style);
		_private.calendarInfo.calendar = calendar;
		_private.draw();

		calendar.show = function(){ _private.show()};
		calendar.setDate = function(date){ _private.setDate(date)};
		calendar.getDate = function(){ return config.date;};
		calendar.setDateRange = function(firstDate, lastDate){
            _private.addDateRange(firstDate, lastDate);
		};
		calendar.onClick = function(defination){
			_private.customFun = defination;
		};
		calendar.hide = function(){ _private.hide()};
		calendar.startingDay = function(day){
            _private.arrangeWeekLabel(day)
        };
	};
})();