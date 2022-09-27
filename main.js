let theInput = document.querySelector(".add-task input");
let thePlus = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let noTasks = document.querySelector(".no-tasks");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompeleted = document.querySelector(".tasks-completed span");
let deleteAll = document.querySelector(".all .deleteall");
let finishAll = document.querySelector(".all .finishall");
let theEmptyArry = [];
window.onload = function () {
  theInput.focus();
  countComplete();
};

if (localStorage.getItem("tasks")) {
  theEmptyArry = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromlOcalStoreage();

thePlus.addEventListener("click", function (ele) {
  if (theInput.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You Need To Add Value!",
    });
    theInput.focus();
  } else {
    addTaskToArry(theInput.value);
    noTasks.remove();
    theInput.value = "";
    theInput.focus();
    countComplete();
  }
});

tasksContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    deletTaskLoclStoreage(e.target.parentNode.getAttribute("data-id"));
    e.target.parentNode.remove();
  }

  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    toggleTaskLoclStoreage(e.target.getAttribute("data-id"));
  }
  countComplete();
});

function addTaskToArry(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  theEmptyArry.push(task);

  addElementsToPage(theEmptyArry);

  addDatatoLocalStoreAge(theEmptyArry);
}

function addElementsToPage(ele) {
  tasksContainer.innerHTML = "";

  ele.forEach((task) => {
    let newSpan = document.createElement("span");
    newSpan.className = "task-box";

    if (task.completed === true) {
      newSpan.className = "task-box finished";
    }

    newSpan.setAttribute("data-id", task.id);
    let newSpanText = document.createTextNode(task.title);
    newSpan.appendChild(newSpanText);

    let deletButttn = document.createElement("button");

    let deletText = document.createTextNode("Delete");

    deletButttn.appendChild(deletText);

    deletButttn.className = "delete";

    newSpan.appendChild(deletButttn);

    tasksContainer.appendChild(newSpan);
  });
}

if (theEmptyArry.length === 0) {
  tasksContainer.appendChild(noTasks);
}

deleteAll.addEventListener("click", function (params) {
  tasksContainer.replaceChildren(noTasks);
  tasksCount.textContent = tasksContainer.childElementCount - 1;
  localStorage.removeItem("tasks");
  theEmptyArry = [];
  countComplete();
});

finishAll.addEventListener("click", function (params) {
  for (let i = 0; i < theEmptyArry.length; i++) {
    if (theEmptyArry[i].completed == false) {
      tasksContainer.children[i].classList.add("finished");
      theEmptyArry[i].completed = true;
    }
  }
  countComplete();
  addDatatoLocalStoreAge(theEmptyArry);
});

function countComplete(params) {
  tasksCount.innerHTML = theEmptyArry.length;
  tasksCompeleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

function addDatatoLocalStoreAge(theEmptyArry) {
  window.localStorage.setItem("tasks", JSON.stringify(theEmptyArry));
}
function getDataFromlOcalStoreage(ele) {
  let data = localStorage.getItem("tasks");

  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}

function deletTaskLoclStoreage(taskId) {
  theEmptyArry = theEmptyArry.filter((task) => task.id != taskId);
  countComplete();
  addDatatoLocalStoreAge(theEmptyArry);
}

function toggleTaskLoclStoreage(taskId) {
  for (let i = 0; i < theEmptyArry.length; i++) {
    if (theEmptyArry[i].id == taskId) {
      theEmptyArry[i].completed == false
        ? (theEmptyArry[i].completed = true)
        : (theEmptyArry[i].completed = false);
    }
    addDatatoLocalStoreAge(theEmptyArry);
  }
  countComplete();
}
