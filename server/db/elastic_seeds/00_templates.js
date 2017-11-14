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
      instrument: {
        properties: {
          id: { type: 'string' },
          created_at: { type: 'date', format: "yyyy-MM-dd'T'HH:mm:ss.SSSZ" },
          // location: { type: 'geo_point' },
          title: { type: 'text', fielddata: true },
          kind: { type: 'string' },
          photo_links: { type: 'string' },
          // photo_name: { type: 'string' },
          company_name: { type: 'string' },
          company_id: { type: 'string' },
          search_text: { type: 'text' },
          expired: { type: 'boolean' }
        }
      },
      // course: {
      //   properties: {
      //     id: { type: 'string' },
      //     title: { type: 'string' },
      //     course_desc: { type: 'string' },
      //     inst_id: { type: 'string' },
      //     inst_name: { type: 'string' }
      //   }
      // },
      // document: {
      //   properties: {
      //     id: { type: 'string' },
      //     title: { type: 'string' },
      //     kind: { type: 'string' },
      //     inst_id: { type: 'string' },
      //     inst_name: { type: 'string' },
      //     course_id: { type: 'string' },
      //     course_name: { type: 'string' }
      //   },
      // },
      // company: {
      //   properties: {
      //     id: { type: 'string' },
      //     name: { type: 'string' }
      //   }
      // },
      // institution: {
      //   properties: {
      //     id: { type: 'string' },
      //     name: { type: 'string' }
      //   }
      // }
    }
  }
};

esClient.indices.delete({ index })
.then(() => esClient.indices.create(newIndex))
.catch(err => console.error('Error inside elastic seed 00_templates.js: ', err));
