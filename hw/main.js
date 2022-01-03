let taskInput = document.querySelector("#task-input");
let deadlineInput = document.querySelector("#deadline-input");
let addTaskButton = document.querySelector("#add-task");
let tasksWrapper = document.querySelector("#task-wrapper");
let deleteButtons = document.querySelector("#delete-buttons");
let reset = document.querySelector("#reset");
let deleteSelected = document.querySelector("#delete-selected");

if (localStorage.getItem("tasks") == null) {
  localStorage.setItem("tasks", JSON.stringify([]));
} else {
  tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
  for (const task of tasksFromStorage) {
    renderTask(task)
  }
}

taskInput.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    addTask();
  }
});

deadlineInput.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    addTask();
  }
});
addTaskButton.addEventListener("click", function () {
  addTask();
});

function addTask() {
  let deadlineValue = deadlineInput.value;
  let taskValue = taskInput.value.trim();
  taskInput.value = "";
  deadlineInput.value = "";
  if (taskValue == "" || deadlineValue == "") {
    alert("You cant add an empty task.");
    return;
  }

  let d1 = new Date(deadlineValue);
  let d2 = new Date();

  let newTask = {
    text: taskValue,
    deadline: msToMin(d1 - d2)
  }

  renderTask(newTask);

  tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
  tasksFromStorage.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
}

function renderTask(task) {
  let newLi = document.createElement("li");
  newLi.classList.add("list-group-item");
  newLi.setAttribute("data-text",task.text);
  newLi.innerText = task.text;
  newLi.addEventListener("click", function () {
    this.classList.toggle("active");
  });

  let newSpan = document.createElement("span");
  newSpan.classList.add("badge", "rounded-pill", "bg-danger");
  newSpan.innerText = task.deadline + " minutes left.";

  newLi.append(newSpan);
  tasksWrapper.append(newLi);

  deleteButtons.classList.remove("d-none");
}

reset.addEventListener("click", function () {
  deleteButtons.classList.add("d-none");
  tasksWrapper.innerHTML = "";
  localStorage.setItem("tasks", JSON.stringify([]));
});

deleteSelected.addEventListener("click", function () {
  deleteSelectedTasks();
});

document.addEventListener("keyup", function (e) {
  if (e.keyCode == 8 && e.ctrlKey == true) {
    deleteSelectedTasks();
  }
});

function deleteSelectedTasks() {
  tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

  for (const item of document.querySelectorAll(".list-group-item.active")) {
    let indexToBeDeleted = tasksFromStorage.findIndex(task => task.text == item.getAttribute("data-text"));
    tasksFromStorage.splice(indexToBeDeleted,1);
    item.remove();
  }

  localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));

  if (document.querySelectorAll(".list-group-item").length == 0) {
    deleteButtons.classList.add("d-none");
  }
}

window.addEventListener("blur", () => {
  document.querySelector("title").innerHTML = "You have mutiple tasks to do!";
});

window.addEventListener("focus", () => {
  document.querySelector("title").innerHTML = "Welcome!";
});

function msToMin(time) {
  return Math.round(time / 60000);
}
