import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";

// firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageRef: undefined,
            messageSnap: undefined
        }
    }
    
    componentDidMount() {
        console.log("main view did mount");
        // this.authUnlisten = firebase.auth().onAuthStateChanged(user => this.setState({currentUser: user}));
    }
    componentWillUnmount() {
        console.log("main view will unmount");
        // this.authUnlisten();
    }
    componentWillReceiveProps(nextProps) {
        console.log("switching from %s channel to %s channel",
            this.props.match.params.channelName,
            nextProps.match.params.channelName);
    }

    handleSignOut() {
        console.log("user signed out")
        firebase.auth().signOut();
    }
        
    render() {
        return (
            <div>
                <header className="bg-secondary text-white">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col">
                                <h1 className="col">#{this.props.match.params.channelName}</h1>
                            </div>
                            <div className="col-auto">
                                <Link to={ROUTES.signedOut}>
                                    <button type="button" onClick={this.handleSignOut} className="btn btn-secondary">
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
                    <ul>
                        <li>
                            {
                                this.props.match.params.channelName !== "general" ? 
                                <Link to={ROUTES.generalChannel}>general</Link> :
                                "general"
                            }
                        </li>
                        <li><Link to={ROUTES.randomChannel}>random</Link></li>
                    </ul>
                    <form className="mb-4">
                        <input type="text"
                            className="form-control"
                            // value={this.state.q}
                            placeholder="Type a message"
                            // onInput={evt => this.setState({q: evt.target.value})}
                        />
                    </form>
                </main>
            </div>
        );
    }
}