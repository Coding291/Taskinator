var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");



var taskformHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);
    console.log(taskNameInput);
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }
    formEl.reset();
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
  
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

  }

  var createTaskEl = function(taskDataObj) {

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    var taskInfoEl = document.createElement("div");
// give it a class name
    taskInfoEl.className = "task-info";
// add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
// add entire list item to list
     tasksToDoEl.appendChild(listItemEl);
  }

  formEl.addEventListener("submit", taskformHandler);



