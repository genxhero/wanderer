import React from "react";
import {Link} from "react-router-dom";
const google = window.google;
const mapIcons = window.mapIcons;



// === A method which returns an array of GLatLngs of points a given interval along the path ===
google.maps.LatLng.prototype.distanceFrom = function(newLatLng) {
  var EarthRadiusMeters = 6378137.0; // meters
  var lat1 = this.lat();
  var lon1 = this.lng();
  var lat2 = newLatLng.lat();
  var lon2 = newLatLng.lng();
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = EarthRadiusMeters * c;
  return d;
};

google.maps.Polyline.prototype.GetPointsAtDistance = function (metres) {
    var next = metres;
    var points = [];
    // some awkward special cases
    if (metres <= 0) return points;
    var dist = 0;
    var olddist = 0;
    for (var i = 1; (i < this.getPath().getLength()); i++) {
        olddist = dist;
        dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));

        while (dist > next) {
            var p1 = this.getPath().getAt(i - 1);
            var p2 = this.getPath().getAt(i);
            var m = (next - olddist) / (dist - olddist);
            points.push(new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
            next += metres;
        }
    }
    return points;
}

// google.maps.Polyline.prototype.GetPointsAtDistance = google.maps.Polygon.prototype.GetPointsAtDistance;


class GasPaneBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curLocation: {},
            destination: {lat: 41.8781, lng: -87.6298},
            maxDistance: 2605846,
            distanceToHotel: 304672,
            distanceToFood: 402336
        }

        this.initMap = this.initMap.bind(this);
        this.callback = this.callback.bind(this);
        this.createMarker = this.createMarker.bind(this);
        this.map = null;
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
        this.showSteps = this.showSteps.bind(this);
        this.attachInstructionText = this.attachInstructionText.bind(this);
        this.results = [];
        this.carMeMaybe = this.carMeMaybe.bind(this);
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, error => console.log(error));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        
    }

    showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        let curLocation = new google.maps.LatLng(lat, lng);
         
        this.setState({curLocation: curLocation});
        this.initMap();

        console.log(this.state);
    }



    initMap() {

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.state.curLocation,
            zoom: 13,
            styles: [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{ color: '#263c3f' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#6b9a76' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#38414e' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#212a37' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#9ca5b3' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{ color: '#746855' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#1f2835' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#f3d19c' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{ color: '#2f3948' }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#17263c' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#515c6d' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#17263c' }]
                }
            ]
        });

        this.map.setCenter(this.state.curLocation);

        new google.maps.Marker({
            map: this.map,
            position: this.state.curLocation
        });

        var markerArray = [];
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});

        this.calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, this.map);

    }

    calculateAndDisplayRoute(directionsDisplay, directionsService,
        markerArray, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
            origin: this.state.curLocation,
            destination: this.state.destination,
            travelMode: 'DRIVING'
        }, (response, status) => {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                this.showSteps(response, markerArray, map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    showSteps(directionResult, markerArray, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        var passedDistance = 0;
        let stop_for_gas = {};
        let hotelIndex = 0; 
        let foodIndex = 0; 
        var find_gas = false;
        var find_hotel = false;
        var find_food = false;
        for (var i = 0; i < myRoute.steps.length; i++) {
            // var marker = markerArray[i] || new google.maps.Marker();
            if (find_gas == false && passedDistance >= this.state.maxDistance) {
                if (myRoute.steps[i-1].distance.value > 10000) {
                    var poly = new google.maps.Polyline({
                         map: this.map,
                         path: [myRoute.steps[i-1].start_location, myRoute.steps[i].start_location]
                    });

                    var points = poly.GetPointsAtDistance(5000);

                    console.log("points", points);
                    
                    for (var k = 0; k < points.length; k++) {
                        if (passedDistance + 5000*k > this.state.maxDistance){                        
                            var pmarker = new google.maps.Marker();
                            pmarker.setMap(this.map);
                            pmarker.setPosition(points[k]);
                            this.attachInstructionText(pmarker, "refuel!!!", this.map);
                            stop_for_gas = points[k];
                            find_gas = true;
                            break;
                        }
                    }
                } else {
                    var marker = new google.maps.Marker();
                    // refuelIndex = i;
                    stop_for_gas = myRoute.steps[i].start_location;
                    marker.setMap(map);
                    marker.setPosition(myRoute.steps[i].start_location);
                    this.attachInstructionText(marker, "refuel!!!", map);
                    find_gas = true;
                }

            }
            passedDistance += myRoute.steps[i].distance.value;

            // if (find_hotel == false && passedDistance >= this.state.distanceToHotel) {
            //   var marker = new google.maps.Marker();
            //   hotelIndex = i;
            //   marker.setMap(map);
            //   marker.setPosition(myRoute.steps[i].start_location);
            //   this.attachInstructionText(marker, "Have a rest!!!", map);
            //   find_hotel = true;
            // }

            // if (find_food == false && passedDistance >= this.state.distanceToFood) {
            //   var marker = new google.maps.Marker();
            //   foodIndex = i;
            //   marker.setMap(map);
            //   marker.setPosition(myRoute.steps[i].start_location);
            //   this.attachInstructionText(marker, "Have a meal!!!", map);
            //   find_food = true;
            // }

        }

        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch({ 
            location: stop_for_gas, 
            radius: 8000, 
            type: ["gas_station"] 
        },this.callback);

        // service.nearbySearch({ 
        //     location: myRoute.steps[hotelIndex].start_location, 
        //     radius: 8000, 
        //     type: ["lodging"] 
        // },this.callback);

        // service.nearbySearch({
        //     location: myRoute.steps[foodIndex].start_location,
        //     radius: 8000,
        //     type: ["restaurant"]
        // },this.callback);
    }

    attachInstructionText(marker, text, map) {
        let infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', () => {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            infowindow.setContent(text);
            infowindow.open(map, marker);
        });
    }

    callback(results, status) {
        console.log("results", results);
        console.log("status", status);

        if (status === google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < results.length; i++) {

                this.createMarker(results[i],);
            }
        }
    }


    createMarker(place) {
        let markerType = ''
        if (place.types.includes('gas_station')) {
            markerType = 'gas_station';
        } else if (place.types.includes("restaurant")) {
            markerType = 'food';
        } else if (place.types.includes("lodging")) {
            markerType = 'hotel';
        } else {
            return;
        }
        const categoryMarkers = { 
            food: { 
                icon: '<span class="map-icon map-icon-restaurant"></span>', 
                color: "#00CCBB" 
            }, 
            gas_station: { 
                icon: '<span class="map-icon map-icon-gas-station"></span>',
                color: "black"
            },
            hotel: {
                icon: '<span class="map-icon map-icon-lodging"></span>',
                color: "#0E77E9"
            }
        };


        var marker = new mapIcons.Marker({
          position: place.geometry.location,
          map: this.map,
          icon: {
            path: mapIcons.shapes.SQUARE_ROUNDED,
            fillColor: categoryMarkers[markerType].color,
            fillOpacity: 1,
            strokeColor: "",
            strokeWeight: 0,
            scale: 9 / 10
          },
          map_icon_label:categoryMarkers[markerType].icon
        });
        // var marker = new google.maps.Marker({
        //     map: this.map,
        //     position: place.geometry.location
        // });
        let infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(markerType);
            infowindow.open(this.map, this);
        });
    }

    carMeMaybe(){
        return (
            <Link className="gaspane-return-link" to={this.props.currentUser.id ? "/vehicles" : "/addvehicle"}>Back to the Garage</Link>
        );
    }

    render() {
        console.log(this.props.vehicles.cityMpg);
        let avgmpg = (parseInt(this.props.vehicles.hwyMpg) + parseInt(this.props.vehicles.cityMpg)) / 2;
        console.log(avgmpg);
       return (
           <div className="gas-pane-body">
                <div className="output-left">
                    <div className="output-head"> On the Road With</div>
                    <div className="output-data-container">
                       <div className="output-car-name">{this.props.vehicles.name}</div>
                       <div className="output-data"> Year: {this.props.vehicles.year} </div>
                       <div className="output-data">Make: {this.props.vehicles.make} </div>
                       <div className="output-data">Model: {this.props.vehicles.model} </div>
                       <div className="output-data">Average MPG: {avgmpg} </div>
                       <div className="output-data"> </div>
                    </div>
                    {this.carMeMaybe()}
                </div>
                <div id="map"></div>
                <div className="output-right"></div>
           </div>
       )
    }
}

export default GasPaneBody;