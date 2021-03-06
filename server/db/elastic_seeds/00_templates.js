'use strict';

const fs = require('fs');
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});
const index = 'partsio_catalogue';

const newIndex = {
  index,
  body: {
    mappings: {
      item: {
        properties: {
          id: { type: 'text' },
          created_at: { type: 'date', format: "yyyy-MM-dd'T'HH:mm:ss.SSSZ" },
          title: { type: 'text', fielddata: true },
          kind: { type: 'text' },
          photos: { type: 'nested' },
          docs: { type: 'nested' },
          company_name: { type: 'text' },
          company_id: { type: 'text' },
          search_text: { type: 'text' },
          expired: { type: 'boolean' },
          removed: { type: 'boolean' }
        }
      }
    }
  }
};

esClient.indices.delete({ index })
.then(() => esClient.indices.create(newIndex))
.catch(err => console.error('Error inside elastic seed 00_templates.js: ', err));
