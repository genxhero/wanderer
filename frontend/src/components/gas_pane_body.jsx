import React from "react";
const google = window.google;

class GasPaneBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curLocation: {}
        }

        this.initMap = this.initMap.bind(this);
        this.callback = this.callback.bind(this);
        this.createMarker = this.createMarker.bind(this);
        this.map = null;
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
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
         
        this.setState({curLocation: curLocation}, () => {
            this.initMap();
        })

        console.log(this.state)
    }

    initMap() {

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.state.curLocation,
            zoom: 13
        });

        this.map.setCenter(this.state.curLocation);

        var marker = new google.maps.Marker({
            map: this.map,
            position: this.state.curLocation
        });

        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch({
            location: this.state.curLocation,
            radius: 1500,
            type: ['gas_station']
        }, this.callback);
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
                <div id="map"></div>
           </div>
       )
    }
}

export default GasPaneBody;