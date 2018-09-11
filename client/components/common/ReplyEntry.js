import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ReplyEntry = ({ text }) => {
    function createMarkup() {
        return { __html: text };
    }

    function myComponent() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
    }

    return (
        <div className="card">
            <div className="card-body">
                {myComponent()}
            </div>
        </div>
    );
}

ReplyEntry.propTypes = {
    text: PropTypes.string.isRequired,
}

export default ReplyEntry;