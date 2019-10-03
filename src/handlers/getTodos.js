const pf = require("../../lib/purefunctions");
const readFile = require("../../lib/utilFunctions").readFile;

const getTodos = (req, res) => {
    readFile(req, res, (file) => {
        let sortBy;

        if (!req.params.sort_method) {
            sortBy = "status";
        } else sortBy = req.params.sort_method;

        let parsedTodos = JSON.parse(file);

        parsedTodos = pf.sortArray(parsedTodos, sortBy);

        res.send(JSON.stringify(parsedTodos));
    });
};

module.exports = getTodos;
