import React from 'react';
import { Link } from 'react-router-dom';

import ReplyEntry from '../common/ReplyEntry';
import GroupSelectionEntry from '../common/GroupSelectionEntry';

import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import validateReply from '../../../server/shared/validations/reply';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';

const content = {
    "entityMap": {},
    "blocks": [{ "key": "637gr", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]
};

class Reply extends React.Component {
    constructor(props) {
        super(props);

        const contentState = convertFromRaw(content);
        this.state = {
            edit: false,
            contentState,
            date: null,
            name: null,
            group: null,
            isValid: false,
            invalid: false,
            errors: {},
        }

        this.onContentStateChange = this.onContentStateChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onContentStateChange(contentState) {
        this.setState({
            contentState,
        });
    };

    isValid() {
        const { errors, isValid } = validateReply(this.state.contentState.blocks[0]);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    async onSubmit(event) {
        event.preventDefault();
        const { updateReply, postReply, loadReplies, token, currentReplyID, currentTopicID } = this.props;
        //if validation done with no errors
        if (this.isValid()) {
            //if input is valid
            this.setState({ errors: {}, invalid: true });
            //editing reply - update existing reply
            if (this.state.edit) {
                await updateReply({
                    token: token,
                    replyid: currentReplyID,
                    reply: JSON.stringify(this.state.contentState),
                });
            }
            else {
                //else create new reply
                await postReply({
                    token: token,
                    topicid: currentTopicID,
                    reply: JSON.stringify(this.state.contentState),
                    userid: null
                });
            }
            //reset state to the default one
            this.setState({ contentState: null, invalid: false, edit: false });
            //refresh replies list
            loadReplies(currentTopicID);
        }
    }

    async onClick(event) {
        event.preventDefault();
        const { loadCurrentReplyID, deleteReply, loadReplies, currentTopicID, replies } = this.props;
        if (event.target.title === 'Edit') {
            loadCurrentReplyID(event.target.name);
            this.setState({ 
                edit: true, 
                contentState: JSON.parse(replies[Number(event.target.getAttribute('data-order'))].text),
                date: replies[Number(event.target.getAttribute('data-order'))].date,
                name: replies[Number(event.target.getAttribute('data-order'))].firstname,
                group: replies[Number(event.target.getAttribute('data-order'))].groupname,
            });
        }
        else if (event.target.title === 'Delete') {
            await deleteReply(event.target.name);
            //refresh replies list after deletion
            loadReplies(currentTopicID);
        }
        else if (event.target.title === 'Back') {
            this.setState({ edit: false });
        }
    }

    async onChange(event) {
        const { updateUsers, addFlashMessage, groups, loadReplies, currentTopicID } = this.props;
        //if we are selecting new group from grouplist
        var text = 'Groups assigned successfully!';
        if (event.target.tagName.toLowerCase() === "select") {
            var userID = event.target.getAttribute("data-userid");
        }
        await updateUsers({[userID]: event.target.value});
        loadReplies(currentTopicID);

        //if no error, add success message
        if (!groups.error) {
            addFlashMessage({
                type: 'success',
                text: text,
            });
            //else if error, add error message
        } else {
            addFlashMessage({
                type: 'error',
                text: groups.error,
            });
        }
    }

    render() {
        const { editreplies, deletereplies, replies, token, groups } = this.props;
        const { edit, invalid, contentState, date, name, group } = this.state;
        if (edit) {
            return (
                <div className="container pt-1">
                    <div className="reply mt-5">
                        <h3 className="text-center">Preview</h3>
                        <ReplyEntry
                            text={draftToHtml(contentState)}
                            date={date}
                            firstname={name}
                            groupname={group}
                        />
                    </div>


                    <div className="row mt-3">
                        <div className="col-md">
                            {/*Apparently, this textarea below is necessary to properly set defaultContentState prop of the Editor.
                                If removed, Editor would be empty on EDIT_REPLY action
                            */}
                            <textarea
                                hidden
                            />
                            <form onSubmit={this.onSubmit}>
                                <Editor
                                    defaultContentState={contentState}
                                    toolbarClassName="toolbarClass"
                                    editorClassName="editorClass"
                                    onContentStateChange={this.onContentStateChange}
                                    toolbar={{
                                        inline: {
                                            inDropdown: false,
                                            className: 'red',
                                        }
                                    }}
                                />
                                <button disabled={invalid} type="submit" className="btn btn-primary m-1">Submit</button>
                                <button title="Back" className="btn btn-dark m-1" onClick={this.onClick} >Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            //null check
            if (replies) {
                if(groups.groupsData) {
                    var groupSelectionArray = groups.groupsData.map(group =>
                        <GroupSelectionEntry
                            groupID={group.groupid}
                            groupName={group.groupname}
                        />);
                }

                var rows = replies.map((reply, index) =>
                    <ReplyEntry
                        key={reply.replyid}
                        text={draftToHtml(JSON.parse(reply.text))}
                        firstname={reply.firstname}
                        userid={reply.userid}
                        date={reply.date}
                        id={reply.replyid}
                        order={index}
                        groupname={reply.groupname}
                        onClick={this.onClick}
                        onChange={this.onChange}
                        editreplies={editreplies}
                        deletereplies={deletereplies}
                        groupSelectionArray={groupSelectionArray}
                    />
                );
            }

            let editor = null;
            if (token) {
                editor = <form onSubmit={this.onSubmit}>
                    <Editor
                        toolbarClassName="toolbarClass"
                        editorClassName="editorClass"
                        onContentStateChange={this.onContentStateChange}
                        toolbar={{
                            inline: {
                                inDropdown: false,
                                className: 'red',
                            }
                        }}
                    />
                    <button disabled={invalid} type="submit" className="btn btn-primary m-1">Submit</button>
                </form>;
            } else {
                editor = <div className="alert alert-info text-center" role="alert">
                    Please,
                    <Link to="/signin" className="nav-link d-inline" >Sign In</Link>
                    or
                    <Link to="/signup" className="nav-link d-inline" >Sign Up</Link>
                    to comment!
              </div>;
            }

            return (
                <div className="container pt-1" style={{ backgroundColor: '#222229' }}>
                    <div className="reply mt-5">
                        {rows}
                    </div>

                    <div className="row mt-3">
                        <div className="col-md">
                            {editor}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Reply