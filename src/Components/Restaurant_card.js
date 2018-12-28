import React, {Component} from 'react'
import '../App.css';

class RestaurantCard extends React.Component {
    keypress = (e) => {
		var code = e.which;
		if ((code === 13) || (code === 32)) {
			e.target.click();
        }
    }
    render(){
        const imageurl = this.props.imageurl
        const restaurantname=this.props.name
        //Conver the 10 points rating to 5 stars by rounding-off method
        const star= Math.round(this.props.rating/2)
        return(
            //when the restarurant <li> element is clicked, invoke onCardClick props fucntion in ListView
            //then, invoke onListClicked() in App.js; but haven't figure out how to get a corresponding object
            // to pass in onCardClick?

            <li
                className="card"
                tabindex="0" 
                onClick={({restaurantname})=>this.props.onCardClick({restaurantname})}
                onKeyPress={this.keypress}
                role="button"
                name="Restaurant Information"
            >
                <img className="restaurant-image" src= {imageurl} alt="restaurant profile"/>
                <h1> {restaurantname} </h1>
                <p>{this.props.address ? this.props.address:'Address not available'}</p>
                <Rating stars={star}/>
            </li>
        )
    }
}

class Rating extends React.Component {

    createrating = () => {
        let filledStar =[];

        for (let i=1; i<=this.props.stars; i++) {
            filledStar.push(<span className="fa fa-star checked"></span>)
        }
        return filledStar;
    }
    createemptyStar = () => {
        let emptyStar =[];
        for (let i=1; i<=(5-this.props.stars); i++) {
            emptyStar.push(<span className="fa fa-star"></span>)
        }
        return emptyStar;
    }

    render(){
        return(
            <div className="rate">
                {this.createrating()}
                {this.createemptyStar()}
            </div>
        )
    }
}

export default RestaurantCard;
