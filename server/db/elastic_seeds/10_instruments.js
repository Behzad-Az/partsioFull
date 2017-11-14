'use strict';

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

const populate = function populate() {
  const instruments = [
    { id: 'fXt6U3UwM0o', title: 'Item 1', kind: 'Pressure Transmitter', photo_links: ['photo1.1', 'photo1.2'], company_name: 'Shell', company_id: ['comp1', 'comp2'], search_text: 'yoyoyo 1', expired: false, created_at: new Date(2012, 1, 2, 3, 4, 6).toJSON() },
    { id: 'WVZ1P82K4tJ', title: 'Item 2', kind: 'Temperature Transmitter', photo_links: ['photo2.1', 'photo2.2'], company_name: 'Shell', company_id: 'comp1', search_text: 'yoyoyo 2', expired: false, created_at: new Date(2013, 1, 2, 3, 4, 6).toJSON() },
    { id: 'K3IFhDYlu0L', title: 'Item 3', kind: 'Flow Transmitter', photo_links: ['photo3.1', 'photo3.2'], company_name: 'Shell', company_id: 'comp1', search_text: 'yoyoyo 3', expired: false, created_at: new Date(2014, 1, 2, 3, 4, 6).toJSON() },
    { id: '1Uoyn12Q9iQ', title: 'Item 4', kind: 'Pressure Transmitter', photo_links: ['photo4.1', 'photo4.2'], company_name: 'Shell', company_id: 'comp1', search_text: 'hello how are you? 4', expired: false, created_at: new Date(2015, 1, 2, 3, 4, 6).toJSON() }
  ];
  console.log(`${instruments.length} items parsed`);
  bulkIndex('partsio_catalogue', 'instrument', instruments);
};

populate();
