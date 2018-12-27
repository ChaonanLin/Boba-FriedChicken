import React, {Component} from 'react'
import '../App.css';
import GoogleApiComponent from '../GoogleApiComponent.js'
import ReactDOM from 'react-dom';


// Reference: How to Write a Google Maps React Component
// Author:Ari Lerner
// url:https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/

export class Map extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom = 14;
            let lat = 37.774929;
            let lng = -122.419416;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
        }
    }

    render() {
        return (
            <div ref='map'>
            Loading map...
            </div>
        )
  }
}

class MapView extends React.Component {
        render() {
            if (!this.props.loaded) {
                return <div>Loading...</div>
            }
            const style = {
                width: '100vw',
                height: '100vh'
            }
            return (
                <div style={style}>
                    <Map google={this.props.google}
                    />
                </div>
        )
    }
}


export default GoogleApiComponent({
  apiKey: "AIzaSyC1kz_xU2fSVqJfm3WGbGKOr8PTGJ1fNLc"
})(MapView)
