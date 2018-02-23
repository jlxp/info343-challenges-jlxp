import React from "react";

export default class Message extends React.Component {
    render() {
        let message = this.props.messageSnap.val();
        return (
            <p> {message.text} </p>
        )
    }
}