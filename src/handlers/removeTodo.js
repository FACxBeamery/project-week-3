const pf = require("../../lib/purefunctions");
const readFile = require("../../lib/utilFunctions").readFile;
const writeFile = require("../../lib/utilFunctions").writeFile;

const removeTodo = (req, res) => {
    const id = req.params.id;

    if (id) {
        readFile(req, res, (file) => {
            let parsedTodos = JSON.parse(file);
            const idInArray = parsedTodos.some((todoObjs) => todoObjs.id === id);
            if (!idInArray) {
                return res.status(400).end();
            } else {
                parsedTodos = pf.removeFromArray(parsedTodos, id);
                writeFile(
                    JSON.stringify(parsedTodos),
                    res,
                    `todo with id: ${id} has been removed`,
                    204
                );
            }
        });
    }
};

module.exports = removeTodo;
