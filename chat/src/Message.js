import React from "react";
import firebase from 'firebase/app';
import EditModal from "./Modal.js"

export default class Message extends React.Component {

    handleDelete(messageRef) {
        messageRef.remove();
    }

    render() {
        let message = this.props.messageSnap.val();
        let date = new Date(message.createdAt);
        let delButton = null;
        let editButton = null;
        if (firebase.auth().currentUser.uid === message.author.uid) {
            delButton = (
                <button className="btn btn-outline-primary btn-sm" onClick={() => this.handleDelete(this.props.messageSnap.ref)}>Delete</button>
            );
            editButton = (<EditModal messageSnap={this.props.messageSnap}/>);
        }
        return (
            <div className="pb-3" id="message">
                <div className="d-flex border-bottom">
                    <img src={message.author.photoUrl} alt={message.author.name} height="32" width="32" className="rounded-circle"/>
                    <h5 className="font-weight-bold pl-3"> {message.author.name} </h5>
                </div>
                <p className="font-weight-light">{date.toLocaleString()}</p>
                <p> {message.body} </p>
                <div className="d-flex">
                {editButton}{delButton}
                </div>
            </div>
        )
    }
}