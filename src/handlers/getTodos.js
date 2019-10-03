const pf = require("../../lib/purefunctions");
const readFile = require("../../lib/utilFunctions").readFile;

const getTodos = (req, res) => {
    readFile(req, res, (file) => {
        // res.writeHead(200, { "Content-Type": "application/json" });
        console.log(req.params);
        let sortBy;

        // sortBy = req.params.sort_method;

        if (!req.params.sort_method) {
            sortBy = "status";
        } else sortBy = req.params.sort_method;

        let parsedTodos = JSON.parse(file);
        // if (sortBy !== "date" || sortBy !== "recentedited") {
        //     sortBy = "status";
        // }
        console.log("this is the sort", sortBy);

        console.log("before sort", parsedTodos);

        parsedTodos = pf.sortArray(parsedTodos, sortBy);

        console.log("after sort", parsedTodos);

        res.send(JSON.stringify(parsedTodos));
    });
};

module.exports = getTodos;
