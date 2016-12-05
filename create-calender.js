
var CreateCalendar  = function (config){
	var calendar = this;
	calendar.style = config.style;
	calendar.container = config.container && document.getElementById(config.container);
	calendar.hideOnSelect = config.hideonselect === undefined ? false : config.hideonselect;
	calendar.isCalendarDrawn = false;
	calendar.isRangeSet = false;
	calendar.disabledDateColor = config.disabledDateColor || '#800000';
},
	calendarProto = CreateCalendar.prototype;

calendarProto.setup = function(){
	var calendar = this,
		calendarDisplay = calendar.visibity;
	calendar.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	calendar.weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	calendar.monthLabel = ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'];
    calendar.checkLeapYear = function(year){
        	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        };
    calendar.createUl = function (id, appendTo){
        	var ulElement = document.createElement('ul');
        	ulElement.id = id;
        	ulElement.className = id;
        	appendTo.appendChild(ulElement);
        	return ulElement;
        };
    calendar.createLi = function (id, appendTo, val, addEvent){
        	var liElement = document.createElement('li');
        	liElement.id = id;
        	liElement.className = id;

        	if(typeof val === 'object'){
        		liElement.appendChild(val);
        	}else{
        		liElement.innerHTML = val;
        	}

        	if(addEvent){
        		if(calendar.isRangeSet && !calendar.getRange(calendar.originalMonth + '-' + 
					liElement.textContent + '-' + calendar.originalYear)){
					liElement.style.color = '#ff00aa';
				}else{
					addEvent && liElement.addEventListener('click', function (){
						calendar.selectedDate = liElement.textContent + '-' + calendar.originalMonth + '-' + calendar.originalYear;
						calendar.customFun && calendar.customFun();
						calendar.hideOnSelect ? calendar.hide() : calendar.setData(calendar.selectedDate);
					});
				}
        	}

        	appendTo.appendChild(liElement);
        	return liElement;
        };
    calendar.createDiv = function (id, appendTo){
        	var divElement = document.createElement('div');
        	divElement.id = id;
        	divElement.className = id;
        	appendTo.appendChild(divElement);
        	return divElement;
        };
    calendar.createSpan = function (id, val){
        	var spanElement = document.createElement('span');
        	spanElement.id = id;
        	spanElement.className = id;
        	if(typeof val === 'object'){
        		spanElement.appendChild(val);
        	}else{
        		spanElement.innerHTML = val;
        	}
        	return spanElement;
        };
};

calendarProto.setData = function (data){
	var calendar = this,
		createDiv,
		splitedData = data.split('-'),
		num = Number,
		container,
		originalDate = calendar.originalDate = num(splitedData[0]),
		originalMonth = calendar.originalMonth = num(splitedData[1]),
		originalYear = calendar.originalYear = num(splitedData[2]);
		
		if(calendar.isCalendarDrawn){
			container = calendar.container || document.getElementById('calendar-container');
			calendar.show();
			if(calendar.dateStr !== data){
				calendar.dateStr = data;
				container.innerHTML = '';
				calendar.create();
				calendar.changeMonth(originalMonth, originalYear);
			}
		}else{
			calendar.dateStr = data;
			calendar.setup();
			createDiv = calendar.createDiv;
			container = calendar.container = createDiv('calendar-container', document.body);
			calendar.setStyle(container, calendar.style);
			calendar.create();
			calendar.changeMonth(originalMonth, originalYear);
		}
};

calendarProto.setStyle = function (element, config){
	var container,
		chooseNum = /\d+/g;
		config.height = config.height && Number((config.height).match(/\d+/)[0]) <= 200 ? '200px' : config.height;
		config.width = config.width && Number((config.width).match(/\d+/)[0]) <= 300 ? '300px' : config.width;

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
};

calendarProto.create = function (){
	var calendar = this,
		cDiv = calendar.createDiv,
		cLi = calendar.createLi,
		cUl = calendar.createUl,
		cSpan = calendar.createSpan,
		currDate = calendar.originalDate,
		currMon = calendar.originalMonth,
		currYear = calendar.originalYear,
		weekLabel = calendar.weekLabel,
		daysInMonth = calendar.daysInMonth,
		monthLabel = calendar.monthLabel,
		checkLeapYear = calendar.checkLeapYear,
		container = calendar.container,
		str1 = '<li class="prev" id="gotoPreviousMon">&#10094;</li>',
    	str2 = '<li class="next" id="gotoNextMon">&#10095;</li>',
		calendarHeader = calendar.calendarHeader || cDiv('month', container),
		headerMonthUl = cUl('month-ul', calendarHeader),
		headerMonthLi = cLi('month-li', headerMonthUl, str1 + monthLabel[currMon - 1] + str2 + '<br>' + currYear),
		weekDays = cUl('weekdays', container),
		days = cUl('days', container),
		startingOfMonth = new Date(currMon + '-01-' + currYear),
		weekDay = startingOfMonth.getDay(),
		i;

		checkLeapYear(currYear) ? daysInMonth[1] = 29 : daysInMonth[1] = 28;
		for(i = 0; i < 7; i++){
			cLi((i+'-weekdays'), weekdays, weekLabel[i]);
		}
		for(i = 0; i < weekDay; i++){
			cLi('blank-dates', days, '');
		}
		for(i = 1; i <= daysInMonth[currMon - 1]; i++){
			var displayDate;
			if(i === currDate){
				var choosed = cSpan('active', i);
				displayDate = cLi(('day-'+i), days, choosed, true);
			}else{
				displayDate = cLi(('day-'+i), days, i, true);
			}
		}

		calendar.isCalendarDrawn = true;
		calendar.container = document.getElementById('calendar-container');
};

calendarProto.changeMonth = function(mon, year){
	var calendar = this,
		next = document.getElementById('gotoNextMon'),
		prev = document.getElementById('gotoPreviousMon');
		next.style.cursor = 'pointer';
		prev.style.cursor = 'pointer';

		next.addEventListener('click', function(){
			mon++;
			if(mon > 12){
				mon = 1;
				year++;
			}
			calendar.setData('01-'+mon+'-'+year);
		});
		prev.addEventListener('click', function(){
			mon--;
			if(mon < 1){
				mon = 12;
				year--;
			}
			calendar.setData('01-'+mon+'-'+year);
		});
};

calendarProto.show = function(){
	var calendar = this,
		calendarObj = calendar.container;

	if(calendar.isCalendarDrawn){
		calendarObj.style.visibility = 'visible';
    	calendarObj.style.opacity = '1';
	}else{
		calendar.setData(calendar.getCurrentDate());
	}
};

calendarProto.getCurrentDate = function (){
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
};

calendarProto.hide = function(){
	var calendar = this,
		calendarObj = calendar.container;
	calendarObj.style.visibility = 'hidden';
    calendarObj.style.opacity = '0';
    calendarObj.style.transition = 'visibility 0.2s, opacity 0.2s linear';
};

calendarProto.onClick = function (defination){
	var calendar = this;
	calendar.customFun = defination;
};

calendarProto.getDate = function (){
	var calendar = this;
	return calendar.isCalendarDrawn ? calendar.selectedDate : 'select a date first';
};

calendarProto.setRange = function (minLimit, maxLimit){
	var calendar = this;
	calendar.startingDateLimit = new Date(minLimit);
	calendar.endingDateLimit = new Date(maxLimit);
	calendar.isRangeSet = true;
};

calendarProto.getRange = function (selectedDate){
	var calendar = this,
		selectedDate = new Date(selectedDate);
	return calendar.startingDateLimit <= selectedDate && calendar.endingDateLimit >= selectedDate;
};