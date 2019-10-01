const pf = require("../lib/purefunctions");
const writeFile = require("../../lib/utilFunctions").writeFile;

const removeTodo = (response, request, error, file, filePath) => {
    // get the id

    const id = req.params.id;

    readFile(req, res, (file) => {
        let parsedTodos = JSON.parse(file);
        parsedTodos = pf.removeFromArray(parsedTodos, id);

        writeFile(JSON.stringify(parsedTodos), response, `todo with id: ${id} has been removed`);
    });

    // const id = request.headers.id;
    // let parsedTodos = JSON.parse(file);
    // if (!checkIfIDExists(parsedTodos, id)) {
    //     response.writeHead(400, { "Content-Type": "text/html" });
    //     response.end("Could not find to do with that id. Please try again");
    // } else {
    //     parsedTodos = pf.removeFromArray(parsedTodos, id);

    //     writeFile(
    //         filePath,
    //         JSON.stringify(parsedTodos),
    //         error,
    //         response,
    //         `todo with id: ${id} has been removed successfully`
    //     );
    // }
};

module.exports = removeTodo;
