 import React from "react";
 
 export default class NewMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            fbError: undefined
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let message = {
            text: this.state.message
        };
        this.props.messagesRef.push(message)
            .then(() => this.setState({message: "", fbError: undefined}))
            .catch(err => this.setState({fbError: err}));
    }

    render() {
        return (
            <form className="mb-4" onSubmit={event => this.handleSubmit(event)}>
                {
                    this.state.fbError ? 
                    <div className="alert alert-danger">{this.state.fbError.message}</div> : 
                    undefined
                }
                <input type="text"
                    className="form-control"
                    value={this.state.message}
                    placeholder="Type a message"
                    onInput={evt => this.setState({message: evt.target.value})}
                />
            </form>
        );
    }
 }