 'use strict';

 import Dispatcher from '../dispatcher/appDispatcher';
 import ActionTypes from '../constants/MyActionTypes';
 import _ from 'lodash';
 import EventEmitter from 'events';
 import assign from 'object-assign';
 import Api from '../AppAPI';

 const EVENTS = {
     CHANGE: 'change'
 };

 let _users = [];
 let _filteredUsers = [];
 let _activeUserIndex = 0;

 // Fields that can be sorted
 const _sortableFields = {
     NAME: "name",
     AGE: "age"
 };
 const _orderTypes = Object.freeze({
     ASC: "asc",
     DESC: "desc"
 });

 function requestUsers() {
     Api.requestUsers('./data.json').then((data) => {
         setUsers(data);
         UserStore.emitChange();
     });
 }

 function setUsers(users) {
     _filteredUsers = _users = users;
 }

 function filterUsers(queryString) {
     _filteredUsers = _users.filter((user) => {
         return user.name.includes(queryString);
     });
 }

 function sort(fieldForSorting, order) {
     _filteredUsers = _.sortBy(_filteredUsers, fieldForSorting);
     _users = _.sortBy(_users, fieldForSorting);
     if (order === _orderTypes.DESC) {
         _filteredUsers.reverse();
         _users.reverse();
     }
 }

 function setActiveUser(index) {
     _activeUserIndex = index;
 }

 var UserStore = assign(new EventEmitter (), {
     initialize() {
         requestUsers();
     },
     addChangeListener(callback) {
         this.on(EVENTS.CHANGE, callback);
     },
     removeChangeListener(callback) {
         this.removeListener(EVENTS.CHANGE, callback);
     },
     emitChange() {
         this.emit(EVENTS.CHANGE);
     },
     getUsers() {
         return _filteredUsers;
     },
     getActiveUser() {
         return _filteredUsers[_activeUserIndex];
     },
     getSortableFields() {
         return _sortableFields;
     },
     getOrderTypes() {
         return _orderTypes;
     }
 });

 Dispatcher.register((action) => {
     switch (action.actionType) {
         case ActionTypes.GET_USERS:
             UserStore.getUsers();
             UserStore.emitChange();
             break;
         case ActionTypes.GET_ORDER_TYPES:
             UserStore.getOrderTypes();
             UserStore.emitChange();
             break;
         case ActionTypes.GET_SORTABLE_FIELDS:
             UserStore.getSortableFields();
             UserStore.emitChange();
             break;
         case ActionTypes.FILTER_USERS:
             setActiveUser(0);
             filterUsers(action.queryString);
             UserStore.emitChange();
             break;
         case ActionTypes.SORT_USERS:
             sort(action.fieldName, action.order);
             UserStore.emitChange();
             break;
         case ActionTypes.SET_ACTIVE_USER:
             setActiveUser(action.index);
             UserStore.emitChange();
             break;
     }
 });

 export default UserStore;