import React, {Component, PropTypes} from 'react';
import UserStore from '../stores/UserStore';

function getActiveUser() {
    return {
        activeUser: UserStore.getActiveUser()
    }
}

export default class ActiveUser extends Component {

    constructor (props) {
        super(props);
        this.state = getActiveUser();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div class="col-sm-4 col-md-3 col-lg-2">
                <div class="thumbnail">
                    <img src={`images/${this.state.activeUser.image}.svg`} />
                    <div class="thumbnail-caption">
                        <h3>{this.state.activeUser.name}</h3>
                        <table class="user-info table table-responsive">
                            <tbody>
                            <tr>
                                <td>Age:</td>
                                <td>{this.state.activeUser.age}</td>
                            </tr>
                            <tr>
                                <td>Favorite animal:</td>
                                <td>raccoon</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>
                                    <span>8</span>
                                    <span>{this.state.activeUser.phone}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <p>
                            <b>Favorite phrase:</b><span> </span>
                            <span>{this.state.activeUser.phrase}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    _onChange() {
        this.setState(getActiveUser());
    }
}