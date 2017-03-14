import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

import FileUpoad from './FileUpload';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    };

    this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
    this.handleAuthFB = this.handleAuthFB.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  
  handleAuthGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();    
    
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleAuthFB(){
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    
  }
  
  renderLoginButton(){
    if(this.state.user){
      return(
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName}!</p>

          <button onClick={this.handleLogout}>Salir</button>
          
          <FileUpoad/>
        </div>
      );
    }else{
      return(
      <div>
        <button onClick={this.handleAuthGoogle} className="btn btn-block btn-social btn-google">
          <span className="fa fa-google"></span>Entrar con Google
        </button>
        <button onClick={this.handleAuthFB} className="btn btn-block btn-social btn-facebook">
          <span className="fa fa-facebook"></span>  Entrar con Facebook
        </button>
      </div>
      
      );  
  }
  }
  
  render() {
    return (      
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          { this.renderLoginButton() }
        </div>
      </div>
    );
  }
}

export default App;
