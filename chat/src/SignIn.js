import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";

import firebase from 'firebase/app';
import 'firebase/auth';



export default class SignInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            email: '',
            password: '',
        };
    }


    /**
     * Called by React when this component
     * is first "mounted" into the DOM, 
     * meaning that it was rendered for the
     * first time.
     */
    componentDidMount() {
        //TODO: listen for Firebase authentication
        //state changes and set the `currentUser`
        //state property
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => this.setState({currentUser: user}));
    }
    /**
     * Called by react when this component is
     * about to be "unmounted," meaning that
     * React is about to remove it's rendered
     * content from the DOM.
     */
    componentWillUnmount() {
        //TODO: stop listening for Firebase
        //authentication state changes so that
        //we don't call this.setState() while
        //unmounted.
        this.authUnlisten();
    }

    handleSignIn() {
        //TODO: sign in using the email and password
        //state values
        // this.setState({working: true});
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {this.props.history.push(ROUTES.generalChannel)})
            .then(() => this.setState({fberror: undefined}))
            .catch(err => this.setState({fberror: err}))
            .then(() => this.setState({working: false}));
    }
    
    handleSubmit(evt) {
        evt.preventDefault();
        this.handleSignIn();
    }

    render() {
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-primary text-white">
                    <div className="container">
                        <h1>Sign In</h1>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <form onSubmit={evt => this.handleSubmit(evt)}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="text"
                                    id="email"
                                    className="form-control"
                                    placeholder="your email address"
                                    onChange={event => this.setState({email: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="your password"
                                    onChange={event => this.setState({password: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </div>
                        </form>
                        <p>Don't have an account yet? <Link to={ROUTES.signUp}>Sign Up!</Link></p>
                    </div>
                </main>
            </div>
        );
    }
}