import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";

export default class SignUpView extends React.Component {
    render() {
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
                </main>
            </div>
        );
    }
}