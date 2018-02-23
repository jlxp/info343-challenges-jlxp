import React from "react";
// import {Link} from "react-router-dom";
// import {ROUTES} from "./constants";

export default class SignedOutView extends React.Component {
    render() {
        return (
            <div className="alert alert-success" role="alert">
                Successfully signed out!
            </div>
        );
    }

}