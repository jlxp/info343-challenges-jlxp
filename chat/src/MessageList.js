import React from "react";
import Message from "./Message";


export default class MessageList extends React.Component {
    render() {
        if (!this.props.messagesSnap) {
            return <p>loading...</p>
        }
        let messages = [];
        this.props.messagesSnap.forEach(messageSnap => {
            // let message = messageSnap.val();
            messages.push(<Message key={messageSnap.key} messageSnap={messageSnap} />)
        });

        return(
            <ul> {messages} </ul>
        );
    }
}