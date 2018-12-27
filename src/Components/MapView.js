import React, {Component} from 'react'
import '../App.css';
import ReactDOM from 'react-dom';
//used [Google-maps-react](https://github.com/fullstackreact/google-maps-react#marker) library
//to load Google map APIs and add Marker and InfoWindow components.
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'


export class MapView extends Component {

  render() {
    const restaurant= this.props.restaurantlist;
    const style = {
        width: '50%',
        height: '880px',
        margin: '36px 36px 0 0'
        }
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={style}
        initialCenter={{
            lat: 37.332258,
            lng: -122.012124
          }}
        onClick={this.props.onMapClicked}
      >
      {restaurant.map((restaurant,id)=>(
            <Marker
                key= {restaurant.venue.id}
                name={restaurant.venue.name}
                position={{lat:restaurant.venue.location.lat,lng:restaurant.venue.location.lng}}
                onClick={this.props.onMarkerClick}
            />
        ))}
            <InfoWindow
                marker={this.props.activeMarker}
                visible={this.props.showingInfoWindow}
                ClassName="inforwindow"
            >
                <div>
                <h1>{this.props.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC1kz_xU2fSVqJfm3WGbGKOr8PTGJ1fNLc")
})(MapView)
