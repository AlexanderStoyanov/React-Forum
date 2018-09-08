import React from 'react';
import Reply from './Reply';

import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateReply from '../../../server/shared/validations/reply';
import { replyPost } from '../../actions/replyAction';
import { addFlashMessage } from '../../actions/flashMessages';

const content = {
    "entityMap": {},
    "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]
};



class RepliesPage extends React.Component {
    constructor(props) {
        super(props);

        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
            isValid: false,
            errors: {},
        }

        this.onContentStateChange = this.onContentStateChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(event) {
        event.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, invalid: true });
            console.log(this.props);
            this.props.replyPost({ token: localStorage.getItem('token'), topicid: this.props.reply.currentDirectory, reply: JSON.stringify(this.state.contentState) }).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Account created successfully'
                    });
                },
                (err) => {
                    this.setState({ errors: err.response.data, invalid: false });

                }
            );
        }
    }

    render() {
        let replies = ['Nothing there yet..'];
        if (this.props.reply.replies) {
            replies = this.props.reply.replies[0];
        }
        return (
            <div>
                <Reply
                    replies={replies}
                />
                <form onSubmit={this.onSubmit}>
                    <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        onContentStateChange={this.onContentStateChange}
                    />
                    <button disabled={this.state.invalid} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reply: state.reply
    }
}

export default connect(mapStateToProps, { replyPost, addFlashMessage })(RepliesPage);

//<div className="modal fade bd-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//    <div className="modal-dialog" role="document">
//        <div className="modal-content">
//            <div className="modal-header">
//                <h5 className="modal-title" id="exampleModalLabel">New message</h5>
//                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                    <span aria-hidden="true">&times;</span>
//                </button>
//            </div>
//            <div className="modal-body">
//                <Reply
//                    replies={replies}
//                />
//                <form>
//                    <Editor
//                        toolbarClassName="toolbarClassName"
//                        wrapperClassName="wrapperClassName"
//                        onContentStateChange={this.onContentStateChange}
//                    />
//                </form>
//            </div>
//            <div className="modal-footer">
//                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                <button type="button" className="btn btn-primary" onClick={this.onClick}>Send message</button>
//            </div>
//        </div>
//    </div>
//</div>
