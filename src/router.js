const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

// const dataReader = (request, response) => {
//     let allTheData = "";
//     request.on("data", function(chunkOfData) {
//         allTheData += chunkOfData;
//     });

//     request.on("end", function() {
//         const convertedData = querystring.parse(allTheData);
//         console.log(convertedData);
//         response.writeHead(303, { Location: "/" });
//         response.end();
//     });
// };

const handler = (request, response) => {
    endpoint = request.url;
    if (endpoint === "/") {
        handleHome(request, response);
    } else if (endpoint === "/todos") {
        const filePath = path.join(__dirname, "todos.json");
        fs.readFile(filePath, (error, file) => {
            if (error) {
                console.log(error);
                response.writeHead(404, { "Content-Type": "text/html" });
                response.end("<h1>404 Not Found</h1>");
            } else {
                console.log("okay");

                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(file);
                console.log(JSON.parse(file));
                return file;
            }
        });
    } else if (endpoint === "/addtodo") {
        const filePath = path.join(__dirname, "todos.json");
        fs.readFile(filePath, (error, file) => {
            if (error) {
                console.log(error);
                response.writeHead(404, { "Content-Type": "text/html" });
                response.end("<h1>404 Not Found</h1>");
            } else {
                const parsedTodos = JSON.parse(file);
                parsedTodos.push({
                    id: parsedTodos.length + 1,
                    title: request.headers.title,
                    completed: false
                });
                fs.writeFile(filePath, JSON.stringify(parsedTodos), "utf8", (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.writeHead(201, { "Content-Type": "text/html" });
                        response.end("New todo added");
                    }
                });
            }
        });
    } else if (endpoint === "/removetodo") {
        const filePath = path.join(__dirname, "todos.json");
        fs.readFile(filePath, (error, file) => {
            if (error) {
                console.log(error);
                response.writeHead(404, { "Content-Type": "text/html" });
                response.end("<h1>404 Not Found</h1>");
            } else {
                const id = request.headers.id;
                console.log(id);
                let parsedTodos = JSON.parse(file);
                console.log(parsedTodos);
                parsedTodos = parsedTodos.filter((todoItem) => todoItem.id !== Number(id));
                console.log("after filter", parsedTodos);
                fs.writeFile(filePath, JSON.stringify(parsedTodos), "utf8", (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.writeHead(200, { "Content-Type": "text/html" });
                        response.end(`Todo deleted`);
                    }
                });
            }
        });
    } else if (endpoint === "/completetodo") {
        const filePath = path.join(__dirname, "todos.json");
        fs.readFile(filePath, (error, file) => {
            if (error) {
                console.log(error);
                response.writeHead(404, { "Content-Type": "text/html" });
                response.end("<h1>404 Not Found</h1>");
            } else {
                const id = request.headers.id;
                let parsedTodos = JSON.parse(file);
                parsedTodos.map((todoItem) => {
                    if (todoItem.id === Number(id)) {
                        todoItem.completed = true;
                    }
                });
                fs.writeFile(filePath, JSON.stringify(parsedTodos), "utf8", (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.writeHead(200, { "Content-Type": "text/html" });
                        response.end(`Todo completed`);
                    }
                });
            }
        });
    }

    // else if (endpoint.indexOf("css") !== -1 || endpoint.indexOf("img") !== -1) {
    //     handlePublic(request, response, endpoint);
    // } else if (endpoint === "/create-post") {
    //     dataReader(request, response);
    // }
    else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 Not Found</h1>");
    }
};

const handleHome = (request, response) => {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(file);
        }
    });
};

// const handlePublic = (request, response, url) => {
//     const extension = url.split(".")[1];
//     const extensionType = {
//         html: "text/html",
//         css: "text/css",
//         js: "application/javascript",
//         ico: "image/x-icon",
//         jpg: "image/jpg",
//         png: "image/png"
//     };

//     const filePath = path.join(__dirname, "..", "public", url);
//     console.log(filePath);
//     fs.readFile(filePath, (error, file) => {
//         if (error) {
//             response.writeHead(404, { "Content-Type": "text/html" });
//             response.end("<h1>404 Not Found</h1>");
//         } else {
//             response.writeHead(200, { "Content-Type": extensionType[extension] });
//             response.end(file);
//         }
//     });
// };

module.exports = handler;
