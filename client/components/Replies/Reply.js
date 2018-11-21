import React from 'react';
import { Link } from 'react-router-dom';

import ReplyEntry from '../common/ReplyEntry';

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
            isValid: false,
            invalid: false,
            errors: {},
        }

        this.onContentStateChange = this.onContentStateChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
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
                    topicid: tcurrentTopicID,
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
            this.setState({ edit: true, contentState: JSON.parse(replies[Number(event.target.getAttribute('data-order'))].text) });
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

    render() {
        const { editreplies, deletereplies, replies, token } = this.props;
        if (this.state.edit) {
            return (
                <div className="container pt-1" style={{ backgroundColor: '#333338' }}>
                    <div className="reply mt-5">
                        bla bla
                        <button title="Back" className="btn btn-dark m-1" onClick={this.onClick} >Back</button>
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
                                    defaultContentState={this.state.contentState}
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
                                <button disabled={this.state.invalid} type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            //null check
            if (replies) {
                var rows = replies.map((reply, index) => 
                    <ReplyEntry
                        key={reply.replyid}
                        text={draftToHtml(JSON.parse(reply.text))}
                        firstname={reply.firstname}
                        date={reply.date}
                        id={reply.replyid}
                        order={index}
                        groupname={reply.groupname}
                        onClick={this.onClick}
                        editreplies={editreplies}
                        deletereplies={deletereplies}
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
                    <button disabled={this.state.invalid} type="submit" className="btn btn-primary">Submit</button>
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