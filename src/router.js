const path = require("path");
const handler = require("./handler");

const router = (request, response) => {
    const endpoint = request.url;
    const method = request.method;

    if (endpoint === "/" && method === "GET") {
        // GET
        const filePath = path.join(__dirname, "..", "public", "index.html");
        handler.readTodoList(filePath, response, request, handler.handleHome);
    } else if (routes[endpoint] && routes[endpoint][1] === method) {
        const filePath = path.join(__dirname, "todos.json");
        handler.readTodoList(filePath, response, request, routes[endpoint][0]);
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(
            "<h1>404 Not Found</h1><br> <h2>Please check the documentation provided and make sure you are using the right method for the right endpoint</h2>"
        );
    }
};

const routes = {
    "/todos": [handler.getTodos, "GET"],
    "/addtodo": [handler.addTodo, "POST"],
    "/removetodo": [handler.removeTodo, "DELETE"],
    "/completetodo": [handler.toggleTodoStatus, "PATCH"],
    "/undocompletetodo": [handler.toggleTodoStatus, "PATCH"],
    "/sorttodos": [handler.sortTodos, "PATCH"],
    "/edittodo": [handler.editTodo, "PATCH"]
};
module.exports = router;
