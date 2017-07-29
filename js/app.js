var locations=[
    {
         title: 'Anand',
         location: {
             lat: 22.5645,
             lng: 72.9289
         }
    },
    {
        title: 'Gandhidham',
         location: {
             lat: 23.0753,
             lng: 70.1337
         }
    },
    {
        title: 'Mumbai',
         location: {
             lat: 19.0760,
             lng: 72.8777
         }
    },
    {
        title: 'Mysore',
         location: {
             lat: 12.2958,
             lng: 76.6394
         }
    },
    {
        title: 'Anjar',
         location: {
             lat: 23.1135,
             lng: 70.0260
         }
    },
    {
        title: 'Amravati',
         location: {
             lat: 20.9374,
             lng: 77.7796
         }
    },
    {
        title: 'Pune',
         location: {
             lat: 18.5204,
             lng: 73.8567
         }
    },
    {
        title: 'Surat',
         location: {
             lat: 21.1702,
             lng: 72.8311
         }
    },
    {
        title: 'Ahmedabad',
         location: {
             lat: 23.0225,
             lng: 72.5714
         }
    },
    {
        title: 'Vadodara',
         location: {
             lat: 22.3072,
             lng: 73.1812
         }
    },
    {
        title: 'Rajkot',
         location: {
             lat: 22.3039,
             lng: 70.8022
         }
    }
];
var ViewModel = function() {

    var self=this;
    this.typedCity=ko.observable("");
    //this.focused=ko.observable(false);
    self.newLocation=ko.observableArray(locations);
    self.newLoc=ko.observableArray([]);
   // self.result1=ko.observableArray([]);


   /*The Map Things*/
    this.map = null;
    this.markers = [];
    this.largeInfowindow=null;



    this.initMap=function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 21.5645,
                lng: 72.9289
            },
            zoom: 11,
            zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT
            },
            mapTypeControl: false,
            fullscreenControl: true
        });

    

    if(google && google.maps){
        console.log('Google maps loaded');

        self.largeInfowindow = new google.maps.InfoWindow();
        this.bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < self.newLocation().length; i++) {
           

            var cityTitle = self.newLocation()[i].title;
            var cityLoc = self.newLocation()[i].location;

            //console.log(selectedOpt);
            this.marker = new google.maps.Marker({
                position: cityLoc,
                title: cityTitle,
                animation: google.maps.Animation.DROP,
                id: i,
                icon: {
                    url: 'img/radhi.png',
                    size: new google.maps.Size(25, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(12.5, 40)
                },
                shape: {
                    coords: [1, 25, -40, -25, 1],
                    type: 'poly'
                }
            });
            // Push the marker to our array of markers.
            self.markers.push(this.marker);

            // Create an onclick event to open an infowindow at each marker.
            this.marker.addListener('click', function() {
                self.populateInfoWindow(this, self.largeInfowindow);
            });

        }

        for (i = 0; i < self.markers.length; i++) {
            self.markers[i].setMap(self.map);
            this.bounds.extend(self.markers[i].position);
        }
        self.map.fitBounds(this.bounds);

        // This function will loop through the listings and hide them all.

        }

        else {
            console.log("Maps are not loaded");
            alert("Oops Cannot load Google Maps");
            $(".options-box").css("width","100%");
        }

    };
    this.initMap();

    self.newLocation = ko.computed(function() {
       self.newLoc([]);
        console.log(self.markers.length);
        for (var i = 0; i < self.markers.length; i++) {
            var currentCity = self.markers[i];
            if (currentCity.title.toLowerCase().startsWith(this.typedCity().toLowerCase())) {
                self.newLoc().push(currentCity);
                self.markers[i].setVisible(true);
            } else {
                self.markers[i].setVisible(false);
            }
        }

        return self.newLoc();
        }, this);

        self.populateInfoWindow=function(marker, infowindow) {
        console.log("HOlaa");
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.close();
             infowindow.marker = null;
            this.map.setCenter(marker.getPosition());

            var cityStr = marker.title;
            //var cityStr=$("#hidden").val();
            var $wikiElem = $('#wikipedia-links');
            // clear out old data before new request
            $wikiElem.text("");
            console.log("This is " + marker.title);
            var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
            var wikiRequestTimeout = setTimeout(function() {
                $wikiElem.text("failed to load wiki resources");
            }, 8000);

            $.ajax({
                url: wikiUrl,
                dataType: "jsonp",

                success: function(response) {
                    var articleList = response[1];
                    console.log(articleList.length);
                    if (articleList.length > 0) {
                        for (var i = 0; i < articleList.length; i++) {
                            articleStr = articleList[i];
                            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                            infowindow.setContent('<div id="form-container">' +
                                '<h2>' + marker.title + '  :)' + '</h2>' + '<p id="wikipedia-links" >' + 'Related Wikipedia link:<br/><a href=' + url + '>' +
                                url + '</a></p>' + '<h5>' + 'Location is:' + '<br/>' + marker.position + '</h5>' + '</div>');
                        }
                        clearTimeout(wikiRequestTimeout);

                    } else {
                        infowindow.setContent('<div id="form-container">' +
                            '<h2>' + marker.title + '  :)' + '</h2>' + '<p id="wikipedia-links" >' + ' Related Wikipedia link:<br/><a href=' + '>' +
                            'links not found' + '</a></p>' + '<h5>' + 'Location is:' + '<br/>' + marker.position + '</h5>' + '</div>');
                        clearTimeout(wikiRequestTimeout);
                    }
                }

        });
       
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
    };



        self.showInfo=function(title) {

            for(var i=0;i<self.markers.length;i++)
            {

              if(self.markers[i].title===title.title)
                {
                    console.log("Matched");
                    self.populateInfoWindow(self.markers[i],self.largeInfowindow);
                }
            }
        };


    };





 var initMap = function() {
    ko.applyBindings(new ViewModel());
};

     /*function populateInfoWindow(marker, infowindow) {
   
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.close();
         infowindow.marker = null;
        map.setCenter(marker.getPosition());

        var cityStr = marker.title;
        //var cityStr=$("#hidden").val();
        var $wikiElem = $('#wikipedia-links');
        // clear out old data before new request
        $wikiElem.text("");
        console.log("This is " + marker.title);
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
        var wikiRequestTimeout = setTimeout(function() {
            $wikiElem.text("failed to load wiki resources");
        }, 8000);

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",

            success: function(response) {
                var articleList = response[1];
                console.log(articleList.length);
                if (articleList.length > 0) {
                    for (var i = 0; i < articleList.length; i++) {
                        articleStr = articleList[i];
                        console.log("in populate");
                        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                        infowindow.setContent('<div id="form-container">' +
                            '<h2>' + marker.title + '  :)' + '</h2>' + '<p id="wikipedia-links" >' + 'Related Wikipedia link:<br/><a href=' + url + '>' +
                            url + '</a></p>' + '<h5>' + 'Location is:' + '<br/>' + marker.position + '</h5>' + '</div>');
                    }
                    clearTimeout(wikiRequestTimeout);

                } else {
                    infowindow.setContent('<div id="form-container">' +
                        '<h2>' + marker.title + '  :)' + '</h2>' + '<p id="wikipedia-links" >' + ' Related Wikipedia link:<br/><a href=' + '>' +
                        'links not found' + '</a></p>' + '<h5>' + 'Location is:' + '<br/>' + marker.position + '</h5>' + '</div>');
                    clearTimeout(wikiRequestTimeout);
                }
            }

        });
       
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}


     /*AutoComplete Code gets complete*/
     /*self.showPlaces = function() {
         //Resetting the markers array to null

         var markers = [];
         console.log("the marker array is ");
         console.log(markers.length);
         /*Hidden variable in index1.html which stores the name of clicked place*/

       /*  var largeInfowindow = new google.maps.InfoWindow();
         var bounds = new google.maps.LatLngBounds();

         for (var i = 0; i < locations.length; i++) {
             if (this.selected().title === locations[i].title) {
                 console.log("I am insideeeee");
                 for (var j = 0; j < 2; j++) {
                     var stitle = locations[i].subset[j].title;
                     var sloc = locations[i].subset[j].loc;

                     //console.log(selectedOpt);
                     console.log(stitle);
                     console.log(sloc);
                     var marker = new google.maps.Marker({
                         position: sloc,
                         title: stitle,
                         animation: google.maps.Animation.DROP,
                         id: j,
                         icon: {
                             url: 'img/radhi.png',
                             size: new google.maps.Size(25, 40),
                             origin: new google.maps.Point(0, 0),
                             anchor: new google.maps.Point(12.5, 40)
                         },
                         shape: {
                             coords: [1, 25, -40, -25, 1],
                             type: 'poly'
                         }
                     });
                     // Push the marker to our array of markers.
                     markers.push(marker);
                     console.log("The " + j + " element of markers " + markers[j].title);
                     // Create an onclick event to open an infowindow at each marker.
                     marker.addListener('click', function() {
                         populateInfoWindow(this, largeInfowindow);
                     });
                 }
             }
         }
         console.log("marker length is  " + markers.length);


         for (i = 0; i < markers.length; i++) {
             markers[i].setMap(map);
             bounds.extend(markers[i].position);
         }
         map.fitBounds(bounds);

     };

     self.hideListings = function() {
         console.log("length of marker is " + markers.length);
         for (var i = 0; i < markers.length; i++) {
             markers[i].setMap(null);
         }
         map.fitBounds(null);
     };*/
