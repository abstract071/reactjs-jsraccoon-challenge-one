import React, { Component } from 'react';
import ActiveUser from './components/ActiveUser.react';
import SearchBar from './components/SearchBar.react';
import ToolBar from './components/ToolBar.react';
import UserList from './components/UserList.react';
import UserStore from './stores/UserStore';

function getUsersData() {
    return {
        users: UserStore.getUsers()
    }
}

function getOrderTypes() {
    return UserStore.getOrderTypes();
}

function getSortableFields() {
    return UserStore.getSortableFields();
}

export default class App extends Component {
    constructor (props) {
        super(props);
        UserStore.initialize();
        this.state = {
            users: []
        };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        this.setState(getUsersData());
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    render() {
        let activeUser = this.state.users.length > 0 ? <ActiveUser />
                : <div class="col-sm-4 col-md-3 col-lg-2"><h3>Nothing found :(</h3></div>;

        return (
            <div class="app container-fluid">
                <SearchBar />
                <ToolBar orderTypes={ getOrderTypes() } sortableFields={ getSortableFields() }/>
                <div class="row">
                    {activeUser}
                    <UserList users={ this.state.users } />
                </div>
            </div>
        );
    }

    _onChange() {
        this.setState(getUsersData());
    }
}
