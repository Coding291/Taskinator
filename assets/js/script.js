var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;

// var listItemEl = "<li class = 'task-item'>" + setAttribute("data-task-id").tasks[i].id
// console.log(listItemEl);
var tasks = [];

var taskformHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // console.log(taskTypeInput);
    // console.log(taskNameInput);
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }
    formEl.reset();
    var isEdit = formEl.hasAttribute("data-task-id");
    console.log(isEdit);
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    }
  
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

  }

  var createTaskEl = function(taskDataObj) {

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    var taskInfoEl = document.createElement("div");
// give it a class name
    taskInfoEl.className = "task-info";
// add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
// add entire list item to list
     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
     switch (taskDataObj.status) {
      case "to do":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
        tasksToDoEl.append(listItemEl);
        break;
      case "in progress":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.append(listItemEl);
        break;
      case "completed":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.append(listItemEl);
        break;
      default:
        console.log("Something went wrong!");
    }
  

     taskDataObj.id = taskIdCounter;
     tasks.push(taskDataObj);
     taskIdCounter++;
     saveTasks()
    
     
  }

  var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
  var editButtonEl = document.createElement("button");
     editButtonEl.textContent = "Edit";
     editButtonEl.className = "btn edit-btn";
     editButtonEl.setAttribute("data-task-id", taskId);

     actionContainerEl.appendChild(editButtonEl);

// create delete button
   var deleteButtonEl = document.createElement("button");
     deleteButtonEl.textContent = "Delete";
     deleteButtonEl.className = "btn delete-btn";
     deleteButtonEl.setAttribute("data-task-id", taskId);
 
     actionContainerEl.appendChild(deleteButtonEl);

   var statusSelectEl = document.createElement("select");
     statusSelectEl.className = "select-status";
     statusSelectEl.setAttribute("name", "status-change");
     statusSelectEl.setAttribute("data-task-id", taskId);

     actionContainerEl.appendChild(statusSelectEl);
   var statusChoices = ["To Do", "In Progress", "Completed"];
   for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
  };
  

  formEl.addEventListener("submit", taskformHandler);

  var taskButtonHandler = function(event) {
    var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
  };

  var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    var updatedTaskArr = [];

// loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
  // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
  if (tasks[i].id !== parseInt(taskId)) {
    updatedTaskArr.push(tasks[i]);
  }
}
// reassign tasks array to be the same as updatedTaskArr
      tasks = updatedTaskArr;
      saveTasks()
  };

  var editTask = function(taskId) {
    console.log(taskId);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    formEl.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);

  };

  var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
     taskSelected.querySelector("h3.task-name").textContent = taskName;
     taskSelected.querySelector("span.task-type").textContent = taskType;

     for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
      }
     
     alert("Task Updated!");
     formEl.removeAttribute("data-task-id");
     formEl.querySelector("#save-task").textContent = "Add Task";
     saveTasks();
  };
  
  pageContentEl.addEventListener("click", taskButtonHandler);

  var taskStatusChangeHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
      tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    }
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
      }
    }
    
  };
  
  pageContentEl.addEventListener("change", taskStatusChangeHandler);
  saveTasks()

  }
  
  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  var loadTasks = function() {
    var task = localStorage.getItem("tasks")
    if (task === null) {
      return false;
    }
    
    tasks = JSON.parse(task);
    for (var i = 0; i < tasks.length; i++) {
      createTaskEl(task[i])
    }
  }

  loadTasks()