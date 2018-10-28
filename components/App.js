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
      pandora: {},
      pandoraLoaded: false,
      playlistId: '',
      playlist: [],
      playlistLoaded: false,
      gapi: {}
    };

    this.loadYoutube = this.loadYoutube.bind(this);
    this.loadPandora = this.loadPandora.bind(this);

    this.handlePlaylistIdChange = this.handlePlaylistIdChange.bind(this);
    this.handlePlaylistIdSubmit = this.handlePlaylistIdSubmit.bind(this);
    this.handlePandoraUserChange = this.handlePandoraUserChange.bind(this);
    this.handlePandoraUserSubmit = this.handlePandoraUserSubmit.bind(this);
  }

  componentDidMount() {
    this.loadYoutube();
  }

  loadYoutube() {
    gapi.load('client', () => {
      gapi.client.setApiKey(process.env.SLOTHBEAR_STATION_GOOGLE_API_KEY);
      gapi.client.load('youtube', 'v3', () => {
        console.log('gapi loaded');
        this.setState({
          gapi: gapi
        });
      });
    });
  }

  loadPandora() {
    let pandora = new Anesidora(this.state.pandoraUser.email, this.state.pandoraUser.password);

    this.setState({
      pandora: pandora,
      pandoraLoaded: true,
      pandoraUser: {
        email: '',
        password: ''
      }
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

    this.loadPandora();
  }

  render() {
    return (
      <div>
        <h1>Slothbear Station</h1>

        <PlaylistIdForm handleChange={ this.handlePlaylistIdChange } handleSubmit={ this.handlePlaylistIdSubmit } playlistId={ this.state.playlistId }/>

        <PandoraUserForm handleChange={ this.handlePandoraUserChange } handleSubmit= { this.handlePandoraUserSubmit } pandoraUser={ this.state.pandoraUser } pandoraLoaded={ this.state.pandoraLoaded } pandora={ this.state.pandora } />

      {
        this.state.playlistLoaded &&
        <Playlist playlistId={ this.state.playlistId } playlist={ this.state.playlist }/>
      }
      </div>
    );
  }
}

export default App;
