import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";
import firebase from 'firebase/app';
import 'firebase/auth';
import md5 from "blueimp-md5";

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            email: '',
            password: '',
            confirmPassword: '',
            displayName: '',
            photoURL: ''
        };
    }

    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => this.setState({currentUser: user}));
    }

    componentWillUnmount() {
        this.authUnlisten();
    }

    handleSignUp() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(user => user.updateProfile({
            displayName: this.state.displayName,
            photoURL: "https://www.gravatar.com/avatar/" + md5(this.state.email)
          }))
          .then(() => this.setState({fberror: undefined}))
          .then(() => this.setState({working: false}))
          .then(this.props.history.push(ROUTES.generalChannel))
          .catch(err => this.setState({fberror: err}));
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.handleSignUp();
    }

    render() {
        let invalid = this.state.password !== this.state.confirmPassword || this.state.password === '' || this.state.email === '' || this.state.confirmPassword === '' || this.state.password.length < 6 || this.displayName === '';
        
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1>Sign Up</h1>
                    </div>
                </header>
                <main>
                    <div className="container pt-2 pb-2">
                        <p>Already have an account? <Link to={ROUTES.signIn}>Sign In!</Link></p>
                    </div>
                    <div className="container pt-2">
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
                                <label htmlFor="displayName">Display Name</label>
                                <input type="text"
                                    id="displayName"
                                    className="form-control"
                                    placeholder="the name you want displayed to other users"
                                    onChange={event => this.setState({displayName: event.target.value})}/>
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
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password"
                                    id="confirm-password"
                                    className="form-control"
                                    placeholder="confirm your password"
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