import { FORUMS_REQUEST_FAILURE, REQUEST_FORUMS, RECEIVE_FORUMS } from '../actions/loadForums';
import { ADD_FORUM_FAILURE, ADD_FORUM_REQUEST, ADD_FORUM_SUCCESS } from '../actions/addForum';

const initialState = {
    loading: false,
    forums: [],
    error: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_FORUMS:
            return {
                    loading: true
                };
        case RECEIVE_FORUMS:
            return {
                    loading: false,
                    error: null,
                    forumNames: [action.payload]
                };
        case FORUMS_REQUEST_FAILURE:
            return {
                    loading: false,
                    error: action.payload.error
                };
        default:
            return state;
    }
}