const fs = require("fs");
const chalk = require("chalk");

//function to handle the removing of a note
const removeNote = (title) => {
  const notes = loadNotes();
  const toKeepNote = notes.filter((note) => note.title !== title);

  if (notes.length > toKeepNote.length) {
    console.log(chalk.green.bold.inverse(" note removed"));
    saveNote(toKeepNote);
  } else {
    console.log(chalk.red.bold.inverse(" no notes removed"));
  }
};

//function to handle the adding of a note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.filter((note) => note.title === title);
  if (duplicateNote.length === 0) {
    notes.push({
      title: title,
      body: body,
    });

    saveNote(notes);
    console.log(chalk.green.inverse.bold("Added new note"));
  } else {
    console.log(chalk.red.inverse.bold("note title taken"));
  }
};

//function to handle the listing of all the notes
const listNotes = () => {
  const notes = loadNotes();
  const noteTitles = notes.map((note) => note.title);
  console.log(
    chalk.green.inverse.bold("here are the note titles") + " " + noteTitles
  );
};

//function to habdle reading of notes
const readNote = (title) => {
  const notes = loadNotes();
  const toReadNote = notes.find((note) => note.title === title);

  if (toReadNote) {
    console.log(
      chalk.green.inverse("this is your disired note") +
        " " +
        `title:${toReadNote.title}  body:${toReadNote.body}`
    );
  } else {
    console.log(chalk.inverse.red("no note to read"));
  }
};

//function to handle the loading of notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

//function to handle saving of the notes
const saveNote = (notes) => {
  const note = JSON.stringify(notes);
  fs.writeFileSync("notes.json", note);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
