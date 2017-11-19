const getSearchResults = (req, res, esClient) => {

  const { searchText, resultsOffset, freshReload } = req.query;

  const getResults = () => {
    const body = {
      size: 2,
      from: parseInt(resultsOffset),
      _source: {
        includes: ['title', 'kind', 'id', 'search_text', 'photos', 'docs', 'company_id', 'company_name', 'company_rating', 'created_at', 'search_text'],
        // "excludes": [ "*.description" ]
      },
      sort: [
        { created_at: { order: 'asc' } },
        { title: 'desc' },
        '_score'
      ],
      // query: {
      //   bool: {
      //     must: [
      //       { term: { company_id: 'comp1' } },
      //       { term: { expired: false } },
      //       { type: { value : 'instrument' } }
      //     ]
      //   }
      // }
      query: {
        bool: {
          must: {
            multi_match: {
              query: searchText,
              fields: ['title', 'search_text'],
              fuzziness: 'AUTO'
            }
          },
          filter: [
            { term: { company_id: 'comp1' } },
            { term: { expired: false } },
            { term: { removed: false } },
            { type: { value : 'instrument' } }
          ]
        }
      }
    };
    return esClient.search({ index: 'partsio_catalogue', body });
  };

  getResults()
  .then(results => {
    res.send({
      newResults: results.hits.hits,
      freshReload: freshReload === 'true'
    });
  })
  .catch(err => {
    console.error('Error inside getSearchResults.js: ', err);
    res.status(400).end();
  });

};

module.exports = getSearchResults;