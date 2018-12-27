import React, { Component } from 'react';
import Banner from './Components/Banner.js'
import ListView from './Components/ListView.js'
import MapView from './Components/MapView'
import './App.css'
import {GoogleApiWrapper} from 'google-maps-react'



class App extends React.Component {
    constructor(props) {
        super(props)
        this.changeQuery = this.changeQuery.bind(this)
        this.onListClicked=this.onListClicked.bind(this)
        this.state= {
            restaurant:[],
            ratings:[],
            photos:[],
            query:"boba",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            page:1
        }
    }

//when user changed seach terms, it reset the fetch query state and refetch restaurant
    changeQuery= (value) => {
        this.setState({
            query:value,
            selectedPlace:{},
            showingInfoWindow:false,
            page:1
        },
        this.FetchRestaurant
        )
    }

    goNext= ()=>{
        //the fetch limit is set to 10 due to the API call quota, so there will be max 3 pages
        if (this.state.page===3) {
            alert("This is the end of the list.")
        } else {
            this.setState((prevState) => ({
                page: prevState.page + 1
                }),
                this.FetchRestaurant
            )
        }
    }

    goPrevious =()=>{
        if (this.state.page===1) {
            alert("This is the beginning of the list.")
        } else {
            this.setState(
                (prevState) => ({
                page: prevState.page - 1
                }),
                this.FetchRestaurant
            )
        }
    }

    onMarkerClick = (props, marker, e) =>{
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
       });
    }

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
        showingInfoWindow: false,
        activeMarker: null
        })
      }
    };

//Haven't figure out how to link ListView click with the corresponding markers
    onListClicked = (e) => {
        console.log(e);
        // this.setState({
        //     selectedPlace:e.target,
        //     showingInfoWindow: true
        // })
    };

    componentDidMount() {
        this.FetchRestaurant();
    }

//fetch restaurant data using Foursquare Place API
    FetchRestaurant= () => {
        let setRestaurantState = this.setState.bind(this);

        const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';
        const params = {
          client_id: "FLZVZU3QYRPWABKXRWKSMPP3GJJDGXE10HE1Q5WY1QWBRW3N",
          client_secret: "HRBWH41DMUDZQOAATKOR1KX4KVMJLBG3RBPN2LUJOYOMFM51",
          limit: 10,
          v: '20181227',
          //fetch restaurant data according to state query
          query: this.state.query,
          //my home ll
          ll: '37.332258, -122.012124'
        };

        //divide the fetched response by 4
        const start= (this.state.page - 1)*4
        const end =(this.state.page -1)*4+4

       fetch(venuesEndpoint + new URLSearchParams(params), {
          method: 'GET'
      }).then(
            response => response.json()
        ).then(
            //slice out the current page's restaurant
            response => response.response.groups[0].items.slice(start,end)
        ).then(
          response => {
              setRestaurantState({restaurant: response});
              //Pass restaurant date to FrechPhoto()
              this.FetchPhoto(response);
              //Pass restaurant date to FrechRating()
              this.FetchRatings(response);
          }
      ).catch(() => {
        alert("Foursquare API fetch error.");
        });
    }

//fetch restaurant photo using Foursquare photo API, accourding to restaurant venue Id fetched from FetchRestaurant
    FetchPhoto = (items) => {
        let setPhotoState = this.setState.bind(this);

        const params = {
          client_id: "FLZVZU3QYRPWABKXRWKSMPP3GJJDGXE10HE1Q5WY1QWBRW3N",
          client_secret: "HRBWH41DMUDZQOAATKOR1KX4KVMJLBG3RBPN2LUJOYOMFM51",
          limit: 1,
          v: '20181227',
        };
        items.forEach((item, index) => {
            const photoEndpoint = 'https://api.foursquare.com/v2/venues/' + item.venue.id  + '/photos?';
            fetch(photoEndpoint + new URLSearchParams(params), {
                method: 'GET'
            }).then( response => response.json()
            ).then( response => {
                let new_photo = this.state.photos;
                new_photo[index] = response.response.photos.items[0].prefix +'300x500'+ response.response.photos.items[0].suffix;
                setPhotoState({photos: new_photo})
            }).catch(() => {
            console.log("foursquare API fetch error, photo is not available");
            });
        })
    }
//fetch restaurant rating using Foursquare photo API, accourding to restaurant venue Id fetched from FetchRestaurant
    FetchRatings = (items) => {
        let setRatingState=this.setState.bind(this)
        const params = {
          client_id: "FLZVZU3QYRPWABKXRWKSMPP3GJJDGXE10HE1Q5WY1QWBRW3N",
          client_secret: "HRBWH41DMUDZQOAATKOR1KX4KVMJLBG3RBPN2LUJOYOMFM51",
          v: '20181227',
        };

        items.forEach((item,index)=>{
            const detailsEndpoint = 'https://api.foursquare.com/v2/venues/' + item.venue.id + '?';
            fetch(detailsEndpoint + new URLSearchParams(params), {
               method: 'GET'
           }).then(
                 response => response.json()
             ).then(
               response => {
                   let new_rating = this.state.ratings;
                   new_rating[index] = response.response.venue.rating;
                   setRatingState({ratings: new_rating})
               }
           ).catch(() => {
               console.log("foursquare API fetch error, rating is not available");
               });
        })
    }


   render() {
        return (
          <div id="maincontent">
            <Banner
                items= {[
                        {value:'Boba', id:1},
                        {value:'Fried Chicken', id:2},
                        {value:'Boba & Fried Chicken', id:3},
                    ]}
                onChangeQuery = {
                    this.changeQuery
                }
            />
            <ListView
                restaurantlist={this.state.restaurant}
                photolist={this.state.photos}
                onListClicked={this.onListClicked}
                page={this.state.page}
                onClickPrevious={this.goPrevious}
                onClickNext={this.goNext}
                ratinglist={this.state.ratings}
            />
            <MapView
                google={this.props.google}
                restaurantlist={this.state.restaurant}
                onMapClicked={this.onMapClicked}
                onMarkerClick={this.onMarkerClick}
                activeMarker={this.state.activeMarker}
                selectedPlace={this.state.selectedPlace}
                showingInfoWindow={this.state.showingInfoWindow}
            />
          </div>
        );
  }
}

// export default App;

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC1kz_xU2fSVqJfm3WGbGKOr8PTGJ1fNLc"),
})(App)
