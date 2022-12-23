let todoItemsContainer = document.getElementById("todoItemsContainer"); //creating a let for todoItemsContainer
let addTodoButton = document.getElementById("addTodoButton"); // creating a let for addTodoButton
let saveTodoButton = document.getElementById("saveTodoButton"); // crating a let for saveTodoButton


// saving in local storage and retriving when refresh 
function getTodoListFromLocalStorage() { //retriving the saved todoItemsContainer function 
    let stringifiedTodoList = localStorage.getItem("todoList"); //using getitem we are assigned todolist to variable
    let parsedTodoList = JSON.parse(stringifiedTodoList); // using json.parse to a json string  we are returning the object
    if (parsedTodoList === null) { // if the parsevarable was empty we are return empty array
        return [];
    } else {
        return parsedTodoList; // e;se we are return the parsedTodoList
    }
}

let todoList = getTodoListFromLocalStorage(); // retriving the data from local storage
let todosCount = todoList.length; //checking len of todouser input

//when u click on save button then the todolist converted to stringify setItem
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList)); //converting to stringify
};

//when we click on add button we are adding a new continer with checkbox,labelinput and delete icon to 
//to todoItemsContainer

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput"); // assigning the id to a let variable
    let userInputValue = userInputElement.value; // when user type something in inputElement

    if (userInputValue === "") { //if user type empty and click on the add button
        alert("Enter Valid Text"); // must  warn pop up on the top of the screen
        return;
    }

    todosCount = todosCount + 1; //taking todocount len and concat with 1

    // creating a newtodo item everytime user types some thing on input feild , the 
    // newtodo contains all the uniqueNo with id
    let newTodo = { // creating a objects object contains pair
        text: userInputValue, // text  = entered userInputValue 
        uniqueNo: todosCount, // count must be a uniq number 
        isChecked: false // at starting check box must be untick
    };
    todoList.push(newTodo); //adding a new item to the todolist 
    createAndAppendTodo(newTodo);
    userInputElement.value = ""; //clearing the userinput value 
}

addTodoButton.onclick = function() { // calling button function
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) { // change when these id when everytime user add a input
    let checkboxElement = document.getElementById(checkboxId); // creating let element for checkboxid
    let labelElement = document.getElementById(labelId); // creating let element for labelid
    labelElement.classList.toggle("checked"); //adding classlist toogle if checked

    //when we use checked status it doesnt not persist on reload so we have to find the index 
    let todoObjectIndex = todoList.findIndex(function(eachTodo) { // finding index in the object todolist
        let eachTodoId = "todo" + eachTodo.uniqueNo; // adding TOodo with uniqueNo

        if (eachTodoId === todoId) { //todoId is equal to the assigned eachtodo then return true 
            return true;
        } else {
            return false;
        }
    });
    // todolist index of todoobjectindex
    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) { // if todoObject == true then checked = false
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true; // else true
    }

}

//when we click on delete buton we need to delete todolist which contains complete container
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId); // assigning todoid with let variable
    todoItemsContainer.removeChild(todoElement); // removing the container 

    //when we delete the todooo items it will apppers on relaod to avoid this we need to remove the todoo 
    //from todoo list
    // we use splice method
    let deleteElementIndex = todoList.findIndex(function(eachTodo) { //finding index of the toodooo object
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1); // arr.splice(start,deletecount)
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo; // we adding everytime a id with number to represent id uniq
    let checkboxId = "checkbox" + todo.uniqueNo; //
    let labelId = "label" + todo.uniqueNo; //

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() { // function on the status change 
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text; // user input text
    if (todo.isChecked === true) { // checked then we use stike through the todoo text 
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() { // fucntion top button onlick()
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) { // loop through the todo 
    createAndAppendTodo(todo);
}