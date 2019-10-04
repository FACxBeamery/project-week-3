const getTodos = (url, method) => {
    fetch(`${url}${method ? "/" + method : ""}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            res.json().then((json) => {
                console.log(json);

                resetTodosContainer();
                addTodosToPage(json);
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

const toggleTodoStatus = (e) => {
    const todoID = e.target.parentNode.parentNode.id;

    fetch(`/todos/todo/${todoID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            edit_method: e.target.checked ? "completeTodo" : "undoCompleteTodo"
        })
    })
        .then((res) => {
            resetTodosContainer();
            getTodos("/todos", document.getElementById("sortby").value);
        })
        .catch((err) => {
            console.error(err);
        });
};

const removeTodo = (todoID) => {
    fetch(`/todos/todo/${todoID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            console.log(res);
            if (!res.ok) {
                throw new Error("This item does not exist");
            }
            return res;
        })
        .then(() => {
            resetTodosContainer();
            getTodos("/todos", document.getElementById("sortby").value);
        })
        .catch((err) => {
            console.log(err);
        });
};

const editTodo = (e) => {
    const todoID = e.target.parentNode.id;
    const todoTitle = e.target.previousSibling;
    e.preventDefault();
    if (e.target.textContent === "edit") {
        e.target.textContent = "save";
        todoTitle.contentEditable = "true";

        todoTitle.classList.add("todo__title--active");
    } else if (e.target.textContent == "save") {
        e.target.textContent = "edit";
        todoTitle.contentEditable = "false";
        todoTitle.classList.remove("todo__title--active");
        const pContent = todoTitle.textContent;

        fetch(`/todos/todo/${todoID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                edit_method: "editTitle",
                title: pContent
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Edit query invalid");
                }
            })
            .then(() => {
                resetTodosContainer();
                getTodos("/todos", document.getElementById("sortby").value);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const addTodo = (target) => {
    const newTodoTitle = document.getElementById("todo-title").value;
    document.getElementById("todo-title").value = "";

    if (newTodoTitle) {
        fetch(`/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTodoTitle
            })
        })
            .then((res) => {
                if (!res.ok) {
                    addWarningStyling(document.getElementById("todo-title"));
                    addWarningMessageBelow(document.getElementById("form"));
                    throw new Error("Title is empty");
                }
            })
            .then(() => {
                resetForm();

                resetTodosContainer();
                getTodos("/todos", document.getElementById("sortby").value);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};