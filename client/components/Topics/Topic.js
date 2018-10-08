import React from 'react';
import PropTypes from 'prop-types';
import TopicEntry from '../common/TopicEntry';
import TextFieldGroup from '../common/TextFieldGroup';

class Topic extends React.Component {
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
        this.props.deleteTopic(this.props.currentTopicid);
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
            this.props.renameTopic(this.props.currentTopicid, this.state.renameText);
        }
        else if (this.state.add) {
            this.props.addTopic(this.props.currentForumid, this.state.newName);
        }
        this.setState({ edit: false, add: false });
    }

    onClick(event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            this.props.loadCurrentTopicID(event.target.name);
            this.props.loadReplies(event.target.name);
        }
        else if (event.target.title === 'edit') {
            this.props.loadCurrentTopicID(event.target.name);
            this.setState({ edit: true });
        } 
        else if (event.target.title === 'restore') {
            event.preventDefault();
            this.props.restoreTopic(event.target.name);
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
                                <button onClick={this.delete} className="btn btn-danger float-right m-1">Delete Topic</button>
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
                                    label="New Topic Name"
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
            for (var i = 0; i < this.props.topicNames.length; i++) {
                if (this.props.deletetopics === '1') {
                    rows.push(<TopicEntry
                        key={i}
                        topicName={this.props.topicNames[i].topicname}
                        forumURL={this.props.forumURL}
                        topicURL={this.props.topicNames[i].topicname}
                        onClick={this.onClick}
                        topicID={this.props.topicNames[i].topicid}
                        group={this.props.group}
                        deleted={this.props.topicNames[i].deleted}
                        match={this.props.match}
                        edittopics={this.props.edittopics}
                        deletetopics={this.props.deletetopics}
                    />);
                }
                else if (this.props.topicNames[i].deleted !== '1') {
                    rows.push(<TopicEntry
                        key={i}
                        topicName={this.props.topicNames[i].topicname}
                        forumURL={this.props.forumURL}
                        topicURL={this.props.topicNames[i].topicname}
                        onClick={this.onClick}
                        topicID={this.props.topicNames[i].topicid}
                        group={this.props.group}
                        deleted={this.props.topicNames[i].deleted}
                        match={this.props.match}
                        edittopics={this.props.edittopics}
                        deletetopics={this.props.deletetopics}
                    />);
                }
            }
        }

        return (
        <div className="topicWrap">
            <div className="row">
                <div className="col-md">
                    <button onClick={this.add} className="btn btn-primary float-right m-1">Add Topic</button>
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

Topic.propTypes = {
    topicNames: PropTypes.array,
}

export default Topic