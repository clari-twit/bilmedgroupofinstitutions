import { combineReducers } from 'redux';
import { headerReducer, sendUserDetailsReducer } from 'redux/reducers/HeaderReducers';
import { sidebarReducer } from 'redux/reducers/SidebarReducers';
import { selectedTableRowReducer } from 'redux/reducers/TableReducers';

const rootReducers = combineReducers({
  sidebarOpen: sidebarReducer,
  notificationCountNumber: headerReducer,
  userData: sendUserDetailsReducer,
  tableRowSelect: selectedTableRowReducer,
});

export default rootReducers;
