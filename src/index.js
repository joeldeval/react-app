import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import Repos from './Repos';

//import NavBar from './components/navbar'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap-social/bootstrap-social.css'
import 'bootstrap-social/assets/css/font-awesome.css'


firebase.initializeApp({
    apiKey: "APIKEYINYURAPPFIREBASE",
    authDomain: "app.firebaseapp.com",
    databaseURL: "https://app.firebaseio.com",
    storageBucket: "app.appspot.com",
    messagingSenderId: "IDAPPIREBASE"
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

ReactDOM.render(
  <Repos />,
  document.getElementById('repos')
);