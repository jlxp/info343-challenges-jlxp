import React from "react";
import firebase from 'firebase/app';

export default class Message extends React.Component {
        
    handleDelete(messageRef) {
        messageRef.remove();
    }

    handleEdit(messageSnap) {
        console.log("edit the message!");
        console.log(messageSnap.val());
        let editText = {
            body: messageSnap.val().body + "  edited"
        }
        console.log(editText.body);
        messageSnap.ref.update(editText);
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
            editButton = (
                <button className="btn btn-outline-primary btn-sm" onClick={() => this.handleEdit(this.props.messageSnap)}>Edit</button>
            );
        }
        return (
            <div id="message">
                <h6 className="font-weight-bold"> {message.author.name} </h6>
                <p>{date.toString()}</p>
                <p> {message.body} </p>
                {editButton}{delButton}
            </div>
        )
    }
}