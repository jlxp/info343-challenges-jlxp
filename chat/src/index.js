import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase/app";

var config = {
    apiKey: "AIzaSyAq1jj1yFhQD6g6yl9XZtJhSKM6f1JxINM",
    authDomain: "architecting-apps-de4d0.firebaseapp.com",
    databaseURL: "https://architecting-apps-de4d0.firebaseio.com",
    projectId: "architecting-apps-de4d0",
    storageBucket: "architecting-apps-de4d0.appspot.com",
    messagingSenderId: "872139235286"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();