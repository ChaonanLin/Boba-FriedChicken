import React, {Component} from 'react'
import '../App.css';

class Dropdown extends React.Component {
    state = {
        items: this.props.items || [],
        showItems:false,
        selectedItem: this.props.items && this.props.items[0]

    }

    dropDown = () => {
        this.setState( prevState => ({ showItems: !prevState.showItems}))
    }

    selectItem = (item) => {
        this.setState(
            {selectedItem: item,
            showItems:false}
        )

        this.props.onChangeQuery(item.value)
    }


    render(){
        return(
            <div className="select-box">
                <div className="select-box--box">
                    <div className="select-box--container">
                        <div className="select-box--selected-item">
                        {this.state.selectedItem.value}
                        </div>
                        <button className="select-box--arrow" tabindex="0" onClick={this.dropDown} >
                            <span
                                className= {`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`} />
                        </button>
                        <div style={{display: this.state.showItems ? 'block' : 'none'}}  className="select-box--items">
                            {this.state.items.map( item =>
                                <button key= {item.id} onClick={() => this.selectItem(item)}
                                     className='itemslist' tabindex="0">
                                    {item.value}
                                </button>)
                            }
                        </div>
                    </div>
                </div>
                <input type="hidden"  value={this.state.selectedItem.id} name={this.state.selectedItem.value} />
            </div>
        )
    }
}

export default Dropdown;
