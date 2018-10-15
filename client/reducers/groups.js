import {
    REQUEST_GROUPS,
    RECEIVE_GROUPS,
    GROUPS_REQUEST_FAILURE,
    RECEIVE_LOAD_USER_LIST,
    REQUEST_ADD_GROUP,
    RECEIVE_ADD_GROUP,
    GROUP_ADD_FAILURE,
    REQUEST_RENAME,
    RECEIVE_RENAME,
    GROUP_RENAME_FAILURE,
    REQUEST_LOAD_PERMISSIONS,
    RECEIVE_LOAD_PERMISSIONS,
    LOAD_PERMISSIONS_FAILURE,
    REQUEST_UPDATE_USERS_LIST,
    RECEIVE_UPDATE_USERS_LIST,
    UPDATE_USERS_LIST_FAILURE,
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
                loading: true,
                error: null,
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
        case REQUEST_ADD_GROUP:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case RECEIVE_ADD_GROUP:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case GROUP_ADD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case REQUEST_RENAME:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case RECEIVE_RENAME:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case GROUP_RENAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case REQUEST_LOAD_PERMISSIONS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case RECEIVE_LOAD_PERMISSIONS:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case LOAD_PERMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case REQUEST_UPDATE_USERS_LIST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case RECEIVE_UPDATE_USERS_LIST:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case UPDATE_USERS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
}