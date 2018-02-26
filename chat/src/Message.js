import React from "react";

export default class Message extends React.Component {
    render() {
        let message = this.props.messageSnap.val();
        let date = new Date(message.createdAt);
        console.log(date);
        return (
            <div>
                <h6 className="font-weight-bold"> {message.author.name} </h6>
                <p>{date.toString()}</p>
                <p> {message.body} </p>
            </div>
        )
    }
}