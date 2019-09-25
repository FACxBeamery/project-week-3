const http = require("http");

const handler = require("./router.js");

const server = http.createServer(handler);

const port = 3000;

server.listen(port, function() {
    console.log(`Server is listening on port http://localhost:${port} ready to accept requests!`);
});
