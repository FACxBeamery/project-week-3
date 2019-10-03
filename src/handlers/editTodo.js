const pf = require("../../lib/purefunctions");
const readFile = require("../../lib/utilFunctions").readFile;
const writeFile = require("../../lib/utilFunctions").writeFile;

const editTodo = (req, res) => {
    // get the id

    const id = req.params.id;
    const editMethod = req.fields.edit_method;

    readFile(req, res, (file) => {
        let parsedTodos = JSON.parse(file);
        const idInArray = parsedTodos.some((todoObjs) => todoObjs.id === id);
        if (!idInArray) {
            return res.status(400).end();
        } else {
            if (editMethod === "editTitle") {
                const newTitle = req.fields.title;
                parsedTodos = pf.editArray(parsedTodos, id, newTitle, Date.now());
            } else if (editMethod === "completeTodo") {
                parsedTodos = pf.toggleItemStatus(parsedTodos, id, true, Date.now());
            } else if (editMethod === "undoCompleteTodo") {
                parsedTodos = pf.toggleItemStatus(parsedTodos, id, false, Date.now());
            } else {
                return res.status(400).end();
            }
        }
        writeFile(JSON.stringify(parsedTodos), res, `todo with id: ${id} has been edited`);
    });
};

module.exports = editTodo;
