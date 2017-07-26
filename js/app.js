 var locations = [{
         title: 'Anand',
         location: {
             lat: 22.5645,
             lng: 72.9289
         },
         subset: [{
             title: 'Madhuban Resort',
             loc: {
                 lat: 22.5393,
                 lng: 72.9414
             }
         }, {
             title: 'Shashtri Ground',
             loc: {
                 lat: 22.2953,
                 lng: 70.7997
             }
         }]
     },
     {
         title: 'Gandhidham',
         location: {
             lat: 23.0753,
             lng: 70.1337
         },
         subset: [{
             title: 'Radisson Hotel Kandla',
             loc: {
                 lat: 23.0856,
                 lng: 70.1083
             }
         }, {
             title: 'Hill Garden',
             loc: {
                 lat: 23.2381,
                 lng: 69.6422
             }
         }]
     },
     {
         title: 'Mumbai',
         location: {
             lat: 19.0760,
             lng: 72.8777
         },
         subset: [{
             title: 'Hotel Taj',
             loc: {
                 lat: 18.9217,
                 lng: 72.8330
             }
         }, {
             title: 'Adlabs Imagica',
             loc: {
                 lat: 20.0000,
                 lng: 76.0000
             }
         }]
     },
     {
         title: 'Surat',
         location: {
             lat: 21.1702,
             lng: 72.8311
         },
         subset: [{
             title: 'The Gateway Hotel',
             loc: {
                 lat: 21.1773,
                 lng: 72.7890
             }
         }, {
             title: 'Dutch Garden',
             loc: {
                 lat: 21.1992,
                 lng: 72.8155
             }
         }]
     },
     {
         title: 'Ahmedabad',
         location: {
             lat: 23.0225,
             lng: 72.5714
         },
         subset: [{
             title: 'TGB',
             loc: {
                 lat: 23.0425,
                 lng: 72.5154
             }
         }, {
             title: 'Riverfront',
             loc: {
                 lat: 23.0080,
                 lng: 72.5716
             }
         }]
     }
 ];
 var ViewModel = function() {
     this.location = ko.observableArray(locations);
     this.name = ko.observable("RAdhk");
     var self = this;
     this.selected = ko.observable('');
     showSubset = ko.observable(false);
     hideCities = ko.observable(true);
     this.subsets = ko.observableArray();
     self.cityFilter = function() {
         var sTITLE = this.selected().title;
         console.log(sTITLE);
         document.getElementById("hidden").innerHTML = sTITLE;
         //Clear array with the previous subsets displayed
         this.subsets([]);
         showSubset(true);
         hideCities(false);
         for (var i = 0; i < 5; i++) {
             //console.log("Hello I am hreeeee");
             if (locations[i].title === sTITLE) {
                 for (var j = 0; j < 2; j++) {
                     console.log("We passed");
                     this.subsets.push(locations[i].subset[j].title);
                 }
             }
         }
         showSubset(true);
         hideCities(false);
         self.showPlaces();
     };
     self.citySelect = function(title) {
         var listTITLE = title.title;
         self.selected(title);
         console.log("In city sleect" + title.title);
         self.cityFilter();
     };



         self.showPlaces=function () {
            //Resetting the markers array to null
            markers = [];

            /*Hidden variable in index1.html which stores the name of clicked place*/
            var selectedOpt = document.getElementById("hidden").innerHTML;
            var largeInfowindow = new google.maps.InfoWindow();
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < locations.length; i++) {
                if (selectedOpt === locations[i].title) {
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
                            id: j
                        });
                        // Push the marker to our array of markers.
                        markers.push(marker);
                        // Create an onclick event to open an infowindow at each marker.
                        marker.addListener('click', function() {
                            populateInfoWindow(this, largeInfowindow);
                        });
                    }
                }
            }
            console.log(markers.length);


            for (i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        }
// This function will loop through the listings and hide them all.
        self.hideListings=function() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            map.fitBounds(null);
        }

 };
 ko.applyBindings(new ViewModel());