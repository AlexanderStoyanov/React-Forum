import {
    REQUEST_GROUPS,
    RECEIVE_GROUPS,
    GROUPS_REQUEST_FAILURE,
} from '../actions/groupsAction';

const initialState = {
    loading: false,
    groupsData: null,
    error: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_GROUPS:
            return {
                loading: true
            };
        case RECEIVE_GROUPS:
            return {
                loading: false,
                error: null,
                groupsData: action.payload,
            };
        case GROUPS_REQUEST_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}