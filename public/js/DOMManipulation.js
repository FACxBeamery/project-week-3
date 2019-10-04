const resetTodosContainer = () => {
    const todosContainer = document.getElementById("todos-container");

    if (todosContainer) {
        todosContainer.remove();
    }
};

document.getElementById("sortby").addEventListener("change", (e) => {
    const sortMethod = e.target.value;
    getTodos("/todos", sortMethod);
});

const addTodosToPage = (todos) => {
    const todosContainer = document.createElement("div");
    todosContainer.id = "todos-container";
    document.getElementById("section").appendChild(todosContainer);
    // ("todos-container");
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

    editButton.textContent = "edit";
    editButton.addEventListener("click", editTodo);

    editButton.classList.add("todo__button--edit");

    const removeButton = document.createElement("button");

    removeButton.textContent = "remove";
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

const resetForm = () => {
    if (document.getElementById("todo-title")) {
        document.getElementById("todo-title").classList.remove("form__input--warning");
    }
    if (document.querySelector(".warning")) {
        document.querySelector(".warning").textContent = "";
    }
};

const addWarningStyling = (element) => {
    element.classList.add("form__input--warning");
};

const addWarningMessageBelow = (element) => {
    const p = document.createElement("p");
    const text = document.createTextNode("This field is required.");
    p.appendChild(text);
    p.classList.add("warning");

    element.parentNode.insertBefore(p, element.nextSibling);
};

const modalBox = (todoID) => {
    const modal = document.getElementById("modal-box");
    const deleteButton = document.getElementById("delete-item");
    const undoButton = document.getElementById("go-back");
    const span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    document.getElementById("remove-question").textContent =
        "Are u sure u want to remove this todo?";
    document.getElementById("remove-question").style.fontSize = "1rem";
    deleteButton.style.display = "inline-block";
    undoButton.style.display = "inline-block";

    const deleteItem = (e) => {
        e.preventDefault();
        document.getElementById("remove-question").textContent = "Todo successfully deleted!";
        document.getElementById("remove-question").style.fontSize = "1.5rem";
        deleteButton.style.display = "none";
        undoButton.style.display = "none";
        setTimeout(() => {
            e.preventDefault();
            modal.style.display = "none";
            removeTodo(todoID);
        }, 600);
        deleteButton.removeEventListener("click", deleteItem);
    };

    deleteButton.addEventListener("click", deleteItem);

    span.addEventListener("click", () => {
        modal.style.display = "none";
    });

    undoButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
};
