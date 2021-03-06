'use strict'
const express = require('express');
const app = express();
const hbs = require('hbs');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
  res.render('index', data);
});


const SpotifyWebApi = require('spotify-web-api-node');

const clientId = 'b4d00bedcc814694ac5b90ef8bc6a305',
    clientSecret = '592a045d1cc645b7a9cf1809588dedaf';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});



app.use((req, res, next) => {
  res.status(404);
  res.send('not-found');
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.send('error');
  }
});

app.listen(3000);