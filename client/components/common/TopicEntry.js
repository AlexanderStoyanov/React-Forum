import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import RepliesPage from '../Replies/RepliesPage';

const TopicEntry = ({ topicName, forumURL, topicURL, id, onClick, match }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-body">
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

//<Route exact path={`${match.url}/${topicURL}`} component={RepliesPage} />

//<Link
//    to={{ pathname: `${match.url}/${topicURL}` }}
//    className="nav-link"
//    name={`${topicURL}`}
//    id={id}
//    data-toggle="modal"
//    data-target=".bd-modal-lg"
//>{topicName}</Link>

//<Route render={({ history }) => (
//    <button
//        className="nav-link"
//        name={`${topicURL}`}
//        id={id}
//        onClick={() => { history.push(`${match.url}/${topicURL}`) }}
//    >{topicName}</button>
//)} />

TopicEntry.propTypes = {
    topicName: PropTypes.string.isRequired,
    forumURL: PropTypes.string.isRequired,
    topicURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withRouter(TopicEntry);