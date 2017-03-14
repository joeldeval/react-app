import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';
import FileUpload from './FileUpload';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      pictures: []
    };

    this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
    this.handleAuthFB = this.handleAuthFB.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
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
  
  handleUpload (event){
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
      const task = storageRef.put(file);

      task.on('state_changed', snapshot => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
              upladValue: percentage
          })
      }, error => { 
          console.log(error.message)
      }, () => {
         const record = {
           photoURL: this.state.user.photoURL,
           displayName: this.state.user.displayName,
           image: task.snapshot.downloadURL
         };

         const dbRef = firebase.database().ref('pictures');
         const newPicture = dbRef.push();

         newPicture.set(record);

      });
  }

  renderLoginButton(){
    if(this.state.user){
      return(
        <div className="App-intro">
          <p className="App-intro">¡Hola, { this.state.user.displayName }!</p>

          <button onClick={this.handleLogout} className="App-btn">
            Salir
          </button>

          <FileUpload onUpload={ this.handleUpload }/>

          {
            this.state.pictures.map(picture => (
              <div key={picture.image} className="App-card">
                <figure className="App-card-image">
                  <img width="320" src={picture.image} alt=""/>
                  <figCaption className="App-card-footer">
                    <img className="App-card-avatar" src={picture.photoURL} alt={picture.displayName} />
                    <span className="App-card-name">{picture.displayName}</span>
                  </figCaption>
                </figure>
              </div>
            )).reverse()
          }

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
