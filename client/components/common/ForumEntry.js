import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ForumEntry = ({ forumName, forumURL, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-body">
                <h1>
                    <Link to={`/forum/${forumURL}`} className="nav-link" name={`${forumURL}`}>{forumName}</Link>
                </h1>
            </div>
        </div>
    );
}

ForumEntry.propTypes = {
    forumName: PropTypes.string.isRequired,
    forumURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

ForumEntry.defaultProps = {

}

export default ForumEntry;