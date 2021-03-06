import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { isEqual } from "lodash";

class eventMaps extends Component {
  state = {
    address: "13000 aspenwood avenue , garden grove, CA",
    location: {
      lng: -111.6871,
      lat: 40.2992
    }
  };

  getLatLong = () => {
    return axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLEAPI}&address=${this.state.address}`
      )
      .then(result => {
        console.log(result.data, process.env)
        this.setState({
          location: {
            lat: result.data.results[0].geometry.location.lat,
            lng: result.data.results[0].geometry.location.lng
          }
        });
      });
  }

  componentDidUpdate = prevProps => {
    if (!isEqual(this.props.location, prevProps.location)) {
      this.setState({address:this.props.location},this.getLatLong)
      
      console.log("map props", this.props);
    }
  };

  render() {
    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLEAPI}
      >
        {this.state.location === false ? (
          <div>Google cannot find your address... Good Luck!</div>
        ) : (
          <GoogleMap
            id="marker-example"
            mapContainerStyle={{
              height: "400px",
              width: "800px"
            }}
            zoom={13}
            center={{
              lat: this.state.location.lat,
              lng: this.state.location.lng
            }}
          >
            <Marker
              onLoad={marker => {
                console.log("marker: ", marker);
              }}
              position={{
                lat: this.state.location.lat,
                lng: this.state.location.lng
              }}
            />
          </GoogleMap>
        )}
      </LoadScript>
    );
  }
}
export default eventMaps;
