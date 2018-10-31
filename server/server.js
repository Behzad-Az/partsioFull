'use strict';

// ***************************************************
// DEPENDENCIES
// ***************************************************
const express = require('express');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./db/knexfile.js').production;
const knex = require('knex')(connection);
const elasticsearch = require('elasticsearch');
// const esClient = new elasticsearch.Client({
//   host: '127.0.0.1:9200',
//   log: 'error'
// });

// ***************************************************
// MIDDLEWARE
// ***************************************************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

// ***************************************************
// PORT
// ***************************************************
const PORT = process.env.PORT || 19001;
const server = app.listen(PORT, '127.0.0.1', 'localhost', () => console.log(`Listening on ${ PORT }`));

// ***************************************************
// HELPERS
// ***************************************************
const getSearchResults = require('./helpers/GET_Routes/getSearchResults');
const getItemInfo = require('./helpers/GET_Routes/getItemInfo');
const getDocDownload = require('./helpers/GET_Routes/getDocDownload');
const postNewEmailEntry = require('./helpers/POST_Routes/postNewEmailEntry');
const postNewMessage = require('./helpers/POST_Routes/postNewMessage');


// ***************************************************
// ROUTES - GET
// ***************************************************
// app.get('/api/search_results', (req, res) => {
//   getSearchResults(req, res, esClient);
// });

// app.get('/api/item', (req, res) => {
//   getItemInfo(req, res, esClient);
// });

// app.get('/api/docs', (req, res) => {
//   getDocDownload(req, res);
// });

// ***************************************************
// ROUTES - POST
// ***************************************************
app.post('/api/messages', (req, res) => {
  postNewMessage(req, res, knex);
});

app.post('/api/email_entries', (req, res) => {
  postNewEmailEntry(req, res, knex);
});
