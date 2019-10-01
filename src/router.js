const express = require("express");
const router = express();
const path = require("path");
const handler = require("./handlers");
const todosJSON = path.join(__dirname, "todos.json");

router.use(express.static(path.join(__dirname, "..", "public")));

router.get("/todos", handler.getTodos);

router.post("/todos", handler.addTodo);

router.delete("/todos/todo/:id", handler.removeTodo);

router.patch("/todos/todo/:id", handler.editTodo);

// const router = (request, response) => {
//     const endpoint = request.url;
//     const method = request.method;
//     const routeExists = Boolean(routes[endpoint]);
//     const methodCorrect = routes[endpoint][1] === method;
//     if (endpoint === "/" && method === "GET") {
//         // GET
//         const filePath = path.join(__dirname, "..", "public", "index.html");
//         handler.readFile(filePath, response, request, handler.handleHome);
//     } else if (routeExists && methodCorrect) {
//         const filePath = path.join(__dirname, "todos.json");
//         handler.readFile(filePath, response, request, routes[endpoint][0]);
//     } else {
//         response.writeHead(404, { "Content-Type": "text/html" });
//         response.end(
//             "<h1>404 Not Found</h1><br> <h2>Please check the documentation provided and make sure you are using the right method for the right endpoint</h2>"
//         );
//     }
// };

// const routes = {
//     "/todos": [handler.getTodos, "GET"],
//     "/addtodo": [handler.addTodo, "POST"],
//     "/removetodo": [handler.removeTodo, "DELETE"],
//     "/completetodo": [handler.toggleTodoStatus, "PATCH"],
//     "/undocompletetodo": [handler.toggleTodoStatus, "PATCH"],
//     "/sorttodos": [handler.sortTodos, "PATCH"],
//     "/edittodo": [handler.editTodo, "PATCH"]
// };
module.exports = router;
