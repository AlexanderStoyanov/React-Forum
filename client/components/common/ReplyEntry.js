import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ReplyEntry = ({ text, firstname }) => {
    function createMarkup() {
        return { __html: text };
    }

    function myComponent() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{firstname}</h5>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card">
                    <div className="card-body">
                        {myComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

ReplyEntry.propTypes = {
    text: PropTypes.string.isRequired,
}

export default ReplyEntry;