import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ForumEntry = ({ forumName, forumURL, onLoad }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h1>
                    <Link to={`/forum/${forumURL}`} className="nav-link">{forumName}</Link>
                </h1>
            </div>
        </div>
    );
}

ForumEntry.propTypes = {
    forumName: PropTypes.string.isRequired,
    forumURL: PropTypes.string.isRequired,
    onLoad: PropTypes.func.isRequired,
}

ForumEntry.defaultProps = {

}

export default ForumEntry;