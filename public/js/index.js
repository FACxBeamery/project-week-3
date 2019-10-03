const getTodos = (url) => {
    fetch(url, {
        method: "GET"
    })
        .then((res) => {
            res.json().then((json) => {
                //target the todos container
                // do a for each and render each to do
                addTodosToPage(json);
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

const ready = () => {
    getTodos("/todos");
};

if (document.readyState != "loading") {
    ready();
} else {
    document.addEventListener("DOMContentLoaded", ready);
}

const resetTodosContainer = () => {
    document.getElementById("todos-container").innerHTML = "";
};

const toggleTodoStatus = (e) => {
    const todoID = e.target.parentNode.parentNode.id;
    // console.log(todoID);

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
            getTodos("/todos");
        })
        .catch((err) => {
            console.error(err);
        });
};

const removeTodo = (todoID) => {
    fetch(`/todos/todo/?id=${todoID}`, {
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
            getTodos("/todos");
        })
        .catch((err) => {
            console.log(err);
        });
};

const editTodo = (e) => {
    const todoID = e.target.parentNode.id;
    const todoTitle = e.target.previousSibling;
    e.preventDefault();
    if (e.target.innerHTML === "edit") {
        e.target.innerHTML = "save";
        todoTitle.contentEditable = "true";

        todoTitle.classList.add("todo__title--active");
    } else if (e.target.innerHTML == "save") {
        e.target.innerHTML = "edit";
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
                getTodos("/todos");
            })
            .catch((err) => {
                console.log(err);
            });

        // get p text content
        // and edit todo title
    }
};

const addTodosToPage = (todos) => {
    const todosContainer = document.getElementById("todos-container");
    todos.forEach((todo) => todosContainer.appendChild(renderTodo(todo)));
};

const renderTodo = (todo) => {
    const todoWrapper = document.createElement("form");
    todoWrapper.setAttribute("id", todo.id);

    const checkboxWrapper = document.createElement("label");
    checkboxWrapper.classList.add("container");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    const checkboxSpan = document.createElement("span");
    checkboxSpan.classList.add("checkmark");

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkboxSpan);
    // add an event listener
    if (todo.completed) {
        checkbox.checked = true;
        todoWrapper.classList.add("todo-wrapper--complete");
    }
    checkbox.addEventListener("change", toggleTodoStatus);

    const title = document.createElement("p");
    title.type = "text";
    if (todo.title) {
        title.textContent = todo.title;
        title.contentEditable = "false";
    }

    title.classList.add("todo__title");

    const editButton = document.createElement("button");
    // add an event listener
    editButton.innerHTML = "edit";
    editButton.addEventListener("click", editTodo);

    editButton.classList.add("todo__button--edit");

    const removeButton = document.createElement("button");
    // add an event listener
    removeButton.innerHTML = "remove";
    removeButton.classList.add("remove-button");
    removeButton.classList.add("todo__button--remove");

    todoWrapper.appendChild(checkboxWrapper);
    todoWrapper.appendChild(title);
    todoWrapper.appendChild(editButton);
    todoWrapper.appendChild(removeButton);
    todoWrapper.classList.add("flex-center");
    todoWrapper.classList.add("todo-wrapper");
    todoWrapper.classList.add("my-3");
    return todoWrapper;
};

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
        e.preventDefault();
        const id = e.target.parentNode.id;

        modalBox(e.target.parentNode.id);
    }
});

document.getElementById("new-todo-button").addEventListener("click", (e) => {
    e.preventDefault();
    addTodo(e.target);
});

const addTodo = (target) => {
    const newTodoTitle = document.getElementById("todo-title").value;
    document.getElementById("todo-title").value = "";

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
                throw new Error("Title is empty");
            }
        })
        .then(() => {
            resetTodosContainer();
            getTodos("/todos");
        })
        .catch((err) => {
            console.log(err);
        });
};

const modalBox = (todoID) => {
    const modal = document.getElementById("modal-box");
    const deleteButton = document.getElementById("delete-item");
    const undoButton = document.getElementById("go-back");
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    document.getElementById("remove-question").textContent =
        "Are u sure u want to remove this todo?";
    document.getElementById("remove-question").style.fontSize = "1rem";
    deleteButton.style.display = "block";
    undoButton.style.display = "block";

    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("remove-question").textContent = "Todo successfully deleted!";
        document.getElementById("remove-question").style.fontSize = "1.5rem";
        deleteButton.style.display = "none";
        undoButton.style.display = "none";
        setTimeout(() => {
            e.preventDefault();
            modal.style.display = "none";
            removeTodo(todoID);
        }, 1500);
    });

    span.addEventListener("click", () => {
        modal.style.display = "none";
    });

    undoButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
};
