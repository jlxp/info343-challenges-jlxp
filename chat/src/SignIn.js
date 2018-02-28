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
            password: ''
        };
    }

    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => this.setState({currentUser: user}));
    }

    componentWillUnmount() {
        this.authUnlisten();
    }

    handleSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {this.props.history.push(ROUTES.generalChannel)})
            .then(() => this.setState({fberror: undefined}))
            .then(() => this.setState({working: false}))
            .catch(err => this.setState({fberror: err}));
    }
    
    handleSubmit(evt) {
        evt.preventDefault();
        this.handleSignIn();
    }

    render() {
        let invalid = this.state.email === "" || this.state.password === "";
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
                                <button disabled={invalid} type="submit" className="btn btn-primary">Sign In</button>
                            </div>
                        </form>
                        <p>Don't have an account yet? <Link to={ROUTES.signUp}>Sign Up!</Link></p>
                    </div>
                </main>
            </div>
        );
    }
}