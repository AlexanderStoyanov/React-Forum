import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
    Route,
    Switch,
    Link
} from "react-router-dom";
import RepliesPage from '../Replies/RepliesPage';

const TopicEntry = ({ topicName, forumURL, topicURL, onClick }) => {
    return (
        <div className="topicEntry" onClick={onClick}>
            <Link to={`/forum/${forumURL}/${topicURL}`} type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">{topicName}</Link>
            <Switch>
                <Route exact path={`/forum/${forumURL}/${topicURL}`} component={RepliesPage} />
            </Switch>
        </div>
    );
}

TopicEntry.propTypes = {
    topicName: PropTypes.string.isRequired,
    forumURL: PropTypes.string.isRequired,
    topicURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

TopicEntry.defaultProps = {

}

export default TopicEntry;