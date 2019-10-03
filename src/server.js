const express = require("express");
const app = express();
const formidable = require("express-formidable");

const router = require("./router.js");

const port = process.env.PORT || 3000;

app.use(formidable());
app.use(router);

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port} ready to accept requests!`);
});
