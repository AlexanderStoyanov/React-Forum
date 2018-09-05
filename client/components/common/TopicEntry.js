import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
    Route,
    Switch,
    Link
} from "react-router-dom";
import RepliesPage from '../Replies/RepliesPage';

const TopicEntry = ({ topicName, forumURL, topicURL, id, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-body">
                <h3>
                    <Link
                        to={`/forum/${forumURL}/${topicURL}`}
                        className="nav-link"
                        name={`${topicURL}`}
                        id={id}
                    >{topicName}</Link>
                </h3>
                <Switch>
                    <Route exact path={`/forum/${forumURL}/${topicURL}`} component={RepliesPage} />
                </Switch>
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

TopicEntry.defaultProps = {

}

export default TopicEntry;