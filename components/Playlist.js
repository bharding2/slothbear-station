import React, { Component } from 'react';
import PlaylistSong from './PlaylistSong';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playlistEmbedSrc = `https://www.youtube.com/embed/?listType=playlist&list=${this.props.playlistId}&showinfo=1`;

    let playlistItems = this.props.playlist.map((playlistItem) => {
      let videoId = playlistItem.contentDetails.videoId;
      let songTitle = playlistItem.snippet.title.split(' (')[0];

      return(
        <PlaylistSong key={ videoId } songTitle={ songTitle } />
      )
    });

    return (
      <div>
        <iframe width="560" height="315" src={ playlistEmbedSrc } frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

        { playlistItems }
      </div>
    )
  }
}

export default Playlist;