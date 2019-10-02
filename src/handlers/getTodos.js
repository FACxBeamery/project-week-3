const pf = require("../../lib/purefunctions");
const readFile = require("../../lib/utilFunctions").readFile;
const writeFile = require("../../lib/utilFunctions").writeFile;

const getTodos = (req, res) => {
    console.log("hey ");
    readFile(req, res, () => {
        console.log("reading file");
        res.writeHead(200, { "Content-Type": "application/json" });
        const sortBy = req.params.sortBy;
        let parsedTodos = JSON.parse(file);
        if (sortBy !== "date" || sortBy !== "recentedited") {
            sortBy = "status";
        }
        parsedTodos = pf.sortArray(parsedTodos, sortBy);
        console.log(parsedTodos);
        res.end(JSON.stringify(parsedTodos));
    });
};

module.exports = getTodos;
