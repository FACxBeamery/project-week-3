/* 
add an item to the to do list
edit the status of a to do item in the list
delete an item from the list
return the list sorted by date/time created
return the list sorted by status
*/

const test = require("tape");
const router = require("../src/router.js");
const pf = require("../lib/purefunctions.js");

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

const todosListByDate = [
	{
		id: 4,
		title: "new todo",
		completed: false,
		dateCreated: 1569426831620,
		dateEdited: 1569426831620
	},
	{
		id: 3,
		title: "To do number 3",
		completed: false,
		dateCreated: 1569426831619,
		dateEdited: 1569426831619
	},
	{
		id: 2,
		title: "To do number 2",
		completed: true,
		dateCreated: 1569426831621,
		dateEdited: 1569426831621
	},
	{
		id: 1,
		title: "To do number 1",
		completed: false,
		dateCreated: 1569426831618,
		dateEdited: 1569426831618
	}
];

const dummyTodoList2 = [
	{
		id: 4,
		title: "new todo",
		completed: false,
		dateCreated: 1569426831620,
		dateEdited: 1569426831620
	},
	{
		id: 3,
		title: "To do number 3",
		completed: false,
		dateCreated: 1569426831619,
		dateEdited: 1569426831619
	},
	{
		id: 2,
		title: "To do number 2",
		completed: true,
		dateCreated: 1569426831621,
		dateEdited: 1569426831621
	},
	{
		id: 1,
		title: "To do number 1",
		completed: false,
		dateCreated: 1569426831618,
		dateEdited: 1569426831618
	}
];

const todosListByLatest = [
	{
		id: 2,
		title: "To do number 2",
		completed: true,
		dateCreated: 1569426831621,
		dateEdited: 1569426831621
	},
	{
		id: 4,
		title: "new todo",
		completed: false,
		dateCreated: 1569426831620,
		dateEdited: 1569426831620
	},
	{
		id: 3,
		title: "To do number 3",
		completed: false,
		dateCreated: 1569426831619,
		dateEdited: 1569426831619
	},
	{
		id: 1,
		title: "To do number 1",
		completed: false,
		dateCreated: 1569426831618,
		dateEdited: 1569426831618
	}
];

const todosListByStatus = [
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
		id: 1,
		title: "To do number 1",
		completed: false,
		dateCreated: 1569426063298,
		dateEdited: 1569426063298
	},
	{
		id: 2,
		title: "To do number 2",
		completed: true,
		dateCreated: 1569426093913,
		dateEdited: 1569426093913
	}
];

dummyAddArray = [1, 2, 3, 4];
dummyAddItem = 5;
const dummyTodo = { title: "testing add" };

test("Testing Tape is working", function(t) {
	t.equal(1, 1, "One should equal one");
	t.end();
});

test("testing item is added to array", function(t) {
	const expected = [1, 2, 3, 4, 5];

	const actual = pf.addToArray(dummyAddArray, dummyAddItem);

	t.deepEqual(actual, expected, "should return array up to no. 5");
	t.end();
});

test("Testing remove item from array", function(t) {
	const actual = pf.removeFromArray(dummyTodosList, 1);
	const expected = [
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
		}
	];

	t.deepEqual(actual, expected, "Id 1 should be removed");
	t.end();
});

test("testing item status is changed to true ", function(t) {
	const expected = true;

	const actual = pf
		.toggleItemStatus(dummyTodosList, 1, true, 1569426063298)
		.find(arrayItem => arrayItem.id === 1).completed;

	t.equal(actual, expected, "should be true");
	t.end();
});

test("testing item status is changed to false", function(t) {
	const expected = false;

	const actual = pf
		.toggleItemStatus(dummyTodosList, 1, false, 1569426063298)
		.find(arrayItem => arrayItem.id === 1).completed;

	t.equal(actual, expected, "should be false");
	t.end();
});

test("testing items are sorted correctly by status", function(t) {
	const actual = pf.sortArray(dummyTodosList, "status");
	const expected = todosListByStatus;
	t.deepEqual(actual, expected, "should be sorted in correct order");
	t.end();
});

test("testing items are sorted correctly by date created", function(t) {
	const actual = pf.sortArray(dummyTodoList2, "date");
	const expected = todosListByLatest;
	t.deepEqual(actual, expected, "should be sorted in correct order");
	t.end();
});

test("testing items are sorted correctly by last edited", function(t) {
	const actual = pf.sortArray(dummyTodoList2, "latest");
	const expected = todosListByLatest;
	t.deepEqual(actual, expected, "should be sorted in correct order");
	t.end();
});

test("editing array property title", function(t) {
	let newArr = [
		{
			id: 2,
			title: "i NEED TO be changed",
			dateEdited: 123123123
		},
		{
			id: 1,
			title: "i have NOT been changed",
			dateEdited: 123123123
		}
	];

	let actual = pf.editArray(newArr, 2, "i have been changed", 123123123);

	let expected = [
		{
			id: 2,
			title: "i have been changed",
			dateEdited: 123123123
		},
		{
			id: 1,
			title: "i have NOT been changed",
			dateEdited: 123123123
		}
	];

	t.deepEqual(
		actual,
		expected,
		"should return true if array item property was successfully changed"
	);

	t.end();
});
