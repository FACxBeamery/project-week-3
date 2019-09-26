const path = require("path");
const rt = require("./router");

const handler = (request, response) => {
    const endpoint = request.url;
    if (endpoint === "/") {
        const filePath = path.join(__dirname, "..", "public", "index.html");
        rt.readTodoList(filePath, response, request, rt.handleHome);
    } else if (endpoint === "/todos") {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.getTodos);
    } else if (endpoint === "/addtodo") {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.addTodo);
    } else if (endpoint === "/removetodo") {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.removeTodo);
    } else if (endpoint === "/completetodo" || endpoint === "/undocompletetodo") {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.toggleTodoStatus);
    } else if (endpoint === "/sorttodos") {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.sortTodos);
    } else if (endpoint === "/edittodo") {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.editTodo);
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 Not Found</h1>");
    }
};

module.exports = handler;
