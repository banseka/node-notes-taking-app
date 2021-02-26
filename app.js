const chalk = require("chalk");
const yargs = require("yargs");
const { removeNote } = require("./notes");
const notes = require("./notes");

// constomize node version
yargs.version("16.0.0");

//creating  the add command
yargs.command({
  command: "add",
  description: "add a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//create the remove command
yargs.command({
  command: "remove",
  description: "remove a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title) 
  },
});

// create read command
yargs.command({
  command: "read",
  description: "read note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
   notes.readNote(argv.title)
  },
});

// create list command
yargs.command({
  command: "list",
  description: "list note",
  handler() {
    notes.listNotes()
  },
});

console.log(yargs.argv);
