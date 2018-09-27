import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ReplyEntry = ({ text, firstname, date }) => {
    function createMarkup() {
        return { __html: text };
    }

    function myComponent() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
    }
    var d = Date(date);
    console.log(date);
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{firstname}</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card p-3 mb-3 bg-white">
                    <div className="card-header">
                        {d}
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            {myComponent()}
                        </p>
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