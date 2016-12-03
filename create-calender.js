
var CreateCalender  = function (config){
	var calender = this;
	calender.style = config.style;
	calender.container = config.container && document.getElementById(config.container);
	calender.hideOnSelect = config.hideonselect === undefined ? false : config.hideonselect;
	calender.isCalenderDrawn = false;
	calender.isRangeSet = false;
},
	calenderProto = CreateCalender.prototype;

calenderProto.setup = function(){
	var calender = this,
		calenderDisplay = calender.visibity;
	calender.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	calender.weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	calender.monthLabel = ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'];
    calender.checkLeapYear = function(year){
        	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        };
    calender.createUL = function (id, appendTo){
        	var ulElement = document.createElement('ul');
        	ulElement.id = id;
        	ulElement.className = id;
        	appendTo.appendChild(ulElement);
        	return ulElement;
        };
    calender.craeteLI = function (id, appendTo, val, addEvent){
        	var liElement = document.createElement('li');
        	liElement.id = id;
        	liElement.className = id;

        	if(typeof val === 'object'){
        		liElement.appendChild(val);
        	}else{
        		liElement.innerHTML = val;
        	}

        	if(addEvent){
        		if(calender.isRangeSet && !calender.getRange(calender.originalMonth + '-' + 
					liElement.textContent + '-' + calender.originalYear)){
					liElement.style.color = '#ff00aa';
				}else{
					addEvent && liElement.addEventListener('click', function (){
						calender.selectedDate = liElement.textContent + '-' + calender.originalMonth + '-' + calender.originalYear;
						calender.customFun && calender.customFun();
						calender.hideOnSelect ? calender.hide() : calender.setData(calender.selectedDate);
					});
				}
        	}

        	appendTo.appendChild(liElement);
        	return liElement;
        };
    calender.createDIV = function (id, appendTo){
        	var divElement = document.createElement('div');
        	divElement.id = id;
        	divElement.className = id;
        	appendTo.appendChild(divElement);
        	return divElement;
        };
    calender.createSPAN = function (id, val){
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

calenderProto.setData = function (data){
	var calender = this,
		createDiv,
		splitedData = data.split('-'),
		num = Number,
		container,
		originalDate = calender.originalDate = num(splitedData[0]),
		originalMonth = calender.originalMonth = num(splitedData[1]),
		originalYear = calender.originalYear = num(splitedData[2]);
		
		if(calender.isCalenderDrawn){
			container = calender.container || document.getElementById('calender-container');
			calender.show();
			if(calender.dateStr !== data){
				calender.dateStr = data;
				container.innerHTML = '';
				calender.create();
				calender.changeMonth(originalMonth, originalYear);
			}
		}else{
			calender.dateStr = data;
			calender.setup();
			createDiv = calender.createDIV;
			container = calender.container = createDiv('calender-container', document.body);
			calender.setStyle(container, calender.style);
			calender.create();
			calender.changeMonth(originalMonth, originalYear);
		}
};

calenderProto.setStyle = function (element, config){
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

calenderProto.create = function (){
	var calender = this,
		cDiv = calender.createDIV,
		cLi = calender.craeteLI,
		cUl = calender.createUL,
		cSpan = calender.createSPAN,
		currDate = calender.originalDate,
		currMon = calender.originalMonth,
		currYear = calender.originalYear,
		weekLabel = calender.weekLabel,
		daysInMonth = calender.daysInMonth,
		monthLabel = calender.monthLabel,
		checkLeapYear = calender.checkLeapYear,
		container = calender.container,
		str1 = '<li class="prev" id="gotoPreviousMon">&#10094;</li>',
    	str2 = '<li class="next" id="gotoNextMon">&#10095;</li>',
		calenderHeader = calender.calenderHeader || cDiv('month', container),
		headerMonthUl = cUl('month-ul', calenderHeader),
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

		calender.isCalenderDrawn = true;
		calender.container = document.getElementById('calender-container');
};

calenderProto.changeMonth = function(mon, year){
	var calender = this,
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
			calender.setData('01-'+mon+'-'+year);
		});
		prev.addEventListener('click', function(){
			mon--;
			if(mon < 1){
				mon = 12;
				year--;
			}
			calender.setData('01-'+mon+'-'+year);
		});
};

calenderProto.show = function(){
	var calender = this,
		calenderObj = calender.container;

	if(calender.isCalenderDrawn){
		calenderObj.style.visibility = 'visible';
    	calenderObj.style.opacity = '1';
	}else{
		calender.setData(calender.getCurrentDate());
	}
};

calenderProto.getCurrentDate = function (){
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

calenderProto.hide = function(){
	var calender = this,
		calenderObj = calender.container;
	calenderObj.style.visibility = 'hidden';
    calenderObj.style.opacity = '0';
    calenderObj.style.transition = 'visibility 0.2s, opacity 0.2s linear';
};

calenderProto.onClick = function (defination){
	var calender = this;
	calender.customFun = defination;
};

calenderProto.getDate = function (){
	var calender = this;
	return calender.isCalenderDrawn ? calender.selectedDate : 'select a date first';
};

calenderProto.setRange = function (minLimit, maxLimit){
	var calender = this;
	calender.startingDateLimit = new Date(minLimit);
	calender.endingDateLimit = new Date(maxLimit);
	calender.isRangeSet = true;
};

calenderProto.getRange = function (selectedDate){
	var calender = this,
		selectedDate = new Date(selectedDate);
	return calender.startingDateLimit <= selectedDate && calender.endingDateLimit >= selectedDate;
};