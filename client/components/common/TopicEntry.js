import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";

const TopicEntry = ({ topicName, forumURL, topicURL, topicID, onClick, group, deleted, match }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-body">
                <h3>
                    <Link
                        to={{ pathname: `${match.url}/${topicURL}` }}
                        className="nav-link"
                        name={`${topicID}`}
                        style={{
                            opacity: (group === 'Administrator' && deleted === '1') ? '0.5' : '1',
                        }}
                    >{topicName}</Link>
                </h3>
                <button className="btn btn-secondary m-1" title="edit" name={`${topicID}`} onClick={onClick}>Edit</button>
                <button
                    className="btn btn-success m-1"
                    title="restore" name={`${topicID}`}
                    onClick={onClick}
                    style={{ opacity: (group === 'Administrator' && deleted === '1') ? '1' : '0' }}
                >Restore</button>
            </div>
        </div>
    );
}

TopicEntry.propTypes = {
    topicName: PropTypes.string.isRequired,
    forumURL: PropTypes.string.isRequired,
    topicURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withRouter(TopicEntry);