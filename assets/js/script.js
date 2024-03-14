var APIkey = 'c17663a181f2ecd26b23fbbca20ec9b3'
// from https://openweathermap.org/forecast5
var cityListPath = 'assets/city-list/city.list.json'
var cityList
var searchForm = $('#city-search')
var resultsList = $('#search-results')
var cityNameDisplay = $('#city-name')
var curWeatherSection = $('#current-weather')
var conditionsList = $('#conditions-list')
var savedCities = $('#saved-cities')
var savedList = $('#saved-list')
var foreHeader = $('#fore-header')
var icon = $('.icon')
var weatherDataSection = $('#weather-data')
var degSym= '\u00B0'
var curWeatherData
var searchResult
// for debugging
var dataRef

// learned about regular expressions here; using to search for ID vs city name:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
// Indicates 7 consecutive digits in a string
var regexId = /\d{7}/


// ON LOAD:
// Fetch default weather (chicago)
fetchWeather('chicago')
// Fetch city list from local file
fetch(cityListPath)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        cityList = data
        console.log(cityList)
    })
// Load list of saved cities
loadCities()

function plugIcon(icon) {
    iconUrl = 'https://openweathermap.org/img/wn/' + icon + '.png'
}
// Plugs given city into URL
function plugCity(city) {
    weatherAPICustom = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey + '&units=imperial'
}
// Plugs given city id into URL
function plugCityId(id) {
    weatherAPICustom = 'https://api.openweathermap.org/data/2.5/forecast?id=' + id + '&appid=' + APIkey + '&units=imperial'
}

// Fetches the weather API data for the city in question
// function fetchWeather(city) {
//     console.log(city)
//     plugCity(city)
//     fetch(weatherAPICustom)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//         })
// }
// use of checking if city matches a regular expression inspired by this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
function fetchWeather(city) {
    // Stores value of 'city' as a string in the object 'checkType'
    var checkType = city.toString()
    // Checks if the string is a 7-digit number (a city ID is a 7-digit number); if not, it must be a city name
    if (checkType.match(regexId)) {
        // If yes, executes this function, which will create a custom API URL with the city ID
        plugCityId(city)
    } else {
        // If no, executes this function, which will create a custom API URL with the city name
        plugCity(city)
    }
    // Fetches the data from the URL that was constructed using the city name or ID (above)
    return fetch(weatherAPICustom)
        // Returns a response as a parsed version of the JSON data that was fetched.
        .then(function (response) {
            return response.json();
        })
}

// Need to create listener for search form
searchForm.submit(function (event) {
    event.preventDefault()
    resultsList.html('')
    console.log(resultsList.html(''))
    var searchInput = $('#city-search-input').val()
    if (!searchInput) {
        var newLi = $('<li>').text("Please enter the name of a city").css('font-style', 'italic').css('color', 'gray').addClass('list-group-item')
        resultsList.append(newLi)
        return
    }
    console.log(searchInput)
    // need to display a list of close matches
    cityList.forEach(function (city) {
        if (city.name.toLowerCase().includes(searchInput.toLowerCase()) === true) {
            if ((resultsList.children()).length >= 15) {
                return
            }
            if (city.state) {
                var newLi = $('<li>').text(city.name + ", " + city.state + ", " + city.country).attr("data-id", city.id)
                resultsList.append(newLi)
            } else {
                var newLi = $('<li>').text(city.name + ", " + city.country).attr("data-id", city.id)
                resultsList.append(newLi)
            }

            resultsList.children().addClass('search-result search-item list-group-item')
        } else {
            return
        }
    })
    if ((resultsList.children()).length === 0) {
        var newLi = $('<li>').text("No matches to display!").css('font-style', 'italic').css('color', 'gray').addClass('list-group-item')
        resultsList.append(newLi)
    } else {
        return
    }
})


resultsList.click(clickCity)
savedList.click(clickCity)

function clickCity(event) {
    var clicked = $(event.target)
    var clickedId = clicked.data('id')
    if (weatherDataSection.hasClass('collapse')) {
        weatherDataSection.removeClass('collapse')
    }
    if (clicked.hasClass('search-result')) {
        // Fetch weather data for the city that is clicked by user
        fetchWeather(clickedId)
            .then(function (data) {
                // for debug
                dataRef = data

                // Displays 5 next days' weather for this city
                dispForecast(data)
                // Display name of city (followed by state name and/or country name)
                dispCurCity(data)
                // Displays the current weather for this city
                dispCurWeather(data)
                if (clicked.hasClass('search-item')) {
                    saveCity(data)
                    loadCities()
                }

            })
        resultsList.html('')
    } else {
        console.log("not a result")
    }
}

function dispCurCity(data) {
    cityNameDisplay.text(data.city.name)
}

