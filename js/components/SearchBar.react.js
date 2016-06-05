import React, {Component, PropTypes} from 'react';
import UserActions from '../actions/UserActions';

export default class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

    render() {
        return (
            <div class="row">
                <div class="col-sm-12">
                    <div class="searchbar form-group">
                        <input type="text"
                               class="form-control"
                               placeholder="Search people by name..."
                               onInput={this.handleInput}/>
                    </div>
                </div>
            </div>
        );
    }

    handleInput(event) {
        UserActions.filterUsers(event.target.value);
    }
};