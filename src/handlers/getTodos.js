const readFile = require("../../lib/utilFunctions").readFile;
const writeFile = require("../../lib/utilFunctions").writeFile;

const getTodos = (req, res) => {
    readFile(req, res, () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        const sortBy = req.params.sortBy;
        let parsedTodos = JSON.parse(file);
        if (sortBy !== "date" || sortBy !== "recentedited") {
            sortBy = "status";
        }
        parsedTodos = pf.sortArray(parsedTodos, sortBy);

        writeFile(JSON.stringify(parsedTodos), response, `Todos have been sorted by ${sortBy}`);
    });
};

module.exports = getTodos;
