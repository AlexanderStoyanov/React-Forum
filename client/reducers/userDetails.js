import { SIGN_IN_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from '../actions/signInAction';
import { RECEIVE_TOPICS } from '../actions/loadTopics';
import { EDIT_FORUM } from '../actions/editForum';

const initialState = {
    token: '',
    name: '',
    group: '',
    currentForumID: '',
    currentTopicID: '',
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
        case RECEIVE_TOPICS:
            return {
                ...state,
                currentForumID: action.payload[0].forumid,
            };
        default:
            return state;
    }
}