import fetch from 'cross-fetch';

import { CHANGE_DIRECTORY } from '../actions/types';

export function changeDir(directory) {
    return {
        type: CHANGE_DIRECTORY,
        directory
    }
}