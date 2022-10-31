const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const data = require('../db/db.json');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for `);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
notes.post('/', (req, res) => {
    // Console log that a POST request was received
    console.info(`${req.method} request received to save notes`);

    // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the new note being built and saved
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error posting note');
    }

});

module.exports = notes;