import React, { Component } from 'react';
import PlaylistUpdateForm from './PlaylistUpdateForm';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playlistEmbedSrc = `https://www.youtube.com/embed/?listType=playlist&list=${this.props.playlistId}&showinfo=1`;

    return (
      <div>
        <iframe width="560" height="315" src={ playlistEmbedSrc } frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

        <PlaylistUpdateForm playlist={ this.props.playlist } pandora={ this.props.pandora } handleSubmit={ this.props.handleSubmit }/>
      </div>
    )
  }
}

export default Playlist;