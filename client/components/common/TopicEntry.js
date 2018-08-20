import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopicEntry = ({ topicName, forumURL, topicURL }) => {
    return (
        <div className="card">
            <div className="card-body">
                <Link to={`/forum/${forumURL}/${topicURL}`} className="nav-link">{topicName}</Link>
            </div>
        </div>
    );
}

TopicEntry.propTypes = {
    topicName: PropTypes.string.isRequired,
    onLoad: PropTypes.func.isRequired,
}

TopicEntry.defaultProps = {

}

export default TopicEntry;