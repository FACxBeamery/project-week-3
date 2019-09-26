const path = require("path");
const rt = require("./router");

const handler = (request, response) => {
    const endpoint = request.url;
    if (endpoint === "/") {
        const filePath = path.join(__dirname, "..", "public", "index.html");
        rt.readTodoList(filePath, response, request, rt.handleHome);
    } else if (routes[endpoint]) {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, routes[endpoint]);
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 Not Found</h1>");
    }
};

const routes = {
    "/todos": rt.getTodos,
    "/addtodo": rt.addTodo,
    "/removetodo": rt.removeTodo,
    "/completetodo": rt.toggleTodoStatus,
    "/undocompletetodo": rt.toggleTodoStatus,
    "/sorttodos": rt.sortTodos,
    "/edittodo": rt.editTodo
};
module.exports = handler;
