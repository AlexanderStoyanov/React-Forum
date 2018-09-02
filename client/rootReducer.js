import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import navigationBar from './reducers/navigationBar';
import forum from './reducers/forum';

export default combineReducers({
    flashMessages,
    navigationBar,
    forum,
});