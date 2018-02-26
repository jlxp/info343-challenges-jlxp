import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";

export default class SignedOutView extends React.Component {
    render() {
        return (
            <main>
                <div className="alert alert-success" role="alert">
                    Successfully signed out!
                </div>
                <div className="container">
                    <p>Want to Sign back in? <Link to={ROUTES.signIn}>Sign In!</Link></p>
                </div>
            </main>
    );
    }

}