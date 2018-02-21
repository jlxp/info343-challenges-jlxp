import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";

import firebase from 'firebase/app';
import 'firebase/auth';

// https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            displayName: '',
            photoURL: ''
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

    handleSignUp() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(user => user.updateProfile({
            displayName: this.state.displayName,
            photoURL: this.photoURL
          }))
          .then(() => this.setState({fberror: undefined}))
          .catch(err => this.setState({fberror: err}))
          .then(() => this.setState({working: false}));
    }

    handleSubmit(evt) {
        evt.preventDefault();
        //TODO: check if password is 6 char in length
        //if it was successful, then
        this.handleSignUp();
        this.props.history.push(ROUTES.generalChannel);
    }

    render() {
        let invalid = this.state.password !== this.state.confirmPassword || this.state.password === '' || this.state.email === '' || this.state.confirmPassword === '' || this.state.password.length < 6;
        
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1>Sign Up</h1>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <p>Already have an account? <Link to={ROUTES.signIn}>Sign In!</Link></p>
                    </div>
                    <div className="container">
                        <form onSubmit={evt => this.handleSubmit(evt)}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="text"
                                    id="email"
                                    className="form-control"
                                    placeholder="your email address"
                                    value={this.state.email}
                                    onChange={event => this.setState({email: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="your password"
                                    value={this.state.password}
                                    onChange={event => this.setState({password: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password"
                                    id="confirm-password"
                                    className="form-control"
                                    placeholder="confirm your password"
                                    value={this.state.confirmPassword}
                                    onChange={event => this.setState({confirmPassword: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <button disabled={invalid} type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}