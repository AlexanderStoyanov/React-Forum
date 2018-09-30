import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import navigationBar from './reducers/navigationBar';
import forum from './reducers/forum';
import topic from './reducers/topic';
import reply from './reducers/reply';
import userDetails from './reducers/userDetails';
import groups from './reducers/groups';

export default combineReducers({
    flashMessages,
    navigationBar,
    forum,
    topic,
    reply,
    userDetails,
    groups,
});