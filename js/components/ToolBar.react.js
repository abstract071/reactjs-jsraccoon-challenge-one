import React, {Component, PropTypes} from 'react';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

function getSortParameters() {
    let sortableFields = UserStore.getSortableFields();
    let activeFieldsOrders = {};

    for ( var prop in sortableFields ) {
        if (sortableFields.hasOwnProperty(prop)) {
            activeFieldsOrders[sortableFields[prop]] = "";
        }
    }

    return activeFieldsOrders;
}

export default class ToolBar extends Component {

    constructor (props) {
        super(props);
        this.state = getSortParameters();
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    render() {
        let orderTypes = this.props.orderTypes;
        let sortableFields = this.props.sortableFields;

        return (
            <div class="row">
                <div class="col-sm-12">
                    <div class="toolbar">
                        <button class="btn btn-default" data-sortable-field={sortableFields.NAME} onClick={this.handleSortChange}>
                            <i class={`icon fa fa-sort-alpha-${this.state[sortableFields.NAME] || orderTypes.ASC}`}></i>
                            <span>  Sort by name</span>
                        </button>
                        <button class="btn btn-default" data-sortable-field={sortableFields.AGE} onClick={this.handleSortChange}>
                            <i class={`icon fa fa-sort-numeric-${this.state[sortableFields.AGE] || orderTypes.DESC}`}></i>
                            <span>  Sort by age</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    handleSortChange(event) {
        let orderTypes = this.props.orderTypes;
        let fieldName = event.currentTarget.dataset.sortableField;
        let currentFieldOrder = this.state[fieldName];
        let newOrder = currentFieldOrder === orderTypes.DESC ? orderTypes.ASC : orderTypes.DESC;

        UserActions.sort(fieldName, newOrder);
        this.setState({
            [fieldName]: newOrder
        });
    }

}

ToolBar.propTypes = {
    orderTypes: React.PropTypes.object,
    sortableFields: React.PropTypes.object
};