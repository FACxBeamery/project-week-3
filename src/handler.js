const path = require("path");
const rt = require("./router");

const handler = (request, response) => {
    console.log("method: ", request.method);

    const endpoint = request.url;
    const method = request.method;

    if (endpoint === "/" && method === "GET") {
        // GET
        const filePath = path.join(__dirname, "..", "public", "index.html");
        rt.readTodoList(filePath, response, request, rt.handleHome);
    } else if (routes[endpoint] && routes[endpoint][1] === method) {
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, routes[endpoint][0]);
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(
            "<h1>404 Not Found</h1><br> <h2>Please check the documentation provided and make sure you are using the right method for the right endpoint</h2>"
        );
    }
};

const routes = {
    "/todos": [rt.getTodos,"GET"],
    "/addtodo": [rt.addTodo, "POST"],
    "/removetodo": [rt.removeTodo, "DELETE"],
    "/completetodo": [rt.toggleTodoStatus, "PATCH"],
    "/undocompletetodo": [rt.toggleTodoStatus, "PATCH"],
    "/sorttodos": [rt.sortTodos, "PATCH"],
    "/edittodo": [rt.editTodo, "PATCH"]
};
module.exports = handler;
