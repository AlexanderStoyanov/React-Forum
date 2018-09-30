import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ReplyEntry = ({ text, firstname, date, onClick, id, order }) => {
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
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card p-3 mb-3 bg-white">
                    <div className="card-header">
                        {new Date(Number(date)).toLocaleString()}
                        <div className="float-right">
                            <button name={id} data-order={order} title="Edit" class="btn btn-secondary m-1" onClick={onClick} >Edit</button>
                            <button name={id} title="Delete" class="btn btn-danger m-1" onClick={onClick} >Delete</button>
                        </div>
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
    firstname: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
}

export default ReplyEntry;