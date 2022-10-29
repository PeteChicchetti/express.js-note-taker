const notes = require('express').Router();

// GET Route for retrieving all the feedback
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for `);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
notes.post('/', (req, res) => {
    // Console log that a POST request was received
    console.info(`${req.method} request received to save notes`);

});
