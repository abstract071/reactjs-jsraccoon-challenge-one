import React, {Component, PropTypes} from 'react';
import UserData from './UserData.react';

export default class UserList extends Component {

    render() {

        let rows = this.props.users.map((user, index) => {
            return <UserData key={user.id} user={user} index={index} />
        });

        return (
            <div class="col-sm-8 col-md-9 col-lg-10">
                <table class="user-list table table-striped">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

UserList.propTypes = {
    users: React.PropTypes.array
};