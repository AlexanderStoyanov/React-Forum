import React from 'react';
import ForumEntry from '../common/ForumEntry';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Forum extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            edit: false,
            add: false,
            newName: '',
            renameText: '',
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.back = this.back.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    add() {
        this.setState({ add: true });
    }

    async delete(event) {
        event.preventDefault();
        await this.props.deleteForum(this.props.currentForumID);
        this.setState({ edit: false, add: false });
        this.props.loadForums();
    }

    back() {
        this.setState({ edit: false, add: false });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async onSubmit(event) {
        event.preventDefault();
        if (this.state.edit) {
            await this.props.renameForum(this.props.currentForumID, this.state.renameText);
            this.props.loadForums();
        }
        else if (this.state.add) {
            await this.props.addForum(this.state.newName);
            this.props.loadForums();
        }
        this.setState({ edit: false, add: false });
    }

    async onClick(event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            this.props.loadTopics(event.target.name);
        }
        else if (event.target.title === 'edit') {
            this.props.loadCurrentForumID(event.target.name);
            this.setState({ edit: true });
        }
        else if (event.target.title === 'restore') {
            event.preventDefault();
            await this.props.restoreForum(event.target.name);
            this.props.loadForums();
        }
    }

    render() {
        const { group, token } = this.props;

        if (this.state.edit) {
            const { errors } = this.state;
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    error={errors.rename}
                                    label="Rename"
                                    onChange={this.onChange}
                                    value={this.state.renameText}
                                    field="renameText"
                                    type="text"
                                />
                                <button type="submit" className="btn btn-primary m-1">Rename</button>
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                                <button onClick={this.delete} className="btn btn-danger float-right m-1">Delete Forum</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.add) {
            const { errors } = this.state;
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    error={errors.add}
                                    label="New Forum Name"
                                    onChange={this.onChange}
                                    value={this.state.newName}
                                    field="newName"
                                    type="text"
                                />
                                <button type="submit" className="btn btn-primary m-1">Add</button>
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            var rows = null;
            //if signed in, create forum-entries
            if (token) {
                rows = this.props.forumNames.map(forum => {
                    //if Admin, return deleted and non-deleted forums
                    if (group === 'Administrator') {
                        return <ForumEntry
                            key={forum.forumid}
                            forumName={forum.forumname}
                            forumID={forum.forumid}
                            deleted={forum.deleted}
                            group={group}
                            onClick={this.onClick}
                        />;
                    } else if (forum.deleted !== '1') {
                        //else if forum was deleted, and group is not Admin, do not render forum
                        return <ForumEntry
                            key={forum.forumid}
                            forumName={forum.forumname}
                            forumID={forum.forumid}
                            deleted={forum.deleted}
                            group={group}
                            onClick={this.onClick}
                        />;
                    }
                });
            } else {
                //if not signed in, display alert
                rows = (<div className="alert alert-info text-center mt-5" role="alert">
                    Please, &nbsp;
                    <Link to="/signin" className="alert-link d-inline" >Sign In</Link>
                    &nbsp; or &nbsp;
                    <Link to="/signup" className="alert-link d-inline" >Sign Up</Link>
                    &nbsp; to participate!
            </div>);
            }

            return (
                <div className="forumWrap">
                    {   //if Admin, render button 'add forum'
                        (group === 'Administrator') ?
                            (<div className="row">
                                <div className="col-md">
                                    <button onClick={this.add} className="btn btn-primary float-right m-1">Add Forum</button>
                                </div>
                            </div>) : (null)
                    }
                    <div className="row">
                        <div className="col-md">
                            {   //if blocked, render alert
                                (this.props.blocked === '1') ?
                                    (<div className="alert alert-warning text-center mt-5" role="alert">
                                        Your account has been suspended!
                                    </div>) : (rows)
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Forum)