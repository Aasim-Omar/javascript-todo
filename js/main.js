
let tasksForm = document.querySelector(".add-task");
let taskInput = document.querySelector(".task-input");
let taskButton = document.querySelector(".task-button");
let tasksContainer = document.querySelector(".tasks-content");
let completedTasks = document.querySelector(".completed-tasks");
// let noTasks = document.querySelector(".no-tasks");
let arrayOfTasks = [];
// Get Data From Local Storage
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  addElementsToPageFrom(arrayOfTasks);
} 

// Add Tasks Function
function addTaskToArray(taskContent) {
  const task = {
    id: Date.now(),
    title: taskContent,
    isCompleted: false,
  }
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addTasksToLocalStorageFrom(arrayOfTasks);
};

tasksForm.onsubmit = function (e) {
  e.preventDefault();
  if (taskInput.value) addTaskToArray(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
};

function addElementsToPageFrom(arrayOfTasks) {
  tasksContainer.innerHTML = '';
  completedTasks.innerHTML = '';
  arrayOfTasks.forEach((task) => {
    let taskBox = document.createElement("div");
    taskBox.className = "task-box";
    taskBox.setAttribute("data-id", task.id);
    let content = document.createElement("div");
    content.className = "content";
    content.appendChild(document.createTextNode(task.title));
    let bullets = document.createElement("div");
    bullets.className = "bullets";
    let firstBullet = document.createElement("i");
    firstBullet.className = "icon-trash-2 del";
    let secondBullet = document.createElement("i");
    secondBullet.className = "icon-ok-circled done";
    bullets.appendChild(firstBullet);
    bullets.appendChild(secondBullet);
    taskBox.appendChild(content);
    taskBox.appendChild(bullets);
    if (task.isCompleted) {
      completedTasks.appendChild(taskBox);
    } else {
      tasksContainer.insertBefore(taskBox, tasksContainer.childNodes[0]);
    }
  });
  // Check if Tasks Container is Empty
  if (!tasksContainer.childElementCount && !completedTasks.childElementCount) {
    let noTasks = document.createElement("div");
    noTasks.className = "no-tasks";
    noTasks.appendChild(document.createTextNode("No Tasks To Show"));
    tasksContainer.appendChild(noTasks);
  }
  // Check if Completed Tasks is Empty
  if (!completedTasks.childElementCount) {
    completedTasks.style.display = "none";
  } else {
    completedTasks.style.display = "block";
  }
};
// add Tasks To Local Storage
function addTasksToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};
// Deleted Task Function
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    let id = e.target.parentElement.parentElement.getAttribute("data-id");
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != id );
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    addElementsToPageFrom(arrayOfTasks);
  }
});

// Completed Tasks Action
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("done")) {
    id = e.target.parentElement.parentElement.getAttribute("data-id");
    arrayOfTasks.forEach(task => {
      if (task.id == id) {
        task.isCompleted = !task.isCompleted;
      }
    })
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    addElementsToPageFrom(arrayOfTasks);
  }
});


