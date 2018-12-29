# Boba-FriedChicken

In this project for Udacity neighborhood Map project, I develop a single page application featuring a map of my neighborhood. You can easily find Boba Tea and Fried Chicken Shops around my home on this map. Google Map API and Foursquare API are used to display restaurants' info.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the App

In the project directory, you can run:
### `npm install`
to install the project dependencies
### `npm start`
to runs the app in the development mode.<br>
Note: The service worker doesn't work in the development mood but you can use the service worker in the production mood to cache the app.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## API and Library Used

### Google Map API and Library

This project used [react-google-maps](https://tomchentw.github.io/react-google-maps/) library to load Google map APIs and add Marker and InfoWindow components.

### Foursquare API

This project used Foursquare's [Places API](https://developer.foursquare.com/docs/api) to get restaurants' location, name, photo and rating information. The account tier I am currently using does has a restriction on my daily API usage. If the API calls exceed the quota, it will affect the APP in terms of showing the restaurant photo and rating.
