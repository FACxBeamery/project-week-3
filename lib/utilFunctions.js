const fs = require("fs");
const path = require("path");

const todosJSON = path.join(__dirname, "..", "src", "todos.json");

const readFile = (req, res, cb) => {
    fs.readFile(todosJSON, (error, file) => {
        if (error) {
            console.log(error);
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        } else {
            cb(file);
        }
    });
};

const writeFile = (jsonTodoList, res, message, status) => {
    fs.writeFile(todosJSON, jsonTodoList, "utf8", (error) => {
        if (error) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("could not write on todos.json file");
        } else {
            // res.writeHead(201, { "Content-Type": "text/html" });
            if (status) {
                res.status(204).send(message);
            } else {
                res.send(message);
            }
        }
    });
};

module.exports = { readFile, writeFile };
