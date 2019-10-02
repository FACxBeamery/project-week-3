const pf = require("../../lib/purefunctions");
const writeFile = require("../../lib/utilFunctions").writeFile;
const readFile = require("../../lib/utilFunctions").readFile;

const addTodo = (req, res) => {
    // read file
    readFile(req, res, (file) => {
        let parsedTodos = JSON.parse(file);
        // then get body title and check  if its empty
        const newTodo = {
            id: 12,
            title: req.fields.title,
            completed: false,
            dateCreated: Date.now(),
            dateEdited: Date.now()
        };
        parsedTodos = pf.addToArray(parsedTodos, newTodo);
        writeFile(
            JSON.stringify(parsedTodos),
            response,
            `todo with id: ${newTodo.id} has been added successfully`
        );
    });
};

module.exports = addTodo;
