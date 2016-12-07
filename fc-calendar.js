var Calendar = ( function Calendar(){
	var _private = {
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

		weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

		monthLabel: ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'],

        createElement: function (type, id, appendTo, val){
        	var element = document.createElement(type),
        		typeOfVal = typeof val;
        		element.id = id,
        		element.className = id;

        	if(typeOfVal === 'object'){
        		element.appendChild(val);
        	}else if(typeOfVal === 'string' || typeOfVal === 'number'){
        		element.innerHTML = val;
        	}
        	appendTo && appendTo.appendChild(element);
        	return element;
        },

        addEvent: function(element, func){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo,
        		date = element.dateData,
                callFun = func || function (){
                    date = element.dateData;
                    if(calendarInfo.isRangeSet && !privateFun.getDateRange(date)){
                        
                    }else{
                        date && privateFun.setDate(date);
                        privateFun.customFun && privateFun.customFun();
                    }
                };

        	element.addEventListener('click', callFun);
        },

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

		checkLeapYear: function(year){
        	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        },

        init: function(_config){
        	var privateFun = this,
        		config = {},
        		graphic = {};
        	
        	config.posX = (_config.x || 0);
        	config.posY = (_config.y || 0);
        	config.verticalAlignment = _config.verticalalignment || 'top';
        	config.horizontalAlignment = _config.horizontalalignment || 'left';
        	config.container = _config.container || privateFun.createElement('div','calendar-container', document.body);
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
        //containg private members of calender
        calendarInfo: {},

        changeDate: function (){
            var privateFun = this,
                calendarInfo = privateFun.calendarInfo,
                currDate = calendarInfo.currDate,
                currMon = calendarInfo.currMon,
                currYear = calendarInfo.currYear,
                gotoPreviousMon = document.getElementById('gotoPreviousMon'),
                gotoNextMon = document.getElementById('gotoNextMon'),
                gotoPreviousYear = document.getElementById('gotoPreviousYear'),
                gotoNextYear = document.getElementById('gotoNextYear');

                gotoPreviousMon.addEventListener('click', function(){
                    currMon--;
                    if(currMon < 1){
                        currMon = 12;
                        currYear--;
                    }
                    privateFun.setDate(currMon + '-'+ currDate +'-'+currYear);
                });

                gotoNextMon.addEventListener('click', function(){
                    currMon++;
                    if(currMon > 12){
                        currMon = 1;
                        currYear++;
                    }
                    privateFun.setDate(currMon + '-'+ currDate +'-'+currYear);
                });
                
                gotoNextYear.addEventListener('click', function(){
                    currYear++;
                    privateFun.setDate(currMon + '-'+ currDate +'-'+currYear);
                });
                
                gotoPreviousYear.addEventListener('click', function(){
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
                dayElements = config.graphic.dayElements,
                headerMonthLi = config.graphic.headerMonthLi,
                headerYearLi = config.graphic.headerYearLi,
                len = dayElements.length,
                currDate = calendarInfo.currDate,
                currMon = calendarInfo.currMon,
                currYear = calendarInfo.currYear,
                dateStr,
                startingOfMonth = new Date(currMon + '-01-' + currYear),
                weekDay = startingOfMonth.getDay(),
                printDate,
                limit = privateFun.daysInMonth[currMon - 1] + weekDay -1,
                i;

                headerMonthLi.innerHTML = privateFun.monthLabel[currMon - 1];
                headerYearLi.innerHTML = currYear;

            for(i = 0; i < len; i++){
                if(i < weekDay || i > limit){
                    dayElements[i].innerHTML = '';
                }else{
                    printDate = (i - weekDay + 1);
                    dateStr = currMon + '-' + printDate + '-' + currYear;
                    if(printDate === currDate){
                        var choosed = privateFun.createElement('span', 'active', undefined, printDate);
                        dayElements[i].innerHTML = '';
                        dayElements[i].appendChild(choosed);
                        dayElements[i].dateData = dateStr;
                    }else{
                        dayElements[i].innerHTML = printDate;
                        dayElements[i].dateData = dateStr;
                    }
                    if(privateFun.calendarInfo.isRangeSet && !privateFun.getDateRange(dateStr)){
                        dayElements[i].style.color = '#ff0000';
                    }
                }
            }
        },
        //function responsible for drawing the calendar-container
        draw: function (){
        	var privateFun = this,
        		calendar = privateFun.calendarInfo.calendar,
        		config = calendar.config,
                graphic = config.graphic,
                dayElements = [],
        		container = config.container,
        		date = new Date(config.date),
        		currDate = privateFun.calendarInfo.currDate = date.getDate(),
				currMon = privateFun.calendarInfo.currMon = (date.getMonth() + 1),
				currYear = privateFun.calendarInfo.currYear = date.getFullYear(),
                dateStr,
                str1 = '<li class="prev" id="gotoPreviousMon">&#10094;</li>',
                str2 = '<li class="next" id="gotoNextMon">&#10095;</li>',
                str3 = '<li class="prev" id="gotoPreviousYear">&#10094;</li>',
                str4 = '<li class="next" id="gotoNextYear">&#10095;</li>',
		    	calendarHeader = privateFun.createElement('div','month', container),
				headerMonthUl = privateFun.createElement('ul', 'month-ul', calendarHeader),
				headerMonthLi = privateFun.createElement('li', 'month-li', headerMonthUl, str1 + privateFun.monthLabel[currMon - 1] + str2),
                headerYearLi = privateFun.createElement('li', 'year-li', headerMonthUl, str3 + currYear + str4),
				weekDays = privateFun.createElement('ul', 'weekdays', container),
				days = config.dayCell = privateFun.createElement('ul', 'days', container),
				startingOfMonth = new Date(currMon + '-01-' + currYear),
				weekDay = startingOfMonth.getDay(),
				printDate,
				limit = privateFun.daysInMonth[currMon - 1] + weekDay -1,
				element,
				i;

			privateFun.checkLeapYear(currYear) ? privateFun.daysInMonth[1] = 29 :
			 privateFun.daysInMonth[1] = 28;

			for(i = 0; i < 7; i++){
				privateFun.createElement('li', (i+'-weekdays'), weekdays, privateFun.weekLabel[i]);
			}

			for(i = 0; i < 36; i++){
				if(i < weekDay || i > limit){
					element = privateFun.createElement('li','dayElement-' + i, days, '');
                    element.dateData = '';
				}else{
					printDate = (i - weekDay + 1);
                    dateStr = currMon + '-' + printDate + '-' + currYear;
					if(printDate === currDate){
						var choosed = privateFun.createElement('span', 'active', undefined, printDate);
						element = privateFun.createElement('li', 'dayElement-' + i, days, choosed, true);
                        element.dateData = dateStr;
					}else{
						element = privateFun.createElement('li', 'dayElement-' + i, days, printDate);
                        element.dateData = dateStr;
					}
                    if(privateFun.calendarInfo.isRangeSet && !privateFun.getDateRange(dateStr)){
                        element.style.color = '#ff0000';
                    }
				}
                privateFun.addEvent(element);
                dayElements.push(element);
			}
            graphic.dayElements = dayElements;
            graphic.headerMonthLi = headerMonthLi;
            graphic.headerYearLi = headerYearLi;
            privateFun.changeDate();
			calendar.isCalendarDrawn = true;
        },
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
        setDate: function(date){
        	var privateFun = this,
                calendarInfo = privateFun.calendarInfo,
        		calendar = calendarInfo.calendar,
        		config = calendar.config;
	     		config.date = date;
                newDate = new Date(date);
                calendarInfo.currYear = newDate.getFullYear();
                calendarInfo.currMon = newDate.getMonth()+1;
                calendarInfo.currDate = newDate.getDate();
                privateFun.update();

        },
        addDateRange: function (date1, date2){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo;
        		calendarInfo.firstDate = new Date(date1);
        		calendarInfo.lastDate = new Date(date2);
                calendarInfo.isRangeSet = true;		
        },
        getDateRange: function (_date){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo,
        		calendar = privateFun.calendarInfo.calendar,
        		conf = calendar.config,
        		date = new Date(_date),
        		date1 = calendarInfo.firstDate,
        		date2 = calendarInfo.lastDate,
                tempDate;
        		calendarInfo.isRangeSet = true;

                date1 > date2 && (tempDate = date1, date1 = date2, date2 = tempDate);
        		return date1 <= date && date2 >= date;
        }
	};

	return function CalendarConstructor(style){
		var calendar = this,
			config = calendar.config = _private.init(style);
		_private.calendarInfo.calendar = calendar;

		_private.draw(calendar);

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
		calendar.startingDay = function(){};
	};
})();