// TO DO: practice creating a complex object and doing .forEach
function dispCurWeather(data) {
    console.log(data)
    conditionsList.html('')
    var thisWeather = data.list[0]
    iconId = thisWeather.weather[0].icon
    var date = convertDate(thisWeather.dt_txt)
    var temp = "Temperature: " + thisWeather.main.temp  + " " + degSym + "F"
    var humidity = "Humidity: " + thisWeather.main.humidity + " %"
    var wind = "Wind: " + thisWeather.wind.speed + " MPH"
    plugIcon(iconId)
    var addIcon = $('<img>').attr('src', iconUrl)
    cityNameDisplay.append(" (" + date + ")")
    cityNameDisplay.append(addIcon)

    addConditionCur(temp)
    addConditionCur(humidity)
    addConditionCur(wind)
}

function addConditionCur(condition) {
    var listCondition = $('<li>').text(condition).addClass('list-group-item')
    conditionsList.append(listCondition)
}

function addConditionFore(condition, section) {
    var listCondition = $('<li>').text(condition).addClass('list-group-item')
    section.append(listCondition)
}

function getDay(data, item) {
    convertDate()

}

function dispForecast(data) {
    // plus 8 index each day. 
    // for day1
    console.log(data)
    var daysArray = []
    var noonishAdjust = calculateNoonHH(data)
    var nAdjustFormat = noonishAdjust + ':00:00'
    var currentDate = dayjs().format('MM/DD/YYYY')

    console.log(nAdjustFormat)
    while (daysArray.length < 5) {
        data.list.forEach(function (time) {
            var dataTime = time.dt_txt
            var date = convertDate(dataTime)
            if (((dataTime.includes(nAdjustFormat)) && (date !== currentDate)) || (data.list.indexOf(time) === 39)) {
                daysArray.push(time)

            } else {
            }
        })
    }
    var dayBoxes = [$('#day1'), $('#day2'), $('#day3'), $('#day4'), $('#day5')]
    var condLists = [$('#day1-conditions'), $('#day2-conditions'), $('#day3-conditions'), $('#day4-conditions'), $('#day5-conditions')]
    dayBoxes.forEach(function (section) {
        var index = dayBoxes.indexOf(section)
        var thisWeather = daysArray[index]
        iconId = thisWeather.weather[0].icon
        var date = convertDate(thisWeather.dt_txt)


        plugIcon(iconId)
        section.find('.fore-date').text(date)
        section.find('.icon').attr('src', iconUrl)

    })
    condLists.forEach(function (section) {
        var index = condLists.indexOf(section)
        section.html('')
        var thisWeather = daysArray[index]





        var temp = "Temp: " + thisWeather.main.temp + " " + degSym + "F"
        var humidity = "Humidity: " + thisWeather.main.humidity + " %"
        var wind = "Wind: " + thisWeather.wind.speed + " MPH"
        addConditionFore(temp, section)
        addConditionFore(humidity, section)
        addConditionFore(wind, section)
    })
    foreHeader.text('5-Day Forecast:')


}

function calculateNoonHH(data) {
    // timezone value is in seconds
    var cTZoneSec = data.city.timezone
    // translates to hours (divides by 60 twice)
    var cTZoneHrs = (cTZoneSec / 60) / 60
    console.log(cTZoneHrs)

    // Math.ceil will round up to the nearest integer if # is positive. Here, for example, if my number is 4: 4/3= 1.333. Rounded up would be 2. 2 multiplied by 3 would be 6, the closest multiple of 3 to 4, counting up.
    // Math.floor will round down if # is negative.
    // I need to round to a multiple of 3 because the times given are all multiples of 3.
    // I want to round in a direction that will give a greater difference from noon, and ultimately yield a result on the later side of noon, as this is the peak temperature of the day and seems best to represent a snapshot of the day's weather.
    var cTZoneRound
    if (cTZoneHrs >= 0) {
        cTZoneRound = (Math.ceil(cTZoneHrs / 3)) * 3
    } else {
        cTZoneRound = (Math.floor(cTZoneHrs / 3)) * 3
    }
    console.log(cTZoneRound)
    var noonAdjust = 15 - cTZoneRound
    return noonAdjust
}

function toStorage(storage, object) {
    return localStorage.setItem(storage, JSON.stringify(object))
}

function fromStorage(storage) {
    return JSON.parse(localStorage.getItem(storage))
}

function saveCity(chosen) {
    // gets array from storage OR creates empty array to be added to and stored
    var citiesArray = fromStorage("saved-cities") || []
    var cityData = {
        name: chosen.city.name + ', ' + chosen.city.country,
        id: chosen.city.id
    }
    citiesArray.unshift(cityData)
    if (citiesArray.length > 10) {
        citiesArray.pop()
    }
    toStorage("saved-cities", citiesArray)
}

function loadCities() {
    savedList.html('')
    var citiesArray = fromStorage("saved-cities") || []
    if (citiesArray.length > 0) {
        citiesArray.forEach(function (city) {
            // Create new <li> element, sets text content to name of city, gives class 'saved-city', adds attribute 'data-id' with value of cityId
            var newCityLi = $('<li></li>').text(city.name).attr('class', 'saved-city search-result btn btn-secondary my-1').attr('data-id', city.id)
            savedList.append(newCityLi)
        })
    }
}

function convertDate(date) {
    var newDate = dayjs(date).format('MM/DD/YYYY')
    return newDate
}