import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadTopics } from '../../actions/topicAction';
import { renameForum, loadCurrentForumID, deleteForum, addForum, loadForums, restoreForum } from '../../actions/forumAction';

import ForumEntry from '../common/ForumEntry';
import AddField from '../common/AddField';
import EditField from '../common/EditField';


class ForumsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            add: false,
            edit: false,
            newName: '',
            renameText: '',
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.restore = this.restore.bind(this);
        this.edit = this.edit.bind(this);
        this.back = this.back.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        //If signed in, load forums
        if (this.props.userDetails.token) {
            this.props.loadForums();
        }
    }

    add() {
        this.setState({ add: true });
    }

    async delete(event) {
        event.preventDefault();
        const { deleteForum, userDetails, loadForums } = this.props;
        await deleteForum(userDetails.currentForumID);
        this.setState({ edit: false, add: false });
        loadForums();
    }

    async restore(event) {
        event.preventDefault();
        const { restoreForum, loadForums } = this.props;
        await restoreForum(event.target.name);
        loadForums();
    }

    edit(event) {
        event.preventDefault();
        const { loadCurrentForumID } = this.props;
        loadCurrentForumID(event.target.name);
        this.setState({ edit: true });
    }

    back() {
        this.setState({ edit: false, add: false });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async onSubmit(event) {
        event.preventDefault();
        const { addForum, renameForum, loadForums, currentForumID } = this.props;
        const { add, edit, newName, renameText } = this.state;
        if (add) {
            await addForum(newName);
        }
        else if (edit) {
            await renameForum(currentForumID, renameText);
        }
        this.setState({ add: false, edit: false });
        loadForums();
    }

    async onClick(event) {
        console.log(event.target);
        const { loadTopics, loadCurrentForumID } = this.props;
        if (event.target.tagName.toLowerCase() === 'a') {
            loadTopics(event.target.name);
        }
        // else if (event.target.title === 'edit') {
        //     loadCurrentForumID(event.target.name);
        //     this.setState({ edit: true });
        // }
    }

    render() {
        //initially set forum-entries to 'unauthorized alert'
        var forumEntries = (<div className="alert alert-info text-center mt-5" role="alert">
            Please, &nbsp;
        <Link to="/signin" className="alert-link d-inline" >Sign In</Link>
            &nbsp; or &nbsp;
        <Link to="/signup" className="alert-link d-inline" >Sign Up</Link>
            &nbsp; to participate!
        </div>);

        const { group, token, permissions } = this.props.userDetails;
        //null check
        if (this.props.forum.forumNames) {
            const { forum, loadTopics } = this.props;
            //if signed in
            if (token) {
                //if account is not suspended, load forums
                if (permissions.blocked !== '1') {
                    forumEntries = forum.forumNames.map(forum => {
                        //if Admin, load all forums
                        if (group === 'Administrator') {
                            return <ForumEntry
                                key={forum.forumid}
                                forum={forum}
                                group={group}
                                edit={this.edit}
                                restore={this.restore}
                                loadTopics={loadTopics}
                            />;
                        } else if (forum.deleted !== '1') {
                            //if not Admin, load only those forums that are not deleted
                            return <ForumEntry
                                key={forum.forumid}
                                forum={forum}
                                group={group}
                                edit={this.edit}
                                restore={this.restore}
                                loadTopics={loadTopics}
                            />;
                        }
                    });
                } else {
                    //if account is suspended, show alert
                    forumEntries =
                        <div className="alert alert-warning text-center mt-5" role="alert">
                            Your account has been suspended!
                        </div>;
                }
            }
        }

        //if we are adding new forum, render add-field
        if (this.state.add) {
            const { errors, newName } = this.state;
            forumEntries =
                <AddField
                    error={errors.add}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    back={this.back}
                    value={newName}
                    field="newName"
                    type="Forum"
                />
        }

        //if we are editing existing forum, render edit-field
        if (this.state.edit) {
            const { errors, renameText } = this.state;
            forumEntries =
                <EditField
                    error={errors.edit}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onClick={this.onClick}
                    back={this.back}
                    remove={this.delete}
                    value={renameText}
                    field="renameText"
                    type="Forum"
                />
        }

        return (
            <div className="container">
                {   //if Admin, render button 'add forum'
                    (group === 'Administrator') ?
                        (<div className="row">
                            <div className="col-md">
                                <button onClick={this.add} className="btn btn-primary float-right m-1">Add Forum</button>
                            </div>
                        </div>) : (null)
                }
                {forumEntries}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        forum: state.forum,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadForums: () => {
            dispatch(loadForums());
        },
        loadTopics: (directory) => {
            dispatch(loadTopics(directory));
        },
        addForum: async (currentForumID) => {
            await dispatch(addForum(currentForumID));
        },
        renameForum: async (id, name) => {
            await dispatch(renameForum(id, name));
        },
        deleteForum: async (currentForumID) => {
            await dispatch(deleteForum(currentForumID));
        },
        restoreForum: async (currentForumID) => {
            await dispatch(restoreForum(currentForumID));
        },
        loadCurrentForumID: (currentForumID) => {
            dispatch(loadCurrentForumID(currentForumID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);