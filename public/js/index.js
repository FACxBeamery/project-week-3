const getTodos = url => {
	fetch(url, {
		method: "GET"
	})
		.then(res => {
			res.json().then(json => {
				//target the todos container
				// do a for each and render each to do
				addTodosToPage(json);
			});
		})
		.catch(err => {
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

const toggleTodoStatus = e => {
	const todoID = e.target.parentNode.id;
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
		.then(res => {
			resetTodosContainer();
			getTodos("/todos");
		})
		.catch(err => {
			console.error(err);
		});
};

const removeTodo = e => {
	const todoID = e.target.parentNode.id;

	fetch(`/todos/todo/${todoID}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			resetTodosContainer();
			getTodos("/todos");
		})
		.catch(err => {
			console.error(err);
		});
};

const editTodo = e => {
	const todoID = e.target.parentNode.id;
	const todoTitle = e.target.previousSibling;
	e.preventDefault();
	if (e.target.innerHTML === "edit") {
		e.target.innerHTML = "save";
		todoTitle.contentEditable = "true";
	} else if (e.target.innerHTML == "save") {
		e.target.innerHTML = "edit";
		todoTitle.contentEditable = "false";
		const pContent = todoTitle.textContent;
		console.log("cont", pContent);

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
			.then(res => {
				resetTodosContainer();
				getTodos("/todos");
			})
			.catch(err => {
				console.error(err);
			});

		// get p text content
		// and edit todo title
	}
};

const addTodosToPage = todos => {
	const todosContainer = document.getElementById("todos-container");
	todos.forEach(todo => todosContainer.appendChild(renderTodo(todo)));
};

const renderTodo = todo => {
	const todoWrapper = document.createElement("form");
	todoWrapper.setAttribute("id", todo.id);
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	// add an event listener
	if (todo.completed) {
		checkbox.checked = true;
	}
	checkbox.addEventListener("change", toggleTodoStatus);

	const title = document.createElement("p");
	title.type = "text";
	if (todo.title) {
		title.textContent = todo.title;
		title.contentEditable = "false";
	}

	const editButton = document.createElement("button");
	// add an event listener
	editButton.innerHTML = "edit";
	editButton.addEventListener("click", editTodo);

	const removeButton = document.createElement("button");
	// add an event listener
	removeButton.innerHTML = "remove";
	removeButton.addEventListener("click", e => {
		e.preventDefault();
		modalBox(e);
	});

	todoWrapper.appendChild(checkbox);
	todoWrapper.appendChild(title);
	todoWrapper.appendChild(editButton);
	todoWrapper.appendChild(removeButton);
	return todoWrapper;
};

document.getElementById("new-todo-button").addEventListener("click", e => {
	e.preventDefault();
	addTodo(e.target);
});

const addTodo = target => {
	const newTodoTitle = document.getElementById("todo-title").value;
	document.getElementById("todo-title").value = "";
	console.log(newTodoTitle);
	console.log("target", target);

	fetch(`/todos`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			title: newTodoTitle
		})
	})
		.then(res => {
			resetTodosContainer();
			getTodos("/todos");
		})
		.catch(err => {
			console.error(err);
		});
};

const modalBox = e => {
	const modal = document.getElementById("modal-box");
	modal.style.display = "block";

	const deleteButton = document.getElementById("delete-item");
	const undoButton = document.getElementById("go-back");
	// Get the <span> element that closes the modal
	const span = document.getElementsByClassName("close")[0];

	deleteButton.addEventListener("click", () => {
		modal.style.display = "none";
		removeTodo(e);
	});

	undoButton.addEventListener("click", () => {
		modal.style.display = "none";
	});
};
