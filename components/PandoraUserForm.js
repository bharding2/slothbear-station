import React, { Component } from 'react';

class PandoraUserForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onChange={ this.props.handleChange } onSubmit={ this.props.handleSubmit }>
        <p>
          <label htmlFor="pandoraEmail">pandoraEmail</label>
          <input id="email" value={ this.props.pandoraUser.email } />
        </p>
        <p>
          <label htmlFor="pandoraPassword">pandoraPassword</label>
          <input id="password" value={ this.props.pandoraUser.password } type="password" />
        </p>
        <input type="submit" value="load pandora" />
        <p>Pandora Loaded: { this.props.pandoraLoaded.toString() } </p>

        { this.props.pandoraLoaded &&
          <p>username: { this.props.pandora.username } </p>
        }
      </form>
    )
  }
}

export default PandoraUserForm;