import { TOPICS_REQUEST_FAILURE, REQUEST_TOPICS, RECEIVE_TOPICS } from '../actions/loadTopics';

const initialState = {
    loading: false,
    currentDirectory: null,
    topics: [],
    error: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_TOPICS:
            return {
                loading: true,
                currentDirectory: action.directory
            };
        case RECEIVE_TOPICS:
            return {
                loading: false,
                error: null,
                topicNames: [action.payload],
                currentDirectory: state.currentDirectory
            };
        case TOPICS_REQUEST_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}