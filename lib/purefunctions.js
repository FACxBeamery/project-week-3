const addToArray = (array, newItem) => [...array, newItem];

const removeFromArray = (array, idToRemove) =>
    array.filter((arrayItem) => arrayItem.id !== Number(idToRemove));

const toggleItemStatus = (array, idToToggle, newStatus, dateEdited) => {
    let newArray = [...array];
    newArray.map((arrayItem) => {
        if (arrayItem.id === Number(idToToggle)) {
            arrayItem.completed = newStatus;
            arrayItem.dateEdited = dateEdited;
        }
    });
    return newArray;
};

const sortArray = (array, sortBy) => {
    let newArray = [...array];
    if (sortBy === "status") {
        newArray.sort((a, b) => {
            return a.completed - b.completed;
        });
    } else if (sortBy === "date") {
        newArray.sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated);
        });
    } else if (sortBy === "recentedited") {
        newArray.sort((a, b) => {
            return new Date(b.dateEdited) - new Date(a.dateEdited);
        });
    }
    return newArray;
};

const editArray = (array, idToEdit, newTitle, dateEdited) => {
    let newArray = [...array];
    newArray.map((arrayItem) => {
        if (arrayItem.id === Number(idToEdit)) {
            arrayItem.title = newTitle;
            arrayItem.dateEdited = dateEdited;
        }
    });
    return newArray;
};

module.exports = {
    addToArray,
    removeFromArray,
    toggleItemStatus,
    sortArray,
    editArray
};
