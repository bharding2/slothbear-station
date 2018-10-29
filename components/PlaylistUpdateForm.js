import React, { Component } from 'react';
import './PlaylistUpdateForm.css';

class PlaylistUpdateForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playlistItems = this.props.playlist.map((playlistItem) => {
      let videoId = playlistItem.contentDetails.videoId;
      let songTitle = playlistItem.snippet.title.split(' (')[0];

      return (
        <p key={ videoId }>{ songTitle }</p>
      )
    });

    return (
      <div>{ playlistItems }</div>
    )
  }
}

export default PlaylistUpdateForm;

// get pandoraId song
// add pandoraId to App level playlist
// App level setState with submit handler