import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ForumEntry = ({ forumName, forumURL, forumID, group, onClick }) => {
    return (
        <div className="card" name="card" onClick={onClick}>
            <div className="card-body">
                <h1>
                    <Link to={`/forum/${forumURL}`} className="nav-link" name={`${forumID}`}>{forumName}</Link>
                </h1>
                <button className="btn btn-secondary m-1" name="rename" disabled={(group === 'Administrator')} onClick={onClick}>Rename</button>
                <button className="btn btn-danger m-1" name="delete" disabled={(group === 'Administrator')} onClick={onClick}>Delete</button>
            </div>
        </div>
    );
}

ForumEntry.propTypes = {
    forumName: PropTypes.string.isRequired,
    forumURL: PropTypes.string.isRequired,
    forumID: PropTypes.number.isRequired,
    group: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default ForumEntry;