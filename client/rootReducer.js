import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import navigationBar from './reducers/navigationBar';

export default combineReducers({
    flashMessages,
    navigationBar,
});