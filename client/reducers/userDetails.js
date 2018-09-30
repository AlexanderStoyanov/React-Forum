import { SIGN_IN_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from '../actions/signInAction';
import { RECEIVE_TOPICS, EDIT_TOPIC } from '../actions/topicAction';
import { EDIT_FORUM } from '../actions/forumAction';
import { EDIT_REPLY } from '../actions/replyAction';

const initialState = {
    token: '',
    name: '',
    group: '',
    currentForumID: '',
    currentTopicID: '',
    currentReplyID: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {
                loading: true,
            };
        case SIGN_IN_SUCCESS:
            return {
                loading: false,
                error: null,
                token: action.payload.token,
                name: action.payload.name,
                group: action.payload.groupname
            };
        case SIGN_IN_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            };
        case EDIT_FORUM:
            return {
                ...state,
                currentForumID: action.payload.currentForumID,
            };
        case EDIT_TOPIC:
            return {
                ...state,
                currentTopicID: action.payload.currentTopicID,
            };
        case EDIT_REPLY:
            return {
                ...state,
                currentReplyID: action.payload.currentReplyID,
            };
        case RECEIVE_TOPICS:
            return {
                ...state,
                currentForumID: action.payload[0].forumid,
            };
        default:
            return state;
    }
}