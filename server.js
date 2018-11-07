const Anesidora = require('anesidora');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/pandora/songoptions', (req, res) => {
  const pandora = new Anesidora(req.body.pandoraUser.email, req.body.pandoraUser.password);
  req.body.pandoraUser = null;
  console.log(pandora);
  
  pandora.login((err) => {
    console.log(req.body.songTitle);
    if (err) console.log(err);

    pandora.request('music.search', {
      searchText: req.body.songTitle,
      includeNearMatches: true
    }, (err, songData) => {
      if (err) console.log(err);
      if (songData.songs.length > 10) songData.songs.length = 10;

      res.json({songs: songData.songs});
    });
  });
});

app.listen(3000, () => console.log('app listening on 3000'))