const postNewEmailEntry = (req, res, knex) => {

  const email = req.body.email.trim().toLowerCase();
  const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const verifyEmail = () => new Promise ((resolve, reject) => {
    if (email.length >= 6 && email.length <= 30 && email.match(emailRegex)) {
      resolve();
    } else {
      reject({ code: 'Invalid Email' });
    }
  });

  const postNewEmail = () => knex('email_entries')
    .insert({ email });

  verifyEmail()
  .then(postNewEmail)
  .then(() => res.send({ emailStatus: 'Thank you! We\'ll be up and running very soon.' }))
  .catch(err => {
    console.error('Error inside postNewEmailEntry.js: ', err);
    switch (err.code) {
      case '23505':
        res.send({ emailStatus: 'Thank you! We\'ll be up and running very soon.' });
        break;
      case 'Invalid Email':
        res.send({ emailStatus: 'Please enter valid email.' });
        break;
      default:
        res.status(400).end();
    }
  });

};

module.exports = postNewEmailEntry;
