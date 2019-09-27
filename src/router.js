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
    console.log(request.headers.title);

    if (!request.headers.title) {
        response.writeHead(400, { "Content-Type": "text/html" });
        response.end("Header <title> cannot be empty. Please try again");
    } else {
        const newTodo = {
            id: parsedTodos.length + 1,
            title: request.headers.title,
            completed: false,
            dateCreated: Date.now(),
            dateEdited: Date.now()
        };
        parsedTodos = pf.addToArray(parsedTodos, newTodo);

        writeTodoList(
            filePath,
            JSON.stringify(parsedTodos),
            error,
            response,
            `todo with id: ${newTodo.id} has been added successfully`
        );
    }
};

const removeTodo = (response, request, error, file, filePath) => {
    const id = request.headers.id;
    let parsedTodos = JSON.parse(file);
    if (!checkIfIDExists(parsedTodos, id)) {
        response.writeHead(400, { "Content-Type": "text/html" });
        response.end("Could not find to do with that id. Please try again");
    } else {
        parsedTodos = pf.removeFromArray(parsedTodos, id);

        writeTodoList(
            filePath,
            JSON.stringify(parsedTodos),
            error,
            response,
            `todo with id: ${id} has been removed successfully`
        );
    }
};

const toggleTodoStatus = (response, request, error, file, filePath) => {
    const id = request.headers.id;
    let parsedTodos = JSON.parse(file);
    const newStatus = request.url === "/completetodo";

    if (!checkIfIDExists(parsedTodos, id)) {
        response.writeHead(400, { "Content-Type": "text/html" });
        response.end("Could not find to do with that id. Please try again");
    } else {
        parsedTodos = pf.toggleItemStatus(parsedTodos, id, newStatus, Date.now());

        writeTodoList(
            filePath,
            JSON.stringify(parsedTodos),
            error,
            response,
            `todo with id: ${id} has had its status toggled to ${newStatus}`
        );
    }
};

const sortTodos = (response, request, error, file, filePath) => {
    const sortBy = request.headers.sortby;
    let parsedTodos = JSON.parse(file);
    parsedTodos = pf.sortArray(parsedTodos, sortBy);
    if (sortBy !== "date" || sortBy !== "latest" || sortBy !== "status") {
        response.writeHead(400, { "Content-Type": "text/html" });
        response.end(
            "Incorrect header value <sortby>. Please try again. E.g. date, latest, or status"
        );
    } else {
        writeTodoList(
            filePath,
            JSON.stringify(parsedTodos),
            error,
            response,
            `Todos have been sorted by ${sortBy}`
        );
    }
};

const editTodo = (response, request, error, file, filePath) => {
    const id = request.headers.id;
    const newTitle = request.headers.title;

    if (!checkIfIDExists(parsedTodos, id) || !newTitle) {
        response.writeHead(400, { "Content-Type": "text/html" });
        response.end("Could not find to do with that id/title header was empty. Please try again");
    } else {
        let parsedTodos = JSON.parse(file);
        parsedTodos = pf.editArray(parsedTodos, id, newTitle, date.Now());

        writeTodoList(
            filePath,
            JSON.stringify(parsedTodos),
            error,
            response,
            `Todo with id: ${id} has been edited`
        );
    }
};

const writeTodoList = (filePath, jsonTodoList, error, response, message) => {
    fs.writeFile(filePath, jsonTodoList, "utf8", (error) => {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/html" });
            response.end("could not write on todos.json file");
        } else {
            response.writeHead(201, { "Content-Type": "text/html" });
            response.end(message);
        }
    });
};

const handleHome = (response, request, error, file) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
};

const checkIfIDExists = (array, id) => array.some((item) => item.id == id);

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
