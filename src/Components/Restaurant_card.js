import React, {Component} from 'react'
import '../App.css';

class RestaurantCard extends React.Component {

    changeSelected= ()=>{
        this.props.onChangeSelected()
    }
    render(){
        const imageurl = this.props.imageurl
        const star= Math.ceil(this.props.rating/2)
        return(
            <li className="card"  onClick={(e)=>{this.props.onCardClick(e)}} >
                <img className="restaurant-image" src= {imageurl} alt="restaurant profile"/>
                <h1> {this.props.name}</h1>
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
