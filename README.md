# Neighborhood Map Udacity Project

## How to Use?

### Open index1.html in Browser and select your fav places accordingly from the given input box. Click on the markers for wikipedia links. Note that, if you want to know the foodie places you will have to select/click the place from the listbox.

## How to Load ?

### i) Insert your google Map API Key in the <script> bottom of the index1.html.

### ii) Open the index1.html in browser.

## Project Includes:

### 1) App.js

#### The main javascript file which include:

####	 i) Knockout.js: include observable array and compputed arrays which binds and keeps track on what user have given input in the textbox. Accordingly, the computed array is prepared and shown in the listbox and also respective markers are shown.  

####	ii)	Required Javascript API for Google Maps is included but not as observables they are bounded and displayed according to the user input in input text.

####	iii) Wikipedia links: When the user clicks on marker, related wikipedia links are generated and shown.This is done with the help of Ajax request to the following URL:

`var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';`

#### 	iii) includes function like 

#####		*initMap:	Initializes the map variable and set the zoom sizes and creates the marker for the locations given in the array named locations.
#####		*populateInfoWindow: It accepts the infowindow instance and marker as a parameter and generates the infowindow which includes the title itself, wikipedia link and location.
#####		*showInfo:	When the user click the city name or hits enter to text input after typing the city name, it generates the infowindow and jumps to the callback functions.This function takes the user selected city and search the nearby restaurants with radius of 6000 and generates the marker.

		``` self.service.nearbySearch({
              location: self.serv(),
              radius: 6000,
              type: ['restaurants']
            }, self.callback); ```
#####		*callback:  If the status is "OK"  then it is followed by restroMarker function.
#####		*restroMarker: It sets the position of marker and display the infowindow.


### 2) index1.html

#### Bootstrap and css is used for the UI and elements like <ul>,<input> etc are bounded with knockout.js variables. So, the data are shown with help of the attribute "data-bind=type: source".For Eg,

```
<input type="text" placeholder="Select your City" id="filter" class='form-control' data-bind="textInput: typedCity">

```


### Google Map API Services

#### API Key : (https://developers.google.com/maps/documentation/javascript/get-api-key)

#### Link for documentation by Google: (https://developers.google.com/maps/)


#### Libraries: Places:- This is basically used to search the nearby places based on the user selected city or any locality.
#### Link for documentation by Google: (https://developers.google.com/maps/documentation/javascript/places)


