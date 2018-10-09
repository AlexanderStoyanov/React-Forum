import React from 'react';
import { Link } from 'react-router-dom';


const ForumEntry = ({ forumName, forumID, group, deleted, onClick }) => {
    let editButton = null;
    let restoreButton = null;
    //if group is Administrator, allow editing/restoring of forums
    if (group === 'Administrator') {
        editButton = <button
            className="btn btn-secondary m-1 d-inline float-right"
            title="edit" name={`${forumID}`}
            onClick={onClick}
        >Edit</button>;
        if (deleted === '1') {
            restoreButton = <button
                className="btn btn-success m-1 d-inline float-right"
                title="restore" name={`${forumID}`}
                onClick={onClick}
            >Restore</button>;
        }
    }
    return (
        <div className="card m-2" name="card" onClick={onClick}>
            <div className="card-body">
                <h1>
                    <Link
                        to={`/forum/${forumName}`}
                        className="nav-link d-inline"
                        name={`${forumID}`}
                        style={{ opacity: (deleted === '1') ? '0.5' : '1' }}
                    >{forumName}</Link>
                    {editButton}
                    {restoreButton}
                </h1>
            </div>
        </div>
    );
}

export default ForumEntry;