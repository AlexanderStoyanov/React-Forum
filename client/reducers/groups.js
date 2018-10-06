import {
    REQUEST_GROUPS,
    RECEIVE_GROUPS,
    GROUPS_REQUEST_FAILURE,
    RECEIVE_LOAD_USER_LIST,
} from '../actions/groupsAction';

const initialState = {
    loading: false,
    groupsData: null,
    userList: null,
    error: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_GROUPS:
            return {
                loading: true
            };
        case RECEIVE_GROUPS:
            return {
                ...state,
                loading: false,
                error: null,
                groupsData: action.payload,
            };
        case GROUPS_REQUEST_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            };
        case RECEIVE_LOAD_USER_LIST:
            return {
                ...state,
                error: null,
                userList: action.payload,
            }
        default:
            return state;
    }
}