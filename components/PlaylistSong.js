import React, { Component } from 'react';
import './PlaylistSong.css';

class PlaylistSong extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p >{ this.props.songTitle }</p>
    )
  }
}

export default PlaylistSong;

// get pandoraId song
// add pandoraId to App level playlist
// App level setState with submit handler