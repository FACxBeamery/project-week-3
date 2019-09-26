const fs = require("fs");
const pf = require("../lib/purefunctions");

const readTodoList = (filePath, response, request, endpointCallback) => {
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
        } else {
            endpointCallback(response, request, error, file, filePath);
        }
    });
};

const getTodos = (response, request, error, file) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(file);
    return file;
};

const addTodo = (response, request, error, file, filePath) => {
    let parsedTodos = JSON.parse(file);
    const newTodo = {
        id: parsedTodos.length + 1,
        title: request.headers.title,
        completed: false,
        dateCreated: Date.now(),
        dateEdited: Date.now()
    };
    parsedTodos = pf.addToArray(parsedTodos, newTodo);

    writeTodoList(filePath, JSON.stringify(parsedTodos), error, response);
};

const removeTodo = (response, request, error, file, filePath) => {
    const id = request.headers.id;

    let parsedTodos = JSON.parse(file);

    parsedTodos = pf.removeFromArray(parsedTodos, id);

    writeTodoList(filePath, JSON.stringify(parsedTodos), error, response);
};

const toggleTodoStatus = (response, request, error, file, filePath) => {
    const id = request.headers.id;
    let parsedTodos = JSON.parse(file);
    const newStatus = request.url === "/completetodo";
    parsedTodos = pf.toggleItemStatus(parsedTodos, id, newStatus, date.Now());

    writeTodoList(filePath, JSON.stringify(parsedTodos), error, response);
};

const sortTodos = (response, request, error, file, filePath) => {
    const sortBy = request.headers.sortby;
    let parsedTodos = JSON.parse(file);
    parsedTodos = pf.sortArray(parsedTodos, sortBy);
    writeTodoList(filePath, JSON.stringify(parsedTodos), error, response);
};

const editTodo = (response, request, error, file, filePath) => {
    const id = request.headers.id;
    const newTitle = request.headers.title;

    let parsedTodos = JSON.parse(file);
    parsedTodos = pf.editArray(parsedTodos, id, newTitle, date.Now());

    writeTodoList(filePath, JSON.stringify(parsedTodos), error, response);
};

const writeTodoList = (filePath, jsonTodoList, error, response) => {
    fs.writeFile(filePath, jsonTodoList, "utf8", (error) => {
        if (error) {
            console.log(error);
        } else {
            response.writeHead(201, { "Content-Type": "text/html" });
            response.end("New todo added");
        }
    });
};

const handleHome = (response, request, error, file) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
};

module.exports = {
    readTodoList,
    getTodos,
    addTodo,
    removeTodo,
    toggleTodoStatus,
    sortTodos,
    editTodo,
    handleHome
};
