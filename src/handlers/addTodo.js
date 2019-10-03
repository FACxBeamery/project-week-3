const pf = require("../../lib/purefunctions");
const writeFile = require("../../lib/utilFunctions").writeFile;
const readFile = require("../../lib/utilFunctions").readFile;
const uuid = require("uuid/v4");

const addTodo = (req, res) => {
    // read file
    readFile(req, res, (file) => {
        let parsedTodos = JSON.parse(file);
        // then get body title and check  if its empty
        const newTitle = req.fields.title;
        if (!newTitle) {
            return res.status(400).end();
        } else {
            const newTodo = {
                id: uuid(),
                title: newTitle,
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
        }
    });
};

module.exports = addTodo;
