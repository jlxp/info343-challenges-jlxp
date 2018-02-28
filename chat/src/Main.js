import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import NewMessageForm from "./NewMessageForm";
import MessageList from "./MessageList";

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesRef: undefined,
            messagesSnap: undefined
        }
    }
    
    componentDidMount() {
        this.unlistenAuth = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let ref = firebase.database().ref(`messages/general`);
                this.valueListener = ref.on("value", snapshot => this.setState({messagesSnap: snapshot}));
                this.setState({messagesRef: ref});
            }
        });
    }
    
    componentWillUnmount() {
        this.unlistenAuth();
        this.state.messagesRef.off("value", this.valueListener);
    }
    
    componentWillReceiveProps(nextProps) {
        this.state.messagesRef.off("value", this.valueListener);
        let ref = firebase.database().ref(`messages/${nextProps.match.params.channelName}`);
        this.valueListener = ref.on("value", snapshot => this.setState({messagesSnap: snapshot}));
        this.setState({messagesRef: ref});
    }

    handleSignOut() {
        firebase.auth().signOut();
    }    
        
    render() {
        return (
            <div>
                <header className="bg-primary text-white fixed-top">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col">
                                <h1 className="col">#{this.props.match.params.channelName}</h1>
                            </div>
                            <div className="col-auto">
                                <Link to={ROUTES.signIn}>
                                    <button type="button" onClick={this.handleSignOut} className="btn btn-primary">
                                        <svg width="24" height="24" fill="#FFF" viewBox="0 0 24 24"
                                            role="button"
                                            aria-label="sign out button"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <div className="row">
                            <div className="col-2" id="side-nav">
                                <button className="btn btn-outline-primary" id="general">#
                                        {
                                            this.props.match.params.channelName !== "general" ? 
                                            <Link to={ROUTES.generalChannel}>general</Link> :
                                            "general"
                                        }
                                </button>
                                <button className="btn btn-outline-primary" id="random">#
                                {
                                        this.props.match.params.channelName !== "random" ?
                                        <Link to={ROUTES.randomChannel}>random</Link> :
                                        "random"
                                }
                                </button>
                            </div>
                            <div className="col" id="content">
                                <div className="" id="messages">
                                    <MessageList messagesSnap={this.state.messagesSnap} />
                                </div>
                                <div id="new-message">
                                    <NewMessageForm messagesRef={this.state.messagesRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}