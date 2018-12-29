import React, {Component} from 'react'
import '../App.css';
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
// = compose(
//   withStateHandlers(() => ({
//     isOpen: false,
//   }), {
//     onToggleOpen: ({ isOpen }) => () => ({
//       isOpen: !isOpen,
//     })
//   })
// )(props =>
//
// );



// <InfoWindow
//     marker={this.props.activeMarker}
//     visible={this.props.showingInfoWindow}
//     ClassName="inforwindow"
//     // position={{lat:restaurant.venue.location.lat,lng:restaurant.venue.location.lng}}
// >
//     <div>
//     <h1>{this.props.selectedPlace.name}</h1>
//     </div>
// </InfoWindow>

// {props.isMarkerShown &&
//     <Marker position={{ lat: 37.332258, lng: -122.012124 }} />}


//
// export class MapView extends Component {
//     // getMarkers = () => {
//     //     const restaurant= this.props.restaurantlist;
//     //     const restaurantname=restaurant.venue.name;
//     //     restaurant.map((restaurant)=>(this.refs.restaurantname))
//     // }
//
//   render() {
//     const restaurant= this.props.restaurantlist;
//     const style = {
//         width: '100%',
//         height: '100%',
//         }
//     return (
//         <div className="mapContainer" role="application">
//           <Map
//             google={this.props.google}
//             zoom={12}
//             style={style}
//             initialCenter={{
//                 lat: 37.332258,
//                 lng: -122.012124
//               }}
//             onClick={this.props.onMapClicked}
//           >
          // {restaurant.map((restaurant,id)=>(
          //       <Marker
          //           key= {restaurant.venue.id}
          //           name={restaurant.venue.name}
          //           position={{lat:restaurant.venue.location.lat,lng:restaurant.venue.location.lng}}
          //           onClick={this.props.onMarkerClick}
          //           ref={restaurant.venue.name}
          //       />
          //   ))}
                // <InfoWindow
                //     marker={this.props.activeMarker}
                //     visible={this.props.showingInfoWindow}
                //     ClassName="inforwindow"
                //     // position={{lat:restaurant.venue.location.lat,lng:restaurant.venue.location.lng}}
                // >
                    // <div>
                    // <h1>{this.props.selectedPlace.name}</h1>
                    // </div>
                // </InfoWindow>
//           </Map>
//       </div>
//     );
//   }
// }
export default MapView;
