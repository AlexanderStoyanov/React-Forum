import React from 'react';
import { Link } from 'react-router-dom';

class ForumEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { loadTopics, forum } = this.props;
        loadTopics(forum.forumid);
    }

    render() {
        const { edit, restore, group } = this.props;
        const { forumname, forumid, deleted } = this.props.forum;
        //if group is Administrator, allow editing/restoring of forums
        if (group === 'Administrator') {
            var editButton = <button
                className="btn btn-secondary m-1 d-inline float-right"
                title="edit" name={`${forumid}`}
                onClick={edit}
            >Edit</button>;
            if (deleted === '1') {
                var restoreButton = <button
                    className="btn btn-success m-1 d-inline float-right"
                    title="restore" name={`${forumid}`}
                    onClick={restore}
                >Restore</button>;
            }
        }
        return (
            <div className="card m-2" name="card">
                <div className="card-body">
                    <h1>
                        <Link
                            to={`/forum/${forumname}`}
                            onClick={this.onClick}
                            className="nav-link d-inline"
                            name={`${forumid}`}
                            style={{ opacity: (deleted === '1') ? '0.5' : '1' }}
                        >{forumname}</Link>
                        {editButton}
                        {restoreButton}
                    </h1>
                </div>
            </div>
        );
    }
}

export default ForumEntry;