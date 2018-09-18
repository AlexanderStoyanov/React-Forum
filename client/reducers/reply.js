import { REPLIES_REQUEST_FAILURE, REQUEST_REPLIES, RECEIVE_REPLIES } from '../actions/loadReplies';

const initialState = {
    loading: false,
    currentTopic: null,
    replies: null,
    error: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_REPLIES:
            return {
                loading: true,
                currentDirectory: action.directory
            };
        case RECEIVE_REPLIES:
            return {
                loading: false,
                error: null,
                replies: action.payload,
                currentDirectory: state.currentDirectory
            };
        case REPLIES_REQUEST_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}