const pf = require("../../lib/purefunctions");
const writeFile = require("../../lib/utilFunctions").writeFile;
const readFile = require("../../lib/utilFunctions").readFile;
const uuid = require("uuid/v4");

const addTodo = (req, res) => {
    readFile(req, res, (file) => {
        let parsedTodos = JSON.parse(file);
        const newTitle = req.fields.title;
        const newTag = req.fields.tag;
        if (!newTitle) {
            return res.status(400).end();
        } else {
            const newTodo = {
                id: uuid(),
                title: newTitle,
                tag: newTag,
                completed: false,
                dateCreated: Date.now(),
                dateEdited: Date.now()
            };
            console.log(newTodo);
            parsedTodos = pf.addToArray(parsedTodos, newTodo);
            writeFile(
                JSON.stringify(parsedTodos),
                res,
                `todo with id: ${newTodo.id} has been added successfully`
            );
        }
    });
};

module.exports = addTodo;
