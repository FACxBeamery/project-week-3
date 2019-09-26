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
    } else if (endpoint === "/todos" && method === "GET") {
        //GET
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.getTodos);
    } else if (endpoint === "/addtodo" && method === "POST") {
        //POST
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.addTodo);
    } else if (endpoint === "/removetodo" && method === "DELETE") {
        //DELETE
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.removeTodo);
    } else if (
        method === "PATCH" &&
        (endpoint === "/completetodo" || endpoint === "/undocompletetodo")
    ) {
        // PATCH
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.toggleTodoStatus);
    } else if (endpoint === "/sorttodos" && method === "PATCH") {
        // PATCH
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.sortTodos);
    } else if (endpoint === "/edittodo" && method === "PATCH") {
        // PATCH
        const filePath = path.join(__dirname, "todos.json");
        rt.readTodoList(filePath, response, request, rt.editTodo);
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(
            "<h1>404 Not Found</h1><br> <h2>Please check the documentation provided and make sure you are using the right method for the right endpoint</h2>"
        );
    }
};

module.exports = handler;
