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
      let pandoraSelectOptions = [];

      if (playlistItem.pandoraSelectOptions) {
        pandoraSelectOptions = playlistItem.pandoraSelectOptions.map((selectOption) => {
          return (
            <option value={ selectOption.musicToken }>{ `${selectOption.artistName} - ${selectOption.songName}` }</option>
          )
        })
      }
      
      return (
        <form id={ idx } onSubmit={ this.props.handleSubmit }>
          <p key={ videoId }>{ songTitle }</p>
          <p>
            <label htmlFor="pandoraMusicToken">pandora music token</label>
            <input name="pandoraMusicToken" type="text" readOnly value={ playlistItem.pandoraMusicToken }/>
          </p>
          <p>
            <label htmlFor="pandoraSongTitle">pandora song title</label>
            <input name="pandoraSongTitle" type="text" placeholder={ songTitle }/>
          </p>
          <p>
            <label htmlFor="pandoraSelect">pandora song select</label>
          { playlistItem.pandoraSelectOptions &&
            <select id="pandoraSelect">
              { pandoraSelectOptions }
            </select>
          }
          </p>
          <input type="button" onClick={ this.props.updatePandoraSelectItems } />
          <input type="submit" value="submit change"/>
        </form>
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