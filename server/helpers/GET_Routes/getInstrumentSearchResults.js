const getInstrumentSearchResults = (req, res, esClient) => {

  const getInstruments = () => {
    const body = {
      size: 10,
      from: parseInt(req.query.resultsOffset),
      _source: {
        includes: ['title', 'kind', 'id', 'search_text'],
        // "excludes": [ "*.description" ]
      },
      sort: [
        { created_at: { order : 'asc' } },
        { title: 'desc' },
        '_score'
      ],
      query: {
        bool: {
          must: [
            { term: { company_id: 'comp1' } },
            { term: { expired: false } },
            { type: { value : 'instrument' } }
          ]
        }
      }
    };
    return esClient.search({ index: 'partsio_catalogue', body });
  };

  getInstruments()
  .then(results => {
    console.log("i'm here search results: ", results.hits.hits);
    res.send({ results: results.hits.hits });
  })
  .catch(err => {
    console.error('Error inside getInstrumentSearchResults.js: ', err);
    res.status(400).end();
  });

};

module.exports = getInstrumentSearchResults;
