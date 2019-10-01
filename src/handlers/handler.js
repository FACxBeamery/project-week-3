// const fs = require("fs");
// const pf = require("../lib/purefunctions");

// const toggleTodoStatus = (response, request, error, file, filePath) => {
//     const id = request.headers.id;
//     let parsedTodos = JSON.parse(file);
//     const newStatus = request.url === "/completetodo";

//     if (!checkIfIDExists(parsedTodos, id)) {
//         response.writeHead(400, { "Content-Type": "text/html" });
//         response.end("Could not find to do with that id. Please try again");
//     } else {
//         parsedTodos = pf.toggleItemStatus(parsedTodos, id, newStatus, Date.now());

//         writeTodoList(
//             filePath,
//             JSON.stringify(parsedTodos),
//             error,
//             response,
//             `todo with id: ${id} has had its status toggled to ${newStatus}`
//         );
//     }
// };

// const sortTodos = (response, request, error, file, filePath) => {
//     const sortBy = request.headers.sortby;
//     let parsedTodos = JSON.parse(file);
//     parsedTodos = pf.sortArray(parsedTodos, sortBy);
//     if (sortBy !== "date" && sortBy !== "recentedited" && sortBy !== "status") {
//         response.writeHead(400, { "Content-Type": "text/html" });
//         response.end(
//             "Incorrect header value <sortby>. Please try again. E.g. date, recentedited, or status"
//         );
//     } else {
//         writeTodoList(
//             filePath,
//             JSON.stringify(parsedTodos),
//             error,
//             response,
//             `Todos have been sorted by ${sortBy}`
//         );
//     }
// };

// const editTodo = (response, request, error, file, filePath) => {
//     const id = request.headers.id;
//     const newTitle = request.headers.title;
//     let parsedTodos = JSON.parse(file);

//     if (!checkIfIDExists(parsedTodos, id) || !newTitle) {
//         response.writeHead(400, { "Content-Type": "text/html" });
//         response.end("Could not find to do with that id/title header was empty. Please try again");
//     } else {
//         parsedTodos = pf.editArray(parsedTodos, id, newTitle, Date.now());

//         writeTodoList(
//             filePath,
//             JSON.stringify(parsedTodos),
//             error,
//             response,
//             `Todo with id: ${id} has been edited`
//         );
//     }
// };

// const handleHome = (response, request, error, file) => {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.end(file);
// };

// const checkIfIDExists = (array, id) => array.some((item) => item.id == id);

// module.exports = {
//     readFile,
//     getTodos,
//     addTodo,
//     removeTodo,
//     toggleTodoStatus,
//     sortTodos,
//     editTodo,
//     handleHome
// };
