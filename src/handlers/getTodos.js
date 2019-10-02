const pf = require("../../lib/purefunctions");
const readFile = require("../../lib/utilFunctions").readFile;

const getTodos = (req, res) => {
    console.log("hey ");
    readFile(req, res, (file) => {
        console.log("reading file");
        res.writeHead(200, { "Content-Type": "application/json" });
        let sortBy = req.params.sortBy;
        let parsedTodos = JSON.parse(file);
        if (sortBy !== "date" || sortBy !== "recentedited") {
            sortBy = "status";
        }
        parsedTodos = pf.sortArray(parsedTodos, "status");
        console.log(parsedTodos);
        res.end(JSON.stringify(parsedTodos));
    });
};

module.exports = getTodos;
