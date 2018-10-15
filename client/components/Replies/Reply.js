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
        //if validation done with no errors
        if (this.isValid()) {
            //
            this.setState({ errors: {}, invalid: true });
            //editing reply - update existing reply
            if (this.state.edit) {
                await this.props.updateReply({
                    token: this.props.token,
                    replyid: this.props.currentReplyID,
                    reply: JSON.stringify(this.state.contentState),
                });
            }
            else {
                //else create new reply
                await this.props.postReply({
                    token: this.props.token,
                    topicid: this.props.currentTopicID,
                    reply: JSON.stringify(this.state.contentState),
                    userid: null
                });
            }
            //reset state to the default one
            this.setState({ contentState: null, invalid: false, edit: false });
            //refresh replies list
            this.props.loadReplies(this.props.currentTopicID);
        }
    }

    async onClick(event) {
        event.preventDefault();
        if (event.target.title === 'Edit') {
            this.props.loadCurrentReplyID(event.target.name);
            this.setState({ edit: true, contentState: JSON.parse(this.props.replies[Number(event.target.getAttribute('data-order'))].text) });
        }
        else if (event.target.title === 'Delete') {
            await this.props.deleteReply(event.target.name);
            //refresh replies list after deletion
            this.props.loadReplies(this.props.currentTopicID);
        }
        else if (event.target.title === 'Back') {
            this.setState({ edit: false });
        }
    }

    render() {
        if (this.state.edit) {
            return (
                <div className="container pt-1" style={{ background: '#e4e4e4' }}>
                    <div className="reply mt-5">
                        bla bla
                        <button title="Back" class="btn btn-dark m-1" onClick={this.onClick} >Back</button>
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
            if (this.props.replies) {
                var rows = this.props.replies.map((reply, index) => 
                    <ReplyEntry
                        key={reply.replyid}
                        text={draftToHtml(JSON.parse(reply.text))}
                        firstname={reply.firstname}
                        date={reply.date}
                        id={reply.replyid}
                        order={index}
                        groupname={reply.groupname}
                        onClick={this.onClick}
                        editreplies={this.props.editreplies}
                        deletereplies={this.props.deletereplies}
                    />
                );
            }

            let editor = null;
            if (this.props.token) {
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
                editor = <div class="alert alert-info text-center" role="alert">
                    Please, 
                    <Link to="/signin" className="nav-link d-inline" >Sign In</Link>
                    or
                    <Link to="/signup" className="nav-link d-inline" >Sign Up</Link>
                    to comment!
              </div>;
            }

            return (
                <div className="container pt-1" style={{ background: '#e4e4e4' }}>
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