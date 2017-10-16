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
const postNewEmailEntry = require('./helpers/POST_Routes/postNewEmailEntry.js');

// ***************************************************
// ROUTES - POST
// ***************************************************
app.post('/api/email_entries', (req, res) => {
  postNewEmailEntry(req, res, knex);
});
