const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET Route for retrieving all the feedback
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for `);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
notes.post('/', (req, res) => {

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

    // Read the current db file and then append the new 
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