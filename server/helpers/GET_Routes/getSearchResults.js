const getSearchResults = (req, res, esClient) => {

  const { searchText, resultsOffset, freshReload } = req.query;

  console.log("i'm here 0: ", { searchText });

  const getResults = () => {
    const body = {
      size: 5,
      from: parseInt(resultsOffset),
      _source: {
        includes: ['title', 'kind', 'id', 'search_text', 'photos', 'docs', 'company_id', 'company_name', 'company_rating', 'created_at', 'search_text', 'price']
      },
      sort: [
        { created_at: { order: 'asc' } },
        { title: 'desc' },
        '_score'
      ],
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
      console.log("i'm here results", results.hits.hits);
      setTimeout(function(){
        //do what you need here
        res.send({
          newResults: results.hits.hits,
          freshReload: freshReload === 'true'
        });
    }, 500);
  })
  .catch(err => {
    console.error('Error inside getSearchResults.js: ', err);
    res.status(400).end();
  });

};

module.exports = getSearchResults;
