import React, { Component } from 'react'
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api'
import axios from 'axios';


class eventMaps extends Component {
  state={
    address: '13000 aspenwood avenue , garden grove, CA',
    location:{
    lng:-111.6871,
    lat:40.2992
    }
  }


  getLatLong() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=${process.env.REACT_APP_GOOGLEAPI}`)
      .then(result => {
        this.setState({
          location:{
            lat: result.data.results[0].geometry.location.lat,
            lng: result.data.results[0].geometry.location.lng,
          }
    })
  })}


  async componentDidMount() {
    this.getLatLong();
    console.log("map props", this.props)
  }

  

    render() {
       return (
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_GOOGLEAPI}
          
        >
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
                console.log('marker: ', marker)
              }}
              position={{
                lat: this.state.location.lat,
                lng: this.state.location.lng
              }}
          />
          </GoogleMap>
        </LoadScript>
       )
    }
  }
  export default eventMaps;