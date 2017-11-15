'use strict';

const fs = require('fs');
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

const bulkIndex = (_index, _type, _data) => {
  let body = [];
  _data.forEach(item => {
    body.push({
      index: {
        _index,
        _type,
        _id: item.id
      }
    });
    body.push(item);
  });
  esClient.bulk({ body })
  .then(response => {
    let errorCount = 0;
    response.items.forEach(item => {
      if (item.index && item.index.error) {
        console.log(++errorCount, item.index.error);
      }
    });
    console.log(`Successfully indexed ${_data.length - errorCount} out of ${_data.length} items`);
  })
  .catch(console.err);
};

const populate = () => {
  const instrumentsRaw = fs.readFileSync('10_instruments.json');
  const instruments = JSON.parse(instrumentsRaw);
  console.log(`${instruments.length} items parsed`);
  bulkIndex('partsio_catalogue', 'instrument', instruments);
};

populate();
