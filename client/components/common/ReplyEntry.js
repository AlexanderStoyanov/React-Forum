import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ReplyEntry = ({ text }) => {
    return (
        <div className="card">
            <div className="card-body">
                {text}
            </div>
        </div>
    );
}

ReplyEntry.propTypes = {
    text: PropTypes.string.isRequired,
}

ReplyEntry.defaultProps = {

}

export default ReplyEntry;