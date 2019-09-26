/* 
add an item to the to do list
edit the status of a to do item in the list
delete an item from the list
return the list sorted by date/time created
return the list sorted by status
*/

const test = require("tape");
const router = require("../router.js");

const dummyTodosList = [
	{
		id: 4,
		title: "new todo",
		completed: false,
		dateCreated: 1569426831604,
		dateEdited: 1569426831604
	},
	{
		id: 3,
		title: "To do number 3",
		completed: false,
		dateCreated: 1569426093920,
		dateEdited: 1569426093920
	},
	{
		id: 2,
		title: "To do number 2",
		completed: true,
		dateCreated: 1569426093913,
		dateEdited: 1569426093913
	},
	{
		id: 1,
		title: "To do number 1",
		completed: false,
		dateCreated: 1569426063298,
		dateEdited: 1569426063298
	}
];

const dummyTodo = { title: "testing add" };

test("Testing Tape is working", function(t) {
	t.equal(1, 1, "One should equal one");
	t.end();
});
