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
                    <div id="iWant">
                        <h1>I want</h1>
                    </div>
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
