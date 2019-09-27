const http = require("http");

const router = require("./router.js");

const server = http.createServer(router);

const port = 3000;

server.listen(port, function() {
    console.log(`Server is listening on port http://localhost:${port} ready to accept requests!`);
});
