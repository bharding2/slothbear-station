import React, { Component } from 'react';
import './PlaylistUpdateForm.css';

class PlaylistUpdateForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playlistItems = this.props.playlist.map((playlistItem, idx) => {
      let videoId = playlistItem.contentDetails.videoId;
      let songTitle = playlistItem.snippet.title.split(' (')[0];

      return (
        <form id={ idx } onSubmit={ this.props.handleSubmit }>
          <p key={ videoId }>{ songTitle }</p>
          <p>
            <label htmlFor="pandoraSongId">pandora song id</label>
            <input name="pandoraSongId" type="text" readOnly value={ playlistItem.songId }/>
          </p>
          <p>
            <label htmlFor="pandoraSongTitle">pandora song title</label>
            <input name="pandoraSongTitle" type="text"/>
          </p>
          <input type="submit" value="submit change"/>
        </form>
      )
    });

    // form
    // playlist item - songTitle input to music.search for songs.musicToken
    // search box (dropdown?)
    // submit with musicToken, pandora songTitle, visual indication it has music token
    // updates entire playlist

    return (
      <div>{ playlistItems }</div>
    )
  }
}

export default PlaylistUpdateForm;

// get pandoraId song
// add pandoraId to App level playlist
// App level setState with submit handler