import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ForumEntry = ({ forumName, forumURL, forumID, group, deleted, onClick }) => {
    return (
        <div className="card m-2" name="card" onClick={onClick}>
            <div className="card-body">
                <h1>
                    <Link to={`/forum/${forumURL}`} className="nav-link d-inline" name={`${forumID}`} style={{ opacity: (group === 'Administrator' && deleted === '1') ? '0.5' : '1' }}>{forumName}</Link>
                    <button className="btn btn-secondary m-1 d-inline float-right" title="edit" name={`${forumID}`} disabled={(group === 'Administrator1')} onClick={onClick}>Edit</button>
                    <button
                        className="btn btn-success m-1 d-inline float-right"
                        title="restore" name={`${forumID}`}
                        onClick={onClick}
                        style={{ opacity: (group === 'Administrator' && deleted === '1') ? '1' : '0' }}
                    >Restore</button>
                </h1>
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