 'use strict';

 import Dispatcher from '../dispatcher/appDispatcher';
 import ActionTypes from '../constants/MyActionTypes';

 var UserActions = {
     getUsers: () => {
         Dispatcher.dispatch({
             actionType: ActionTypes.GET_USERS
         });
     },
     getOrderTypes: () => {
         Dispatcher.dispatch({
             actionType: ActionTypes.GET_ORDER_TYPES
         });
     },
     getSortableFields: () => {
         Dispatcher.dispatch({
             actionType: ActionTypes.GET_SORTABLE_FIELDS
         });
     },
     filterUsers: (queryString) => {
         Dispatcher.dispatch({
             actionType: ActionTypes.FILTER_USERS,
             queryString: queryString
         });
     },
     sort: (fieldName, order) => {
         Dispatcher.dispatch({
             actionType: ActionTypes.SORT_USERS,
             fieldName: fieldName,
             order: order
         });
     },
     setActiveUser: (index) => {
         Dispatcher.dispatch({
             actionType: ActionTypes.SET_ACTIVE_USER,
             index: index
         });
     }
 };

 export default UserActions;