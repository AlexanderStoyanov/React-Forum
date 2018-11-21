import React from 'react';
import { Link, withRouter } from "react-router-dom";

const TopicEntry = ({ topicName, topicID, onClick, deleted, match, edittopics, deletetopics }) => {
    let editButton = null;
    let restoreButton = null;

    //if editing of topics is allowed, reder edit button
    if (edittopics === '1' || deletetopics === '1') {
        editButton = <button
            className="btn btn-secondary m-1 d-inline float-right"
            title="edit"
            name={`${topicID}`}
            onClick={onClick}
        >Edit</button>;
    }
    //if deleting topics is allowed, restoring back is also allowed
    if (deletetopics === '1' && deleted === '1') {
        restoreButton = <button
            className="btn btn-success m-1 d-inline float-right"
            title="restore" name={`${topicID}`}
            onClick={onClick}
        >Restore</button>;
    }

    return (
        <div className="card m-2" onClick={onClick} style={{ background: '#333339' }}>
            <div className="card-body">
                <h3>
                    <Link
                        to={{ pathname: `${match.url}/${topicName}` }}
                        className="nav-link d-inline"
                        name={`${topicID}`}
                        style={{
                            opacity: (deleted === '1') ? '0.5' : '1',
                            color: '#ddd'
                        }}
                    >{topicName}
                    </Link>
                    {editButton}
                    {restoreButton}
                </h3>
            </div>
        </div>
    );
}

export default withRouter(TopicEntry);