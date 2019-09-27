const path = require("path");
const h = require("./handler");

const handler = (request, response) => {
    const endpoint = request.url;
    const method = request.method;

    if (endpoint === "/" && method === "GET") {
        // GET
        const filePath = path.join(__dirname, "..", "public", "index.html");
        h.readTodoList(filePath, response, request, h.handleHome);
    } else if (routes[endpoint] && routes[endpoint][1] === method) {
        const filePath = path.join(__dirname, "todos.json");
        h.readTodoList(filePath, response, request, routes[endpoint][0]);
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(
            "<h1>404 Not Found</h1><br> <h2>Please check the documentation provided and make sure you are using the right method for the right endpoint</h2>"
        );
    }
};

const routes = {
    "/todos": [h.getTodos, "GET"],
    "/addtodo": [h.addTodo, "POST"],
    "/removetodo": [h.removeTodo, "DELETE"],
    "/completetodo": [h.toggleTodoStatus, "PATCH"],
    "/undocompletetodo": [h.toggleTodoStatus, "PATCH"],
    "/sorttodos": [h.sortTodos, "PATCH"],
    "/edittodo": [h.editTodo, "PATCH"]
};
module.exports = handler;
