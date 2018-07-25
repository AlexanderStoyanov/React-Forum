import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, label, error, type, onChange, onBlur }) => {
    return (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <input
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                name={field}
                type={type}
                className={classnames('form-control', { 'is-invalid': error })}
            ></input>
            {error && <span className="help-block">{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;