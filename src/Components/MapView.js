import React, {Component} from 'react'
import '../App.css';

// Use react-google-maps library
//reference: https://tomchentw.github.io/react-google-maps/#infowindow
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"
const { compose, withProps, withStateHandlers } = require("recompose");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const MapView =  withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 37.332258, lng: -122.012124 }}
    restaurant={props.restaurantlist}
  >
  {props.restaurantlist.map((restaurant,id)=>(
        <MapWithAMakredInfoWindow
            key= {restaurant.venue.id}
            name={restaurant.venue.name}
            position={{lat:restaurant.venue.location.lat,lng:restaurant.venue.location.lng}}
            selectedPlace={props.selectedPlace}
        >
        </MapWithAMakredInfoWindow>
    ))}
  </GoogleMap>
))



class MapWithAMakredInfoWindow extends React.Component {
    state = {isOpen: false}

    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.selectedPlace === this.props.name });
    }

    render (){
        return (
            <Marker
              key = {this.props.name}
              position={{ lat: this.props.position.lat, lng: this.props.position.lng}}
              onClick={() => this.setState(state => ({isOpen: !state.isOpen}))}
            >
              {this.state.isOpen &&
                  <InfoWindow>
                  <div>
                      <h1>{this.props.name}</h1>
                  </div>
              </InfoWindow>}
            </Marker>
        )
    }
}

export default MapView;
