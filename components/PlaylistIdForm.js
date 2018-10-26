import React, { Component } from 'react';
import './PlaylistIdForm.css';

class PlaylistIdForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onChange={ this.props.handleChange } onSubmit={ this.props.handleSubmit }>
        <p>
          <label htmlFor="playlistId">playlistId</label>
          <input id="playlistId" value={ this.props.playlistId } />
        </p>
        <input type="submit" value="get playlist" />
      </form>
    )
  }
}

export default PlaylistIdForm;