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

    async delete(event) {
        event.preventDefault();
        await this.props.deleteTopic(this.props.currentTopicid);
        this.setState({ edit: false, add: false });
        //refresh page
        this.props.loadTopics(this.props.currentForumid);
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
            await this.props.renameTopic(this.props.currentTopicid, this.state.renameText);
            //refresh page
            this.props.loadTopics(this.props.currentForumid);
        }
        else if (this.state.add) {
            await this.props.addTopic(this.props.currentForumid, this.state.newName);
            //refresh page
            this.props.loadTopics(this.props.currentForumid);
        }
        this.setState({ edit: false, add: false });
    }

    async onClick(event) {
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
            await this.props.restoreTopic(event.target.name);
            //refresh page
            this.props.loadTopics(this.props.currentForumid);
        }
    }

    render() {
        if (this.state.edit) {
            const { errors } = this.state;
            let renameComponents = null;
            let deleteButton = null;
            if (this.props.deletetopics === '1') {
                deleteButton = <button onClick={this.delete} className="btn btn-danger float-right m-1">Delete Topic</button>;
            }
            if (this.props.edittopics === '1') {
                renameComponents = <div className="d-inline">
                    <TextFieldGroup
                        error={errors.rename}
                        label="Rename"
                        onChange={this.onChange}
                        value={this.state.renameText}
                        field="renameText"
                        type="text"
                    />
                    <button type="submit" className="btn btn-primary m-1">Rename</button>
                </div>
            }
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                {renameComponents}
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                                {deleteButton}
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
            var rows = this.props.topicNames.map(topic => {
                if (this.props.deletetopics === '1') {
                    return <TopicEntry
                        key={topic.topicid}
                        topicID={topic.topicid}
                        topicName={topic.topicname}
                        deleted={topic.deleted}
                        forumURL={this.props.forumURL}
                        onClick={this.onClick}
                        group={this.props.group}
                        match={this.props.match}
                        edittopics={this.props.edittopics}
                        deletetopics={this.props.deletetopics}
                    />;
                } else if (topic.deleted !== '1') {
                    return <TopicEntry
                        key={topic.topicid}
                        topicID={topic.topicid}
                        topicName={topic.topicname}
                        deleted={topic.deleted}
                        forumURL={this.props.forumURL}
                        onClick={this.onClick}
                        group={this.props.group}
                        match={this.props.match}
                        edittopics={this.props.edittopics}
                        deletetopics={this.props.deletetopics}
                    />;
                }
            });
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