//UI Variables
const form = document.querySelector("#task-form");
//ul tag
const taskList = document.querySelector(".collection");
const clrBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add Task Event
  form.addEventListener("submit", addTask);
  //Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear All Tasks
  clrBtn.addEventListener("click", clearTasks);
  //Filter Tasks Event
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //creating li element and adding a class to it
    const li = document.createElement("li");
    li.className = "collection-item";
    //Create text node and append it to li
    li.appendChild(document.createTextNode(task));

    //Create new link element and add a class to it
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  //if statement makes sure we dont add empty string
  if (taskInput.value === "") {
    alert("Add a task!");
  } else {
    //creating li element and adding a class to it
    const li = document.createElement("li");
    li.className = "collection-item";
    //Create text node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element and add a class to it
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear Input
    taskInput.value = "";

    e.preventDefault();
  }
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete this task?")) {
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear All Tasks
function clearTasks() {
  //I nacin
  //   taskList.innerHTML = "";

  // Faster/Better way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    //If it is not equal to -1 (see forEach() that means it exists in array)
    // => which means there is a match
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
