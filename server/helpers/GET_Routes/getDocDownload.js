const getDocDownload = (req, res) => {

  res.download(`public/docs/${req.query.name}`, 'download.pdf', err => {
    if (err) {
      console.error('Error inside getDocDownload.js:', err);
      res.status(404).end();
    }
  });

};

module.exports = getDocDownload;
