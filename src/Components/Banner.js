import React, {Component} from 'react'
import '../App.css'
import logo from '../img/logo.png'
import Dropdown from "./Dropdown.js"

class Banner extends React.Component {

    render(){
        return(
            <div>
                <div id="logo">
                    <img src= {logo} alt="logo" />
                </div>
                <div id="banner">
                    <h1>I want</h1>
                    <Dropdown
                        items= {this.props.items}
                        onChangeQuery= {this.props.onChangeQuery}
                    />
                </div>
            </div>

        )
    }
}

export default Banner;
