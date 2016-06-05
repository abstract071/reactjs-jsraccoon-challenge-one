import React, {Component, PropTypes} from 'react';
import UserActions from '../actions/UserActions';

export default class UserData extends Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <tr onClick={this.handleClick}>
                <td>
                    <img src={`images/${this.props.user.image}.svg`} class="user-image"/>
                </td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.age}</td>
                <td>
                    <span>8</span>
                    <span>{this.props.user.phone}</span>
                </td>
            </tr>
        );
    }

    handleClick(event) {
        UserActions.setActiveUser(this.props.index);
    }
}