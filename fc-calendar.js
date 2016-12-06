var Calendar = ( function Calendar(){
	var _private = {
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

		weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

		monthLabel: ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'],

        createElement: function (type, id, appendTo, val){
        	!type ? console.log('create element type not defined') : undefined;
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

        addEvent: function(element){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo,
        		calendar = calendarInfo.calendar,
        		currYear = calendarInfo.currYear,
        		currMon = calendarInfo.currMon,
        		isRangeSet = calendarInfo.isRangeSet,
        		date;

        	element.addEventListener('click', function (){
        		date = element.textContent + '-' + currMon + '-' + currYear;
        		calendar.config.date = date;
        		privateFun.setDate(date);
        		if(isRangeSet && !privateFun.getDateRange()){

        		}else{
        			privateFun.customFun && privateFun.customFun();
        		}
        	});
        },

        setStyle: function (element, config){
			var container,
				chooseNum = /\d+/g;

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

			if(dd < 10){
			    dd = '0' + dd;
			} 
			if(mm < 10){
			    mm = '0' + mm;
			} 
			today = dd + '-' + mm + '-' + yyyy;
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

        calendarInfo: {

        },

        changeMonth: {

        },
        //this function will update the calender
        //without re-drawing the elements
        update: {

        },
        //function responsible for drawing the calendar-container
        draw: function(){
        	var privateFun = this,
        		calendar = privateFun.calendarInfo.calendar,
        		config = calendar.config,
        		container = config.container,
        		date = config.date,
        		chooseNum = /\d+/g,
				num = Number,
        		splitedDate = date.split('-'),
        		currDate = privateFun.calendarInfo.currDate = num(splitedDate[0]),
				currMon = privateFun.calendarInfo.currMon = num(splitedDate[1]),
				currYear = privateFun.calendarInfo.currYear = num(splitedDate[2]),
				str1 = '<li class="prev" id="gotoPreviousMon">&#10094;</li>',
		    	str2 = '<li class="next" id="gotoNextMon">&#10095;</li>',
		    	calendarHeader = privateFun.createElement('div','month', container),
				headerMonthUl = privateFun.createElement('ul', 'month-ul', calendarHeader),
				headerMonthLi = privateFun.createElement('li', 'month-li', headerMonthUl, str1 + 
					privateFun.monthLabel[currMon - 1] + str2 + '<br>' + currYear),
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
					privateFun.createElement('li',i , days, '');
				}else{
					printDate = (i - weekDay + 1);
					if(printDate === currDate){
						var choosed = privateFun.createElement('span', 'active', undefined, printDate);
						element = privateFun.createElement('li', 'dayElement' , days, choosed, true);
						privateFun.addEvent(element);
					}else{
						element = privateFun.createElement('li', 'dayElement' , days, printDate);
						privateFun.addEvent(element);
					}
				}
			}

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
        		calendar = privateFun.calendarInfo.calendar,
        		config = calendar.config;
    //     		num = Number,
    //     		splitedDate = date.split('-'),
    //     		currDate = num(splitedDate[0]),
				// currMon = num(splitedDate[1]),
				// currYear = num(splitedDate[2]),
				// days = config.dayCell,
				// startingOfMonth = new Date(currMon + '-01-' + currYear),
				// weekDay = startingOfMonth.getDay(),
				// printDate,
				// limit = privateFun.daysInMonth[currMon - 1] + weekDay,
				// i;
				// console.log(limit,config.date);
	     		config.date = date;
    //     		console.log(config.date);
        		
        		config.container.innerHTML = '';
        		privateFun.draw(calendar);

			// var dayElements = document.getElementsByClassName('dayElement');
		 //    for(i = 0; i < 36; i++){
		 //    	if(dayElements[i] === undefined){
		 //    		continue;
		 //    	}
			// 	if(i < weekDay || i >= limit){
			// 		dayElements[i].innerHTML = '';
			// 	}else{
			// 		printDate = (i - weekDay + 1);
			// 		if(printDate === currDate){
			// 			var choosed = privateFun.createElement('span', 'active', undefined, i);
			// 			//dayElements.appendChild(choosed);
			// 		}else{
			// 			dayElements[i].innerHTML = printDate;
			// 		}
			// 	}
			// }

        },
        addDateRange = function (date1, date2){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo;
        		calendarInfo.firstDate = new Date(date1);
        		calendarInfo.lastDate = new Date(date2);		
        },
        getDateRange = function (){
        	var privateFun = this,
        		calendarInfo = privateFun.calendarInfo,
        		calendar = privateFun.calendarInfo.calendar,
        		conf = calendar.config,
        		date = new Date(conf.date),
        		date1 = calendarInfo.firstDate,
        		date2 = calendarInfo.lastDate;
        		calendarInfo.isRangeSet = true;

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

		};
		calendar.onClick = function(defination){
			_private.customFun = defination;
		};
		calendar.hide = function(){ _private.hide()};
		calendar.startingDay = function(){};
		calendar.draw = function(){
			_private.draw();
		};
	};
})();