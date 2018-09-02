import fetch from 'cross-fetch';

import { NAVIGATE_HOME } from '../actions/types';

export function changeDir(directory) {
    return {
        type: NAVIGATE_HOME,
        directory
    }
}