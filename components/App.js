import React, { Component } from 'react';
import PlaylistIdForm from './PlaylistIdForm';
import PandoraUserForm from './PandoraUserForm';
import Playlist from './Playlist';
import './App.css';

const Anesidora = require('anesidora');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pandoraUser: {
        email: '',
        password: ''
      },
      pandoraLoaded: false,
      playlistId: '',
      playlist: [],
      playlistLoaded: false,
      gapi: {}
    };

    this.loadYoutube = this.loadYoutube.bind(this);
    this.handlePlaylistIdChange = this.handlePlaylistIdChange.bind(this);
    this.handlePlaylistIdSubmit = this.handlePlaylistIdSubmit.bind(this);
    this.handlePandoraUserChange = this.handlePandoraUserChange.bind(this);
    this.handlePandoraUserSubmit = this.handlePandoraUserSubmit.bind(this);
    // this.handlePlaylistUpdateChange = this.handlePlaylistUpdateChange.bind(this);
    this.handlePlaylistUpdateSubmit = this.handlePlaylistUpdateSubmit.bind(this);
    this.updatePandoraSelectItems = this.updatePandoraSelectItems.bind(this);
  }

  componentDidMount() {
    this.loadYoutube();
  }

  loadYoutube() {
    gapi.load('client', () => {
      gapi.client.setApiKey(process.env.SLOTHBEAR_STATION_GOOGLE_API_KEY);
      gapi.client.load('youtube', 'v3', () => {
        console.log('gapi loaded');
        this.setState({ gapi });
      });
    });
  }

  handlePlaylistIdChange(e) {
    let newPlaylistIdInput = e.target.value;

    this.setState({
      playlistId: newPlaylistIdInput
    });
  }

  handlePlaylistIdSubmit(e) {
    e.preventDefault();

    let playlistRequestParams = {
      part: 'snippet,contentDetails',
      maxResults: 50,
      playlistId: this.state.playlistId
    };

    this.state.gapi.client.youtube.playlistItems.list(playlistRequestParams)
        .then((res) => {
          this.setState({
            playlist: res.result.items,
            playlistLoaded: true
          });
        });
    
  }
  
  handlePandoraUserChange(e) {
    let newPandoraUserInput = Object.assign({}, this.state.pandoraUser);
    
    newPandoraUserInput[e.target.id] = e.target.value;
    
    this.setState({
      pandoraUser: newPandoraUserInput
    });
  }
  
  handlePandoraUserSubmit(e) {
    e.preventDefault();

    this.setState({
      pandoraLoaded: true
    });
  }

  // handlePlaylistUpdateChange(e) {

  // }

  handlePlaylistUpdateSubmit(e) {
    e.preventDefault();

    console.log(e.target.pandoraSongId);
    console.log(e.target.pandoraSongTitle.value);
    
    console.log(e.target.id);
  }

  // handle pandora song change
  // handle select box change

  updatePandoraSelectItems(e) {
    let newPlaylistUpdate = this.state.playlist.slice();

    let idx = e.target.parentElement.id
    let songTitle = this.state.playlist[idx].snippet.title.split(' (')[0];

    let requestData = {
      songTitle,
      pandoraUser: this.state.pandoraUser
    };

    fetch('http://localhost:3000/api/pandora/songoptions', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        newPlaylistUpdate[idx].pandoraSelectOptions = response.songs;
        newPlaylistUpdate[idx].pandoraSongTitle = `${response.songs[0].artistName} - ${response.songs[0].songName}`;
        newPlaylistUpdate[idx].pandoraMusicToken = response.songs[0].musicToken;

        console.log(newPlaylistUpdate[idx].pandoraSelectOptions);

        this.setState({
          playlist: newPlaylistUpdate
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Slothbear Station</h1>

        <PlaylistIdForm handleChange={ this.handlePlaylistIdChange } handleSubmit={ this.handlePlaylistIdSubmit } playlistId={ this.state.playlistId }/>

        <PandoraUserForm handleChange={ this.handlePandoraUserChange } handleSubmit= { this.handlePandoraUserSubmit } pandoraUser={ this.state.pandoraUser } pandoraLoaded={ this.state.pandoraLoaded }/>

      {
        this.state.playlistLoaded &&
        <Playlist playlistId={ this.state.playlistId } playlist={ this.state.playlist } updatePandoraSelectItems={ this.updatePandoraSelectItems } handleSubmit={ this.handlePlaylistUpdateSubmit }/>
      }
      </div>
    );
  }
}

export default App;
