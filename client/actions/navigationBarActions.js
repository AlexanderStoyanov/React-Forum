import { CHANGE_DIRECTORY } from './types';

export function changeDir(directory) {
    return {
        type: CHANGE_DIRECTORY,
        directory
    }
}