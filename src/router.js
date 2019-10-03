const express = require("express");
const router = express();
const path = require("path");
const getTodos = require("./handlers/getTodos");
const addTodo = require("./handlers/addTodo");
const removeTodo = require("./handlers/removeTodo");
const editTodo = require("./handlers/editTodo");

router.use(express.static(path.join(__dirname, "..", "public")));

router.get("/todos", getTodos);

router.post("/todos", addTodo);

router.delete("/todos/todo/:id", removeTodo);

router.patch("/todos/todo/:id", editTodo);

module.exports = router;
