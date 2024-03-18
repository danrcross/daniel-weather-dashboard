# Daniel's Weather Dashboard

## Description

The goal of this app is to provide users with the current weather data & 5-day forecast for different cities. I want users to be able to visit a page and be able to search for any city in the world and find this data. I also want users to be able to revisit this page and find a list of the last 10 cities that they selected. They should be able to click on an item from this list and view the weather data for that city.

This app successfully fulfills these needs. From this project, I learned and practiced the following skills/concepts:

- Setting up an API key with an open source API.
- Using the 'fetch()' and '.this' methods to retrieve data from this API.
- Creating JS functionality that will sort through data from the API based on user input(s).
- In other words, traversing the object that is created from the data by viewing it in the console.
- Using a local .json file (provided by API's creator) to pull data related to the API.
- Reading/ utilizing the API's documentation on the web
- 'Regular expressions' in JS.
- More practice with jQuery syntax.
- More practice with local storage.

## Installation

Visit the site here: https://danrcross.github.io/daniel-weather-dashboard/

## Usage

Here are some screenshots demonstrating the app's functionality:


The main page when site is visited for first time:
![main-page](/assets/screenshots/main-page.png)

The site when a city is searched for:
![city-searched](/assets/screenshots/city-searched.png)

The site when a search result is selected:
![search-selected](/assets/screenshots/search-selected.png)

The site when a city has been saved and added to list; new search can be done:
![city-saved](/assets/screenshots/city-saved.png)

The local storage saves user's cities:
![local-storage](/assets/screenshots/local-storage.png)

The site when reloaded and cities are retrieved from local storage:
![storage-retrieved](/assets/screenshots/main-page.png)

The site when a saved city is selected:
![saved-selected](/assets/screenshots/saved-selected.png)



## Credits

Credit due to following APIs/ libraries and their documentation:

- Open Weather API: https://openweathermap.org/
- Day.js API: https://day.js.org/en/
- jQuery API: https://api.jquery.com/
- Bootstrap: https://getbootstrap.com/

## License

MIT License

Copyright (c) 2024 Daniel Cross

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
