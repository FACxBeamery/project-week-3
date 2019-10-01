const pf = require("../lib/purefunctions");
const writeFile = require("../../lib/utilFunctions").writeFile;

const editTodo = (req, res) => {
    // get the id

    const id = req.params.id;
    const editMethod = req.fields.edit_method;

    readFile(req, res, (file) => {
        let parsedTodos = JSON.parse(file);

        // DONT forget to add custom message
        // then get body title and check  if its empty
        if (editMethod === "editTitle") {
            const newTitle = req.fields.title;
            parsedTodos = pf.editArray(parsedTodos, id, newTitle, Date.now());
        } else if (editMethod === "completeTodo") {
            parsedTodos = pf.toggleItemStatus(parsedTodos, id, true, Date.now());
        } else if (editMethod === "undocompleteTodo") {
            parsedTodos = pf.toggleItemStatus(parsedTodos, id, false, Date.now());
        }

        writeFile(JSON.stringify(parsedTodos), response, `todo with id: ${id} has been edited`);
    });
};

module.exports = editTodo;
