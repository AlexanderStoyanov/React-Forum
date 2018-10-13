import isEmpty from 'lodash/isEmpty';

export default function validateReply(data) {
    let errors = {};

    if (data.text === '') {
        errors.text = 'Text is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}