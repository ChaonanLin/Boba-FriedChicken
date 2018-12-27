import React, {Component} from 'react'
import RestaurantCard from './Restaurant_card.js'
import '../App.css';

class ListView extends React.Component {
    gopreviouspage=()=>{
        this.props.onClickPrevious()
    }
    gonextpage=()=>{
        this.props.onClickNext()
    }
    render(){
        const restaurant= this.props.restaurantlist;

        return(
            <div className="Container">
                <ul>
                    {restaurant.map((restaurant,index)=>(
                          <RestaurantCard
                              key= {index}
                              imageurl= {this.props.photolist[index]}
                              rating={this.props.ratinglist[index]}
                              name={restaurant.venue.name}
                              address={restaurant.venue.location.address}
                              //when
                              onCardClick={this.props.onListClicked}
                          />
                      ))}
                </ul>
                <div className="changepage">
                    <h4>Page</h4>
                    <button onClick={this.gopreviouspage} className="previous">&laquo;</button>
                    <p>{this.props.page}</p>
                    <button onClick={this.gonextpage} className="next"> &raquo;</button>
                </div>
            </div>
        )
    }
}

export default ListView;
