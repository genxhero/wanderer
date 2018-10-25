import React from "react";
const google = window.google;

class GasPaneBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curLocation: {},
            destination: {lat: 37.335072, lng: -122.029399},
            maxDistance: 71800
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
        console.log(this.state.curLocation);

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.state.curLocation,
            zoom: 13
        });

        this.map.setCenter(this.state.curLocation);

        new google.maps.Marker({
            map: this.map,
            position: this.state.curLocation
        });

        var markerArray = [];
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
        var stepDisplay = new google.maps.InfoWindow();

        this.calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, this.map);

        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch({
            location: this.state.curLocation,
            radius: 1500,
            type: ['gas_station']
        }, this.callback);
    }

    calculateAndDisplayRoute(directionsDisplay, directionsService,
        markerArray, stepDisplay, map) {
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
                this.showSteps(response, markerArray, stepDisplay, map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        var passedDistance = 0;
        for (var i = 0; i < myRoute.steps.length; i++) {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker();
            passedDistance += myRoute.steps[i].distance.value;
            console.log(passedDistance);
            
            if (passedDistance + 1000 >= this.state.maxDistance) {
                myRoute.steps[i].instructions = "refuel!!!";
                marker.setMap(map);
                marker.setPosition(myRoute.steps[i].start_location);
                this.attachInstructionText(
                    stepDisplay, marker, myRoute.steps[i].instructions, map);
                continue;
            }
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            this.attachInstructionText(
                stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
    }

    attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', () => {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });
    }

    callback(results, status) {
        console.log("results", results);
        console.log("status", status);

        if (status === google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < results.length; i++) {

                this.createMarker(results[i]);
            }
        }
    }


    createMarker(place) {
        var marker = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location
        });
        let infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.vicinity);
            infowindow.open(this.map, this);
        });
    }

    render() {
        
       return (
           <div className="gas-pane-body">
                <div className="output-left"></div>
                <div id="map"></div>
                <div className="output-right"></div>
           </div>
       )
    }
}

export default GasPaneBody;