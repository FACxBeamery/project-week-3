const pf = require("../../lib/purefunctions");
const readFile = require("../../lib/utilFunctions").readFile;
const writeFile = require("../../lib/utilFunctions").writeFile;

const removeTodo = (req, res) => {
    // get the id
    console.log("this is the params", req.params);

    const id = req.params.id;
    console.log(id);

    if (id) {
        readFile(req, res, (file) => {
            let parsedTodos = JSON.parse(file);
            const idInArray = parsedTodos.some((todoObjs) => todoObjs.id === id);
            console.log("id in array: ", idInArray);
            if (!idInArray) {
                console.log("not in array");

                return res.status(400).end();
            } else {
                console.log("in array");
                parsedTodos = pf.removeFromArray(parsedTodos, id);
                writeFile(JSON.stringify(parsedTodos), res, `todo with id: ${id} has been removed`);
            }
        });
    }

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
