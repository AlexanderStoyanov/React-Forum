import React from 'react';
import ForumEntry from '../common/ForumEntry';
import { withRouter } from 'react-router-dom';
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

    delete(event) {
        event.preventDefault();
        this.props.deleteForum(this.props.currentForumid);
    }

    back() {
        this.setState({ edit: false, add: false });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.edit) {
            this.props.renameForum(this.props.currentForumid, this.state.renameText);
        }
        else if (this.state.add) {
            this.props.addForum(this.state.newName);
        }
        this.setState({ edit: false, add: false });
    }

    onClick(event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            this.props.loadTopics(event.target.name);
        }
        else if (event.target.title === 'edit') {
            this.props.loadCurrentForumID(event.target.name);
            this.setState({ edit: true });
        }
        else if (event.target.title === 'restore') {
            event.preventDefault();
            this.props.restoreForum(event.target.name);
        } 
    }

    render() {
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
            var rows = [];
            for (var i = 0; i < this.props.forumNames.length; i++) {
                if (this.props.group === 'Administrator') {
                    rows.push(<ForumEntry
                        key={i}
                        forumName={this.props.forumNames[i].forumname}
                        forumURL={this.props.forumNames[i].forumname}
                        forumID={this.props.forumNames[i].forumid}
                        group={this.props.group}
                        deleted={this.props.forumNames[i].deleted}
                        onClick={this.onClick}
                    />);
                }
                else if (this.props.forumNames[i].deleted !== '1') {
                    rows.push(<ForumEntry
                        key={i}
                        forumName={this.props.forumNames[i].forumname}
                        forumURL={this.props.forumNames[i].forumname}
                        forumID={this.props.forumNames[i].forumid}
                        group={this.props.group}
                        deleted={this.props.forumNames[i].deleted}
                        onClick={this.onClick}
                    />);
                }
            }

            return (
                <div className="forumWrap">
                    <div className="row">
                        <div className="col-md">
                            <button onClick={this.add} className="btn btn-primary float-right m-1">Add Forum</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            {rows}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Forum)