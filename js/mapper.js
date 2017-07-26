var map;

// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 21.5645,
            lng: 72.9289
        },
        zoom: 11,
        mapTypeControl: false
    });
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

    var largeInfowindow = new google.maps.InfoWindow();
    document.getElementById('hide-listings').addEventListener('click', hideListings);
    document.getElementById('searchBtn').addEventListener('click', showPlaces);
    document.getElementById('searchList').addEventListener('click', showPlaces);

    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < locations.length; i++) {
        var stitle = locations[i].title;
        var sloc = locations[i].location;

        //console.log(selectedOpt);
        console.log(stitle);
        console.log(sloc);
        var marker = new google.maps.Marker({
            position: sloc,
            title: stitle,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

    }
    console.log(markers.length);


    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

    // This function will loop through the listings and hide them all.
}

function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        infowindow.marker = marker;

        //For wiki links:
        var $body = $('body');
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
        //return false;
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

function showPlaces() {
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
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    map.fitBounds(null);
}