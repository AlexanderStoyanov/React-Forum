import { CHANGE_DIRECTORY } from '../actions/types';

export default (state = [], action = {}) => {
    switch (action.type) {
        case CHANGE_DIRECTORY:
            return [
                ...state, {
                    text: action.directory.text
                }
            ];
        default: return state;
    }
}