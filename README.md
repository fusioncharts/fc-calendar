# fc-calendar

A lightweight calendar component for FusionCharts.

## Installation

Steps to use `fc-calendar`

1. Clone the repository.
    ```
    git clone https://github.com/fusioncharts/fc-calendar.git
    cd fc-calendar
    ```
2. Checkout to `master` branch
    ```
    git checkout master
    ```
3. Install dependencies
    ```
    npm install
    ```
4. Create a build
    ```
    npm run build
    ```
5. Use the build files from `dist` folder.


## Usage

fc-calendar can be imported directly from the build files and then can be instantiated.
```
import Calendar from 'dist/fc-calendar';

var calendar = new Calendar({
    // configurations. see next section
});
```

## Configurations

fc-calendar takes different configurations to allow users to modify/customize the calendar to their needs.
1. __selectedDate__: An object containing year, month and day depicting the current date. Months are 1-indexed.
    ```
    selectedDate: {
        day: 18,
        month: 1,
        year: 2019
    }
    ```
2. __rangeStart__: Denotes a starting date. All the dates before this date will be disabled.
    ```
    rangeStart: {
        day: 1,
        month: 1,
        year: 2017
    }
    ```
3. __rangeEnd__: Denotes a ending date. All the dates after this date will be disabled.
    ```
    rangeEnd: {
        day: 31,
        month: 12,
        year: 2020
    }
    ```
4. __weekLabel__: An array containing 7 strings which are shown as days of week.
    ```
    // show only initial character
    weekLabel: ['S', 'M', 'T', 'W', 'T', 'F', 'S',]
    
    // show first three characters
    weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    ```
5. __events__: Users have the option to listen to date change, month change and year change. The events property takes an object containing some or all of the following property.
    * *onDateChange*
    * *onMonthChange*
    * *onYearChange*
    ```
    events: {
        onDateChange: function (date) {
            // do something. date in parameter is the new date
        },
        onMonthChange: function (date) {
            // do something.
        },
        onYearChange: function (date) {
            // do something.
        },
    }
    ```
6. __container__: The parent container in which the calendar will be appended in DOM. It takes HTML `div` element only.
    ```
    container: <div></div>
    ```
7. __posX__: The x-coordinate of the top-left corner of calendar inside the container div.
8. __posY__: The y-coordinate of the top-left corner of calendar inside the container div.

## License

__MIT__

Copyright (c) 2016 FusionCharts Technologies  &lt;support@fusioncharts.com&gt;.