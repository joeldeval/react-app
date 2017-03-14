import React from 'react';

var Repos = React.createClass({
      getInitialState: function() {
        return {
          state: 'idle',
          repos: <li>No repos yet.</li>
        };
      },
      onSubmit: function(event) {
        event.preventDefault();
        var self = this;
        var username = event.target.username.value;
        var url = "https://api.github.com/users/"+username+"/repos";
        self.setState({
          state: 'aquiring data...',
          repos: self.state.repos
        });

        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                console.log(recurso)
                 self.setState({
                     state: 'idle',
                     repos: recurso.map((repo)=> {
                         return (<li key={repo.id}>{repo.name}</li>)
                     })
                 })
            })
      },
      render: function() {
        return (
          <section>
            <form onSubmit={this.onSubmit}>
              <input type="text" placeholder="github username" name="username" ref="username" /> &nbsp;
              <input type="submit" value="enter" /> &nbsp;
              <span>{this.state.state}</span>
            </form>
            <ul>{this.state.repos}</ul>
          </section>
        );
      }
    });

    export default Repos;