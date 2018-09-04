import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import navigationBar from './reducers/navigationBar';
import forum from './reducers/forum';
import topic from './reducers/topic';

export default combineReducers({
    flashMessages,
    navigationBar,
    forum,
    topic,
});