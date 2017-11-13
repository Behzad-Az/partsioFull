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
          created_at: { type: 'date', format: 'yyyy-mm-dd' },
          // location: { type: 'geo_point' },
          title: { type: 'string' },
          kind: { type: 'string' },
          photo_links: { type: 'string' },
          // photo_name: { type: 'string' },
          company_name: { type: 'string' },
          company_id: { type: 'string' },
          search_text: { type: 'string' },
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

// const bulkIndex = function bulkIndex(index, type, data) {
//   let body = [];

//   data.forEach(item => {
//     const today = new Date();
//     item.created_at = today.toISOString().slice(0, 10);
//     body.push({
//       index: {
//         _id: item.id,
//         _index: index,
//         _type: type
//       }
//     });
//     body.push(item);
//   });

//   esClient.bulk({ body })
//   .then(response => {
//     let errorCount = 0;
//     response.items.forEach(item => {
//       if (item.index && item.index.error) {
//         console.log(++errorCount, item.index.error);
//       }
//     });
//     console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
//   })
//   .catch(console.err);
// };

// const populateElasticData = () => {
//   const jobsRaw = fs.readFileSync('jobs.json');
//   const jobs = JSON.parse(jobsRaw);
//   console.log(`${jobs.length} items parsed from data file`);
//   bulkIndex('goalhwy_es_db', 'job', jobs);
// };

esClient.indices.delete({ index })
.then(() => esClient.indices.create(newIndex))
// .then(() => populateElasticData())
.catch(err => console.error('Error inside elastic seed 00_templates.js: ', err));
