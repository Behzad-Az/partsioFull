const postNewMessage = (req, res, knex) => {

  const { fromName, fromEmail, fromPhone, subject, content, itemId } = req.body;

  const insertMsg = () => knex('messages')
    .insert({
      from_name: fromName,
      from_email: fromEmail || null,
      from_phone: fromPhone,
      subject,
      content,
      item_id: itemId
    });

  insertMsg()
  .then(() => res.status(200).send())
  .catch(err => {
    console.error('Error inside postNewMessage.js: ', err);
    res.status(406).end();
  });

};

module.exports = postNewMessage;
