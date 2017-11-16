'use strict';

// ***************************************************
// DEPENDENCIES
// ***************************************************
const express = require('express');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db/knexfile.js').production;
const knex = require('knex')(connection);
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

// ***************************************************
// MIDDLEWARE
// ***************************************************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
const postNewEmailEntry = require('./helpers/POST_Routes/postNewEmailEntry');


// ***************************************************
// ROUTES - GET
// ***************************************************
app.get('/api/search_results', (req, res) => {
  getSearchResults(req, res, esClient);
});

app.get('/api/item', (req, res) => {
  getItemInfo(req, res, esClient);
});

// ***************************************************
// ROUTES - POST
// ***************************************************
app.post('/api/email_entries', (req, res) => {
  postNewEmailEntry(req, res, knex);
});
