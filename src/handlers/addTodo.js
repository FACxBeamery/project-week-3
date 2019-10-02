const pf = require("../../lib/purefunctions");
const writeFile = require("../../lib/utilFunctions").writeFile;
const readFile = require("../../lib/utilFunctions").readFile;
const uuid = require("uuid/v4");

const addTodo = (req, res) => {
    // read file
    readFile(req, res, (file) => {
        let parsedTodos = JSON.parse(file);
        // then get body title and check  if its empty
        const newTodo = {
            id: uuid(),
            title: req.fields.title,
            completed: false,
            dateCreated: Date.now(),
            dateEdited: Date.now()
        };
        parsedTodos = pf.addToArray(parsedTodos, newTodo);
        console.log(parsedTodos);
        writeFile(
            JSON.stringify(parsedTodos),
            res,
            `todo with id: ${newTodo.id} has been added successfully`
        );
    });
};

module.exports = addTodo;
