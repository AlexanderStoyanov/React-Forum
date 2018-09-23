import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import RepliesPage from '../Replies/RepliesPage';

const TopicEntry = ({ topicName, forumURL, topicURL, topicID, onClick, match }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-body">
                <h3>
                    <Link
                        to={{ pathname: `${match.url}/${topicURL}` }}
                        className="nav-link"
                        name={`${topicID}`}
                        data-toggle="modal"
                        data-target=".bd-modal-lg"
                    >{topicName}</Link>
                </h3>
                <button className="btn btn-secondary m-1" title="edit" name={`${topicID}`} onClick={onClick}>Edit</button>
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