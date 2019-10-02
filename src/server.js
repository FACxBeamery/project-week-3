const express = require("express");
const app = express();
const formidable = require("express-formidable");

const router = require("./router.js");

const port = 3000;

app.use(formidable());
app.use(router);

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port} ready to accept requests!`);
});

// debug straightaway
// handlers  import isnt working

// custom messages for endpoints

// double checjk req.params and fields and body

// error handling if id doesnt exist

// id generator function
