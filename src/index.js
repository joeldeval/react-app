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
    apiKey: "AIzaSyAwmhWx1M-vVbTySBOsvbEu0Z1JFN6GgDY",
    authDomain: "gram-56ba4.firebaseapp.com",
    databaseURL: "https://gram-56ba4.firebaseio.com",
    storageBucket: "gram-56ba4.appspot.com",
    messagingSenderId: "927189741449"
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

ReactDOM.render(
  <Repos />,
  document.getElementById('repos')
);