const getItemInfo = (req, res, esClient) => {

  const { _id } = req.query;

  const getInfo = () => {
    const body = {
      size: 1,
      from: 0,
      _source: {
        includes: ['title', 'kind', 'id', 'search_text', 'photos', 'docs', 'company_id', 'company_name', 'company_rating', 'created_at', 'search_text'],
      },
      query: {
        bool: {
          must: [
            { term: { _id: req.query.id } },
            { term: { expired: false } },
            { term: { removed: false } }
          ]
        }
      }
    };
    return esClient.search({ index: 'partsio_catalogue', body });
  };

  getInfo()
  .then(result => {
    if (result.hits.total) {
      res.send({ item: result.hits.hits[0] });
    } else {
      throw 'Item not found';
    }
  })
  .catch(err => {
    console.error('Error inside getItemInfo.js: ', err);
    res.status(400).end();
  });

};

module.exports = getItemInfo;
