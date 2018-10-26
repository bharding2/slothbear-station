import React, { Component } from 'react';

const Anesidora = require('anesidora');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pandoraUser: {
        email: '',
        password: ''
      },
      playlistId: '',
      playlist: [],
      pandora: {},
      pandoraLoaded: false,
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
            playlist: res.result.items
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
    let embedSrc = `https://www.youtube.com/embed/?listType=playlist&list=${this.state.playlistId}`;

    let playlistItems = this.state.playlist.map((playlistItem) => {
      return(
        <p key={ playlistItem.contentDetails.videoId }>{ playlistItem.snippet.title.split(' (')[0] }</p>
      )
    });
    
    return (
      <div>
        <h1>Slothbear Station</h1>
        <form onChange={ this.handlePlaylistIdChange } onSubmit={ this.handlePlaylistIdSubmit }>
          <p>
            <label htmlFor="playlistId">playlistId</label>
            <input id="playlistId" value={ this.state.playlistId } />
          </p>
          <input type="submit" value="get playlist" />
        </form>

        <form onChange={ this.handlePandoraUserChange } onSubmit={ this.handlePandoraUserSubmit }>
          <p>
            <label htmlFor="pandoraEmail">pandoraEmail</label>
            <input id="email" value={ this.state.pandoraUser.email } />
          </p>
          <p>
            <label htmlFor="pandoraPassword">pandoraPassword</label>
            <input id="password" value={ this.state.pandoraUser.password } type="password" />
          </p>
          <input type="submit" value="load pandora" />
          <p>Pandora Loaded: { this.state.pandoraLoaded.toString() } </p>

          { this.state.pandoraLoaded &&
            <p>username: { this.state.pandora.username } </p>
          }
        </form>

        { this.state.playlistId &&
          <iframe width="560" height="315" src={ embedSrc } frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        }

        { playlistItems }
      </div>
    );
  }
}

export default App;
