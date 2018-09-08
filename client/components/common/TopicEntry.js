import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
    Route,
    Switch,
    Link
} from "react-router-dom";
import RepliesPage from '../Replies/RepliesPage';

const TopicEntry = ({ topicName, forumURL, topicURL, id, onClick, match }) => {
    //console.log(match);
    return (
        <div className="card" onClick={onClick}>
            <div className="card-body">
                <Route exact path={`${match.url}/${topicURL}`} component={RepliesPage} />
                <h3>
                    <Link
                        to={{ pathname: `${match.url}/${topicURL}` }}
                        className="nav-link"
                        name={`${topicURL}`}
                        id={id}
                        data-toggle="modal" 
                        data-target=".bd-modal-lg"
                    >{topicName}</Link>
                </h3>
                
            </div>
        </div>
    );
}

//<Switch>
//    <Route exact path={`/forum/${forumURL}/${topicURL}`} component={RepliesPage} />
//</Switch>

TopicEntry.propTypes = {
    topicName: PropTypes.string.isRequired,
    forumURL: PropTypes.string.isRequired,
    topicURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

TopicEntry.defaultProps = {

}

export default TopicEntry;